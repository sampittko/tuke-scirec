import actionTypes from '../actionTypes';
import firestoreCollections from '../../config/firebase/collections';
import { category } from '../../config/app/';
import { appErrorCodes } from '../../config/app/errorCodes';

const getCategoriesFailure = error => ({
  type: actionTypes.GET_CATEGORIES_FAILURE,
  error
})

const getCategoriesSuccess = result => ({
  type: actionTypes.GET_CATEGORIES_SUCCESS,
  categories: result.docs
})

const getCategoriesRequest = () => ({
  type: actionTypes.GET_CATEGORIES_REQUEST
})

export const getCategories = currentUserId => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    dispatch(getCategoriesRequest());

    const firestore = getFirestore();
    const usersRef = firestore.collection(firestoreCollections.USERS.ID);
    const categoriesRef = firestore.collection(firestoreCollections.CATEGORIES.ID);

    categoriesRef
      .where(firestoreCollections.CATEGORIES.fields.USER, "==", usersRef.doc(currentUserId))
      .get()
    .then(result => {
      dispatch(getCategoriesSuccess(result));
    }).catch(error => {
      console.log(error);
      dispatch(getCategoriesFailure(error));
    });
  }
}

const createCategoryFailure = error => ({
  type: actionTypes.CREATE_CATEGORY_FAILURE,
  error
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
    const usersRef = firestore.collection(firestoreCollections.USERS.ID);
    const categoriesRef = firestore.collection(firestoreCollections.CATEGORIES.ID);
    const currentUserId = getState().user.data.id;

    categoriesRef
      .add({
        user: usersRef.doc(currentUserId),
        name: newCategory.name,
        color: category.defaults.COLOR,
        created: new Date()
    }).then(result => {
      if (newCategory.default) {
        return usersRef.doc(currentUserId)
          .update({
            defaultCategory: categoriesRef.doc(result.id)
          })
      }
      else {
        return Promise.resolve();
      }
    }).then(() => {
      dispatch(createCategorySuccess());
    }).catch(error => {
      console.log(error);
      dispatch(createCategoryFailure(error));
    });
  }
}