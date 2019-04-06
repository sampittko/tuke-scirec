import actionTypes from "../actionTypes";

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
    // dispatch(uploadFilesRequest());
    //
    // const firebase = getFirebase();
    // const storageRef = firebase.storage().ref();
    // const storageUploadsRef = storageRef.child('uploads/' + files[0].name);
    //
    // storageUploadsRef
    //   .put(files[0])
    //   .then(result => {
    //     console.log(result);
    //     dispatch(uploadFilesSuccess());
    //   })
    //   .catch(error => {
    //     console.log(error);
    //     dispatch(uploadFilesFailure(error));
    //   })
  }
};