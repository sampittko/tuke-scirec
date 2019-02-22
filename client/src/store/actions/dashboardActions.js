import actionTypes from '../actionTypes';
import firestoreCollections from '../../config/firebase/collections';
import { category } from '../../config/app/';
import { appErrorCodes } from '../../config/app/errorCodes';

const createCategoryFailure = () => ({
  type: actionTypes.CREATE_CATEGORY_FAILURE
})

const createCategorySuccess = () => ({
  type: actionTypes.CREATE_CATEGORY_SUCCESS
})

const createCategoryRequest = () => ({
  type: actionTypes.CREATE_CATEGORY_REQUEST
})

export const createCategory = newCategory => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    dispatch(createCategoryRequest());

    const firestore = getFirestore();
    const usersRef = firestore.collection(firestoreCollections.USERS);
    const categoriesRef = firestore.collection(firestoreCollections.CATEGORIES);
    const currentUserId = getState().user.data.id;
    let createdCategoryId = '';
    let currentUserCategories = [];

    usersRef
      .doc(currentUserId).get()
    .then(result => {
      currentUserCategories = result.data().categories;
      if (currentUserCategories.length >= category.COUNT_MAX_LIMIT) {
        return Promise.reject(appErrorCodes.CATEGORY_COUNT_MAX_LIMIT_REACHED);
      }
      else {
        return categoriesRef
          .add({
            user: currentUserId,
            name: newCategory.name,
            color: category.defaults.COLOR,
            default: newCategory.default,
            projects: [],
            created: new Date()
          })
      }
    }).then(result => {
      createdCategoryId = result.id;
      return usersRef
        .doc(currentUserId).update({
          categories: [...currentUserCategories, categoriesRef.doc(createdCategoryId)]
        })
    }).then(() => {
      dispatch(createCategorySuccess());
    }).catch(error => {
      console.log(error);
      dispatch(createCategoryFailure());
    });
  }
}