import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDeXZvEHC07hlM-tL6o1-JcPaxEG5o-MvU",
  authDomain: "slack-clone-93fe3.firebaseapp.com",
  projectId: "slack-clone-93fe3",
  storageBucket: "slack-clone-93fe3.appspot.com",
  messagingSenderId: "191933698320",
  appId: "1:191933698320:web:79fc1cdf250fa62f8bd595"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider, db};