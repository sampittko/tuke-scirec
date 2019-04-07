import actionTypes from "../actionTypes";
import firestoreCollections from "../../config/firebase/collections";
import {asyncForEach, saveFile} from "../../utils/fileUtils";

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
    const firestore = getFirestore();
    const userId = firebase.auth().currentUser.uid;
    const storageRef = firebase.storage().ref();
    const dbOwnerEntity = ownerEntity.data().versionNum ? firestoreCollections.projectVersions.ID : firestoreCollections.projectVersionReviews.ID;
    const storagePath = `${userId}/${dbOwnerEntity}/${ownerEntity.id}/`;
    const filesRef = firestore.collection(firestoreCollections.files.ID);
    let storageFileRef = null;

    asyncForEach(files, async (file) => {
      storageFileRef = storageRef.child(storagePath + file.name);
      await storageFileRef
        .put(file)
        .then(async (result) => {
          return await filesRef
            .add({
              path: storageFileRef.fullPath,
              size: result.bytesTransferred,
              name: result.ref.name,
              belongsTo: firestore.collection(dbOwnerEntity).doc(ownerEntity.id),
              uploaded: new Date(),
            });
        })
        .catch(error => {
          console.log(error);
        });
    })
      .then(async () => {
        return await getFiles(ownerEntity, filesIndex)
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

const downloadFileFailure = error => ({
  type: actionTypes.file.DOWNLOAD_FILE_FAILURE,
  error
});

const downloadFileSuccess = () => ({
  type: actionTypes.file.DOWNLOAD_FILE_SUCCESS
});

const downloadFileRequest = () => ({
  type: actionTypes.file.DOWNLOAD_FILE_REQUEST
});

export const downloadFile = file => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    dispatch(downloadFileRequest());

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
          dispatch(downloadFileSuccess());
        };
        xhr.onerror = error => {
          console.log(error);
          dispatch(downloadFileFailure(error));
        };
        xhr.onabort = reason => {
          console.log(reason);
          dispatch(downloadFileFailure(reason));
        };
        xhr.open('GET', url);
        xhr.send();
      })
      .catch(error => {
        console.log(error);
        dispatch(downloadFileFailure(error));
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

export const incrementFilesId = () => {
  return dispatch => {
    dispatch({
      type: actionTypes.file.INCREMENT_FILES_ID,
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