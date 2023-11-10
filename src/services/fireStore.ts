import { db } from './config/firebase';
import { doc, getDoc, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { UserInfo } from 'firebase/auth/cordova';

async function isUserExist(uid: string) {
  const userRef = doc(db, 'users', uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) return false;
  console.log('User already exists');
  return true;
}

async function createUser(user: UserInfo) {
  const userGoogleRef = collection(db, 'users', user.uid, 'googleProf');
  const userGoogleProf = await addDoc(userGoogleRef, {
    ...user,
  });
  console.log(`Google id: ${userGoogleProf.id}`);

  const userProjRef = collection(db, 'users', user.uid, 'projProf');
  const userProjProf = await addDoc(userProjRef, {
    freeRequest: 20,
    walletBalance: 0,
    allIndexCalculation: 0,
    lastLogIn: serverTimestamp(),
  });
  console.log(`Proj id: ${userProjProf.id}`);
}

async function modifyUser(uid: string) {
  return uid;
}

const fireStore = {
  isUserExist,
  createUser,
  modifyUser,
};

export default fireStore;
