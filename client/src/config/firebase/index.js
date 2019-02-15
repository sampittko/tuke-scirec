import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

var config = { 
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