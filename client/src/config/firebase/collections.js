const firestoreCollections = {
  USERS: {
    ID: 'users'
  },
  CATEGORIES: {
    ID: 'categories',
    fields: {
      USER: 'user'
    }
  }
}

export default firestoreCollections;