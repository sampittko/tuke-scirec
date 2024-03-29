import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

import firebase from 'firebase/app';

let config = {
  apiKey: "AIzaSyBqer08KB4pB_bm5wlMS6E9HlsTfDj58NU",
  authDomain: "scirec-app.firebaseapp.com",
  databaseURL: "https://scirec-app.firebaseio.com",
  projectId: "scirec-app",
  storageBucket: "scirec-app.appspot.com",
  messagingSenderId: "539888467562"
};

firebase.initializeApp(config);
firebase.firestore().settings({ timestampsInSnapshots: true });

export default firebase;