import actionTypes from "../actionTypes";
import firestoreCollections from "../../config/firebase/collections";
import {asyncForEach, saveFile} from "../../utils/fileUtils";
import {updateProjectModified} from "./projectActions";

const uploadFilesFailure = error => ({
  type: actionTypes.file.UPLOAD_FILES_FAILURE,
  error
});

const uploadFilesSuccess = () => ({
  type: actionTypes.file.UPLOAD_FILES_SUCCESS
});

const uploadFilesRequest = () => ({
  type: actionTypes.file.UPLOAD_FILES_REQUEST
});

export const uploadFiles = (files, ownerEntity, filesIndex) => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    dispatch(uploadFilesRequest());

    const firebase = getFirebase();
    const userId = firebase.auth().currentUser.uid;
    const dbOwnerEntity = ownerEntity.data().versionNum ? firestoreCollections.projectVersions.ID : firestoreCollections.projectVersionReviews.ID;
    const storagePath = `${userId}/${dbOwnerEntity}/${ownerEntity.id}/`;

    asyncForEach(files, async (file) => {
      await dispatch(uploadFile(storagePath + file.name, file, dbOwnerEntity, ownerEntity, filesIndex));
    })
      .then(() => {
        dispatch(uploadFilesSuccess())
      })
      .catch(error => {
        console.log(error);
        dispatch(uploadFilesFailure(error));
      });
  }
};

const uploadFileFailure = error => ({
  type: actionTypes.file.UPLOAD_FILE_FAILURE,
  error
});

const uploadFileSuccess = data => ({
  type: actionTypes.file.UPLOAD_FILE_SUCCESS,
  uploadedFile: data.uploadedFile,
  filesIndex: data.filesIndex,
});

const uploadFileRequest = data => ({
  type: actionTypes.file.UPLOAD_FILE_REQUEST,
  fileName: data.fileName,
  filesIndex: data.filesIndex,
});

export const uploadFile = (path, file, dbOwnerEntity, ownerEntity, filesIndex) => {
  return async (dispatch, getState, {getFirebase, getFirestore}) => {
    dispatch(uploadFileRequest({
      fileName: file.name,
      filesIndex
    }));

    const firebase = getFirebase();
    const firestore = getFirestore();
    const storageRef = firebase.storage().ref();
    const filesRef = firestore.collection(firestoreCollections.files.ID);
    let storageFileRef = storageRef.child(path);

    await storageFileRef
      .put(file)
      .then(result => {
        return filesRef
          .add({
            path: storageFileRef.fullPath,
            size: result.bytesTransferred,
            name: result.ref.name,
            belongsTo: firestore.collection(dbOwnerEntity).doc(ownerEntity.id),
            uploaded: new Date(),
          });
      })
      .then(result => {
        return filesRef
          .doc(result.id)
          .get()
      })
      .then(result => {
        dispatch(updateProjectModified());
        dispatch(uploadFileSuccess({
          uploadedFile: result,
          filesIndex,
        }));
      })
      .catch(error => {
        console.log(error);
        dispatch(uploadFileFailure());
      })
  }
};

const downloadFileFailure = (data, error) => ({
  type: actionTypes.file.DOWNLOAD_FILE_FAILURE,
  file: data.file,
  filesIndex: data.filesIndex,
  error,
});

const downloadFileSuccess = data => ({
  type: actionTypes.file.DOWNLOAD_FILE_SUCCESS,
  file: data.file,
  filesIndex: data.filesIndex,
});

const downloadFileRequest = data => ({
  type: actionTypes.file.DOWNLOAD_FILE_REQUEST,
  file: data.file,
  filesIndex: data.filesIndex,
});

export const downloadFile = (file, filesIndex) => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    dispatch(downloadFileRequest({
      file,
      filesIndex,
    }));

    const firebase = getFirebase();
    const storageRef = firebase.storage().ref();
    const storageFileRef = storageRef.child(file.data().path);

    storageFileRef
      .getDownloadURL()
      .then(url => {
        let xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = () => {
          const blob = xhr.response;
          saveFile(blob, file.data().name);
          dispatch(downloadFileSuccess({
            file,
            filesIndex,
          }));
        };
        xhr.onerror = error => {
          console.log(error);
          dispatch(downloadFileFailure({
            file,
            filesIndex,
          }, error));
        };
        xhr.onabort = reason => {
          console.log(reason);
          dispatch(downloadFileFailure({
            file,
            filesIndex,
          }, reason));
        };
        xhr.open('GET', url);
        xhr.send();
      })
      .catch(error => {
        console.log(error);
        dispatch(downloadFileFailure({
          file,
          filesIndex,
        }, error));
      });
  }
};

