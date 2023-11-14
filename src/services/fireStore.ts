import { db } from './config/firebase';
import { collection, addDoc, serverTimestamp, getDocs } from 'firebase/firestore';
import { UserInfo } from 'firebase/auth/cordova';

interface FireTimestamp {
  seconds: number;
  nanoseconds: number;
}

export interface UserProjProfl {
  freeRequest: number;
  walletBalance: number;
  allIndexCalculation: number;
  lastLogIn: FireTimestamp;
}

async function isUserExist(uid: string) {
  const userRef = collection(db, 'users', uid, 'googleProfl');
  const userSnap = await getDocs(userRef);
  let isExist = false;

  userSnap.forEach(doc => {
    const data = doc.data();
    if ('email' in data) {
      isExist = true;
    }
  });

  return isExist;
}

async function createUser(user: UserInfo) {
  const userGoogleRef = collection(db, 'users', user.uid, 'googleProfl');
  const userGoogleProfl = await addDoc(userGoogleRef, {
    ...user,
  });
  console.log(`Google id: ${userGoogleProfl.id}`);

  const userProjRef = collection(db, 'users', user.uid, 'projProfl');
  const userProjProfl = await addDoc(userProjRef, {
    freeRequest: 20,
    walletBalance: 0,
    allIndexCalculation: 0,
    lastLogIn: serverTimestamp(),
  });
  console.log(`Proj id: ${userProjProfl.id}`);
}

async function getProjProfl(uid: string) {
  const projRef = collection(db, 'users', uid, 'projProfl');
  const projSnapshot = await getDocs(projRef);
  const projData: UserProjProfl[] = [];

  projSnapshot.forEach(doc => {
    const data = doc.data() as UserProjProfl;
    projData.push(data);
  });
  return projData[0];
}

async function modifyUser(uid: string) {
  return uid;
}

const fireStore = {
  isUserExist,
  createUser,
  getProjProfl,
  modifyUser,
};

export default fireStore;
