import { db } from './config/firebase';
import { serverTimestamp, setDoc, doc, getDoc, updateDoc, FieldValue } from 'firebase/firestore';
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
  freeRequest?: number;
  walletBalance?: number;
  allIndexCalculation?: number;
  lastLogIn?: FieldValue;
}

interface ModifyUserBalanceProps {
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

async function modifyUser(userProfl: UserProfl, modifyObj: ModifyUserProps) {
  const userProflRef = doc(db, 'users', userProfl.uid);
  await updateDoc(userProflRef, { ...modifyObj });
}

async function modifyUserBalance({
  userProfl,
  requestCount,
}: ModifyUserBalanceProps): Promise<boolean> {
  const pricePerRequest = 0.012;
  const paidRequest = requestCount - userProfl.freeRequest;
  const indexCalculation = userProfl.allIndexCalculation + requestCount;

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
    await modifyUser(userProfl, {
      freeRequest: newFreeRequest,
      allIndexCalculation: indexCalculation,
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

  const newWalletBalance =
    Math.trunc((userProfl.walletBalance - costOfRequests) * 10000000) / 10000000;
  await modifyUser(userProfl, {
    freeRequest: 0,
    walletBalance: newWalletBalance,
    allIndexCalculation: indexCalculation,
  });
  return true;
}

const fireStore = {
  isUserExist,
  createUser,
  getUserProfl,
  modifyUser,
  modifyUserBalance,
};

export default fireStore;
