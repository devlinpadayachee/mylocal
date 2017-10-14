import * as firebase from 'firebase';  // Initialize Firebase
  var fireBaseconfig = {
    apiKey: "AIzaSyBGIkEWrwK00bfkurE5nVuMwNxYbT_wWr0",
    authDomain: "mylocal-97b23.firebaseapp.com",
    databaseURL: "https://mylocal-97b23.firebaseio.com",
    projectId: "mylocal-97b23",
    storageBucket: "mylocal-97b23.appspot.com",
    messagingSenderId: "597788154922"
  };
  // firebase.initializeApp(fireBaseconfig);
  console.log("Setting up Firebase");
try {
  firebase.initializeApp(fireBaseconfig);
  console.log("Initialized Firebase");
} catch (err) {
  // we skip the "already exists" message which is
  // not an actual error when we're hot-reloading
  if (!/already exists/.test(err.message)) {
  console.error('Firebase initialization error', err.stack)
  }
}

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    console.log(user.email)
    console.log("user is signed in")
  } else {
    console.log("user is signed out")
  }
});

const firebaseApp = firebase;
export default firebaseApp;
