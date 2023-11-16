import { db } from './config/firebase';
import { serverTimestamp, setDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import { UserInfo } from 'firebase/auth/cordova';

interface FireTimestamp {
  seconds: number;
  nanoseconds: number;
}

export interface UserProfl {
  uid: string;
  displayName: string;
  email: string;
  phoneNumber: string | null;
  photoURL: string;
  providerId: string;
  freeRequest: number;
  walletBalance: number;
  allIndexCalculation: number;
  lastLogIn: FireTimestamp;
}

interface ModifyUserProps {
  requestCount: number;
  userProfl: UserProfl;
}

async function isUserExist(uid: string) {
  const userRef = doc(db, 'users', uid);
  const userSnap = await getDoc(userRef);
  return userSnap.exists();
}

async function createUser(user: UserInfo) {
  const userRef = doc(db, 'users', user.uid);
  await setDoc(userRef, {
    ...user,
    freeRequest: 20,
    walletBalance: 0,
    allIndexCalculation: 0,
    lastLogIn: serverTimestamp(),
  });
}

async function getUserProfl(uid: string) {
  const userRef = doc(db, 'users', uid);
  const userProfl = await getDoc(userRef);
  const data = userProfl.data();

  if (!data) {
    alert('Can not get User Data, open develop console for more details');
    return null;
  }
  return data as UserProfl;
}

async function modifyUser({ userProfl, requestCount }: ModifyUserProps): Promise<boolean> {
  const pricePerRequest = 0.012;
  const paidRequest = requestCount - userProfl.freeRequest;
  const userProflRef = doc(db, 'users', userProfl.uid);

  if (requestCount > 5000) {
    alert(
      'Sorry but Thematicity index has limit 5000 request per day. If you want do more request, please contact with us. We solve this problem!'
    );
    return false;
  }

  if (paidRequest <= 0) {
    console.log('no paid');
    console.log('requestCount', requestCount);

    const newFreeRequest = userProfl.freeRequest - requestCount;
    await updateDoc(userProflRef, {
      freeRequest: newFreeRequest,
    });
    return true;
  }

  const costOfRequests = paidRequest * pricePerRequest;
  console.log('cost', costOfRequests);

  if (userProfl.walletBalance - costOfRequests < 0) {
    alert(
      `You can do ${
        Math.trunc(userProfl.walletBalance / pricePerRequest) + userProfl.freeRequest
      } index calculations, but tool got ${requestCount} urls`
    );
    return false;
  }

  const newWalletBalance = Math.trunc((userProfl.walletBalance - costOfRequests) * 10000000) / 10000000;
  await updateDoc(userProflRef, {
    freeRequest: 0,
    walletBalance: newWalletBalance,
  });
  return true;
}

const fireStore = {
  isUserExist,
  createUser,
  getUserProfl,
  modifyUser,
};

export default fireStore;
