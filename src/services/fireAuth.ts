import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import firebaseConfig from './config/firebase';
import { initializeApp } from 'firebase/app';

initializeApp(firebaseConfig);
const auth = getAuth();

const logIn = async () => {
  const provider = new GoogleAuthProvider();

  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    console.log(user.providerData[0]);
    return user.providerData[0];
  } catch (err) {
    console.error(err);
  }
};

const logOut = async () => {
  let result;

  try {
    await signOut(auth);
    result = true;
  } catch (err) {
    console.error(err);
    result = false;
  }

  return result;
};

const firebaseAuth = {
  logIn,
  logOut,
};

export default firebaseAuth;
