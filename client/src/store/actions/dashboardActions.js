import actionTypes from '../actionTypes';
import firestoreCollections from '../../config/firebase/collections';
import { category } from '../../config/app/';

const createCategoryFailure = error => ({
  type: actionTypes.CREATE_CATEGORY_SUCCESS
})

const createCategorySuccess = () => ({
  type: actionTypes.CREATE_CATEGORY_SUCCESS
})

const createCategoryRequest = () => ({
  type: actionTypes.CREATE_CATEGORY_REQUEST
})

export const createCategory = newCategory => {
  // TODO
  // return (dispatch, getState, { getFirebase, getFirestore }) => {
  //   dispatch(createCategoryRequest());

  //   const firestore = getFirestore();
  //   const usersRef = firestore.collection(firestoreCollections.USERS);
  //   const categoriesRef = firestore.collection(firestoreCollections.CATEGORIES);
  //   const currentUserId = getState().user.data.id;

  //   categoriesRef
  //     .doc(currentUserId).add({
  //       user: currentUserId,
  //       name: newCategory.name,
  //       color: category.defaults.COLOR,
  //       default: newCategory.default,
  //       projects: {},
  //       created: new Date()
  //   }).then(() => {
  //     return usersRef
  //       .doc(currentUserId).get()
  //   }).then(result => {
  //     console.log(result);
  //     return usersRef
  //       .doc(currentUserId).update({
  //         categories: 
  //       })
  //   }).then(() => {
  //     dispatch(createCategorySuccess());
  //   }).catch(error => {
  //     dispatch(createCategoryFailure(error));
  //   });
  // }
}