const getFilesFailure = error => ({
  type: actionTypes.file.GET_FILES_FAILURE,
  error
});

const getFilesSuccess = data => ({
  type: actionTypes.file.GET_FILES_SUCCESS,
  files: data.files,
  filesIndex: data.filesIndex,
});

const getFilesRequest = () => ({
  type: actionTypes.file.GET_FILES_REQUEST
});

export const getFiles = (ownerEntity, filesIndex) => {
  return async (dispatch, getState, {getFirebase, getFirestore}) => {
    dispatch(getFilesRequest());

    const firestore = getFirestore();
    const filesRef = firestore.collection(firestoreCollections.files.ID);
    const dbOwnerEntity = firestore.collection(ownerEntity.data().versionNum ? firestoreCollections.projectVersions.ID : firestoreCollections.projectVersionReviews.ID);

    await filesRef
      .where(firestoreCollections.files.fields.BELONGS_TO, "==", dbOwnerEntity.doc(ownerEntity.id))
      .orderBy(firestoreCollections.files.fields.UPLOADED, "asc")
      .get()
      .then(result => {
        dispatch(getFilesSuccess({
          files: result.docs,
          filesIndex
        }));
      })
      .catch(error => {
        console.log(error);
        dispatch(getFilesFailure(error));
      });
  }
};

const deleteFileFailure = (data, error) => ({
  type: actionTypes.file.DELETE_FILE_FAILURE,
  file: data.file,
  filesIndex: data.filesIndex,
  error
});

const deleteFileSuccess = () => ({
  type: actionTypes.file.DELETE_FILE_SUCCESS,
});

const deleteFileRequest = data => ({
  type: actionTypes.file.DELETE_FILE_REQUEST,
  file: data.file,
  filesIndex: data.filesIndex,
});

export const deleteFile = (file, filesIndex) => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    dispatch(deleteFileRequest({
      file,
      filesIndex
    }));

    const firebase = getFirebase();
    const firestore = getFirestore();
    const storageRef = firebase.storage().ref();
    const storageFileRef = storageRef.child(file.data().path);
    const filesRef = firestore.collection(firestoreCollections.files.ID);

    storageFileRef
      .delete()
      .then(() => {
        return filesRef
          .doc(file.id)
          .delete()
      })
      .then(() => {
        dispatch(updateProjectModified());
        dispatch(deleteFileSuccess());
      })
      .catch(error => {
        console.log(error);
        dispatch(deleteFileFailure({
          file,
          filesIndex
        }, error));
      })
  }
};

const deleteFilesInEntityFailure = error => ({
  type: actionTypes.file.DELETE_FILES_IN_ENTITY_FAILURE,
  error
});

const deleteFilesInEntitySuccess = () => ({
  type: actionTypes.file.DELETE_FILES_IN_ENTITY_SUCCESS,
});

const deleteFilesInEntityRequest = () => ({
  type: actionTypes.file.DELETE_FILES_IN_ENTITY_REQUEST
});

export const deleteFilesInEntity = ownerEntity => {
  return async (dispatch, getState, {getFirebase, getFirestore}) => {
    dispatch(deleteFilesInEntityRequest());

    const firebase = getFirebase();
    const firestore = getFirestore();
    const storageRef = firebase.storage().ref();
    const filesRef = firestore.collection(firestoreCollections.files.ID);
    const dbOwnerEntity = firestore.collection(ownerEntity.data().versionNum ? firestoreCollections.projectVersions.ID : firestoreCollections.projectVersionReviews.ID);

    await filesRef
      .where(firestoreCollections.files.fields.BELONGS_TO, "==", dbOwnerEntity.doc(ownerEntity.id))
      .get()
      .then(result => {
        if (!result.docs.empty) {
          let batch = firestore.batch();
          result.forEach(doc => {
            batch.delete(doc.ref);
            storageRef.child(doc.data().path).delete();
          });
          batch.commit();
        }
      })
      .then(() => {
        dispatch(deleteFilesInEntitySuccess());
      })
      .catch(error => {
        console.log(error);
        dispatch(deleteFilesInEntityFailure(error));
      });
  }
};

export const removeFilesAtIndex = filesIndex => {
  return dispatch => {
    dispatch({
      type: actionTypes.file.REMOVE_FILES_AT_INDEX,
      filesIndex,
    });
  }
};

export const resetFileState = () => {
  return dispatch => {
    dispatch({
      type: actionTypes.file.RESET_FILE_STATE,
    });
  }
};