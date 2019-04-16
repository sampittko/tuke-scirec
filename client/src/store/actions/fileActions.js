import actionTypes from "../actionTypes";
import firestoreCollections from "../../config/firebase/collections";
import {asyncForEach, convertBtoMB, saveFile} from "../../utils/fileUtils";
import {updateProjectModified} from "./projectActions";
import {fileConfig} from "../../config/app";

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
      if (convertBtoMB(file.size) <= fileConfig.MAX_SINGLE_FILE_SIZE_MB) {
        await dispatch(uploadFile(storagePath + file.name, file, ownerEntity, dbOwnerEntity, filesIndex));
      }
    })
      .then(() => {
        dispatch(updateProjectModified());
        dispatch(uploadFilesSuccess())
      })
      .catch(error => {
        console.log(error);
        dispatch(uploadFilesFailure(error));
      });
  }
};

const uploadFileFailure = (data, error) => ({
  type: actionTypes.file.UPLOAD_FILE_FAILURE,
  filesIndex: data.filesIndex,
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

export const uploadFile = (path, file, ownerEntity, dbOwnerEntity, filesIndex) => {
  return async (dispatch, getState, {getFirebase, getFirestore}) => {
    dispatch(uploadFileRequest({
      fileName: file.name,
      filesIndex
    }));

    const firebase = getFirebase();
    const firestore = getFirestore();
    const state = getState();
    const userId = firebase.auth().currentUser.uid;
    const storageRef = firebase.storage().ref();
    const filesRef = firestore.collection(firestoreCollections.files.ID);
    let storageFileRef = storageRef.child(path);
    const fileWithSameName = state.file.data.lists[filesIndex].find(existingFile => !existingFile.futureFileName && existingFile.data().name === file.name);

    if (fileWithSameName) {
      await dispatch(deleteFile(fileWithSameName, filesIndex));
    }

    await storageFileRef
      .put(file)
      .then(result => {
        return filesRef
          .add({
            [firestoreCollections.files.fields.META]: {
              [firestoreCollections.files.fields.meta.AUTHOR_ID]: userId,
              [firestoreCollections.files.fields.meta.PATH]: storageFileRef.fullPath,
              [firestoreCollections.files.fields.meta.SIZE]: result.bytesTransferred,
              [firestoreCollections.files.fields.meta.UPLOADED]: new Date(),
              [firestoreCollections.files.fields.meta.PARENT]: {
                [firestoreCollections.files.fields.meta.parent.ID]: ownerEntity.id,
                [firestoreCollections.files.fields.meta.parent.COLLECTION]: dbOwnerEntity,
              },
            },
            [firestoreCollections.files.fields.NAME]: result.ref.name,
          });
      })
      .then(result => {
        return filesRef
          .doc(result.id)
          .get()
      })
      .then(result => {
        dispatch(uploadFileSuccess({
          uploadedFile: result,
          filesIndex,
        }));
      })
      .catch(error => {
        console.log(error);
        dispatch(uploadFileFailure({
          filesIndex
        }, error));
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
    const storageFileRef = storageRef.child(file.data().meta.path);

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

const getFilesFailure = (data, error) => ({
  type: actionTypes.file.GET_FILES_FAILURE,
  filesIndex: data.filesIndex,
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

    const firebase = getFirebase();
    const userId = firebase.auth().currentUser.uid;
    const firestore = getFirestore();
    const filesRef = firestore.collection(firestoreCollections.files.ID);

    await filesRef
      .where(`${firestoreCollections.files.fields.META}.${firestoreCollections.files.fields.meta.AUTHOR_ID}`, "==", userId)
      .where(`${firestoreCollections.files.fields.META}.${firestoreCollections.files.fields.meta.PARENT}.${firestoreCollections.files.fields.meta.parent.ID}`, "==", ownerEntity.id)
      .orderBy(`${firestoreCollections.files.fields.META}.${firestoreCollections.files.fields.meta.UPLOADED}`, "asc")
      .get()
      .then(result => {
        dispatch(getFilesSuccess({
          files: result.docs,
          filesIndex
        }));
      })
      .catch(error => {
        console.log(error);
        dispatch(getFilesFailure({
          filesIndex
        }, error));
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
  return async (dispatch, getState, {getFirebase, getFirestore}) => {
    dispatch(deleteFileRequest({
      file,
      filesIndex
    }));

    const firebase = getFirebase();
    const firestore = getFirestore();
    const storageRef = firebase.storage().ref();
    const storageFileRef = storageRef.child(file.data().meta.path);
    const filesRef = firestore.collection(firestoreCollections.files.ID);

    await storageFileRef
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
    const userId = firebase.auth().currentUser.uid;
    const firestore = getFirestore();
    const storageRef = firebase.storage().ref();
    const filesRef = firestore.collection(firestoreCollections.files.ID);

    await filesRef
      .where(`${firestoreCollections.files.fields.META}.${firestoreCollections.files.fields.meta.AUTHOR_ID}`, "==", userId)
      .where(`${firestoreCollections.files.fields.META}.${firestoreCollections.files.fields.meta.PARENT}.${firestoreCollections.files.fields.meta.parent.ID}`, "==", ownerEntity.id)
      .get()
      .then(result => {
        if (!result.docs.empty) {
          let batch = firestore.batch();
          result.forEach(doc => {
            batch.delete(doc.ref);
            storageRef.child(doc.data().meta.path).delete();
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