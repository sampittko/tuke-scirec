import actionTypes from '../actionTypes';
import firestoreCollections from '../../config/firebase/collections';
import { category } from '../../config/app/';
import { appErrorCodes } from '../../config/app/errorCodes';

const getCategoriesFailure = () => ({
  type: actionTypes.GET_CATEGORIES_FAILURE
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
    firestore.collection(firestoreCollections.CATEGORIES.ID)
      .where(firestoreCollections.CATEGORIES.fields.USER, "==", currentUserId)
      .get()
    .then(result => {
      dispatch(getCategoriesSuccess(result));
    }).catch(error => {
      console.log(error);
      dispatch(getCategoriesFailure());
    });
  }
}

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
    const categoriesRef = firestore.collection(firestoreCollections.CATEGORIES.ID);
    const currentUserId = getState().user.data.id;

    categoriesRef
      .add({
        user: currentUserId,
        name: newCategory.name,
        color: category.defaults.COLOR,
        default: newCategory.default,
        projects: [],
        created: new Date()
    }).then(() => {
      dispatch(createCategorySuccess());
    }).catch(error => {
      console.log(error);
      dispatch(createCategoryFailure());
    });
  }
}