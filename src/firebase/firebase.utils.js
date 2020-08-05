import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyC9Q32GAtxvJnHE5n8_rIj-AYExs3wyQxM',
  authDomain: 'tiara-estates.firebaseapp.com',
  databaseURL: 'https://tiara-estates.firebaseio.com',
  projectId: 'tiara-estates',
  storageBucket: 'tiara-estates.appspot.com',
  messagingSenderId: '778447209169',
  appId: '1:778447209169:web:5395acf9af3c06bbb53bf0',
};

firebase.initializeApp (config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc (`users/${userAuth.uid}`);

  const snapShot = await userRef.get ();

  if (!snapShot.exists) {
    const {displayName, email} = userAuth;
    const createdAt = new Date ();
    try {
      await userRef.set ({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log ('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth ();
export const firestore = firebase.firestore ();

const provider = new firebase.auth.GoogleAuthProvider ();
provider.setCustomParameters ({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup (provider);

export default firebase;
