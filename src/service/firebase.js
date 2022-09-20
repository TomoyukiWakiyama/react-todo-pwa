import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCy0z8APCX1mIKamxa62X7wxM115Dezimw",
  authDomain: "react-todo-pwa-59e10.firebaseapp.com",
  projectId: "react-todo-pwa-59e10",
  storageBucket: "react-todo-pwa-59e10.appspot.com",
  messagingSenderId: "606675917715",
  appId: "1:606675917715:web:4decf1ed889871d32c6666",
};
// const auth = getAuth(app)

const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

const auth = getAuth();
const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
};
const logOut = () => {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
      console.log("logOut correct");
      document.location.reload();
    })
    .catch((error) => {
      console.log(error.message);
    });
};
export { auth, provider, db, signInWithGoogle, logOut };
