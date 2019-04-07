import actionTypes from "../actionTypes";
import firestoreCollections from "../../config/firebase/collections";
import {asyncForEach} from "../../utils/fileUtils";

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

export const uploadFiles = (files, ownerEntity) => {
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
              belongsTo: ownerEntity.id,
            });
        })
        .catch(error => {
          console.log(error);
        });
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
    const storageRef = firebase.storage.ref();
    const storageFileRef = storageRef.child(file.data().path);

    storageFileRef
      .getDownloadURL()
      .then(url => {
        const xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.open('GET', url);
        xhr.send();
        dispatch(downloadFileSuccess());
      })
      .catch(error => {
        console.log(error);
        dispatch(downloadFileFailure(error));
      });
  }
};