import { db } from './config/firebase';
import { serverTimestamp, setDoc, doc, getDoc, updateDoc, FieldValue } from 'firebase/firestore';
import { UserInfo } from 'firebase/auth/cordova';

interface FireTimestamp {
  seconds: number;
  nanoseconds: number;
}

export interface UserProfile {
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
  userProfile: UserProfile;
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
    console.error('Can`t get userProfl');
    return undefined;
  }
  return data as UserProfile;
}

async function modifyUser(userID: string, modifyObj: ModifyUserProps) {
  const userProflRef = doc(db, 'users', userID);

  try {
    await updateDoc(userProflRef, { ...modifyObj });
    return true;
  } catch (error) {
    return false;
  }
}

async function modifyUserBalance({
  userProfile,
  requestCount,
}: ModifyUserBalanceProps): Promise<boolean> {
  const pricePerRequest = 0.012;
  const paidRequest = requestCount - userProfile.freeRequest;
  const indexCalculation = userProfile.allIndexCalculation + requestCount;

  if (requestCount > 5000) {
    alert(
      'Sorry but Thematicity index has limit 5000 request per day. If you want do more request, please contact with us. We solve this problem!'
    );
    return false;
  }

  if (paidRequest <= 0) {
    console.log('no paid');
    console.log('requestCount', requestCount);

    const newFreeRequest = userProfile.freeRequest - requestCount;
    const modufyResult = await modifyUser(userProfile.uid, {
      freeRequest: newFreeRequest,
      allIndexCalculation: indexCalculation,
    });
    return modufyResult;
  }

  const costOfRequests = paidRequest * pricePerRequest;
  console.log('cost', costOfRequests);

  if (userProfile.walletBalance - costOfRequests < 0) {
    alert(
      `You can do ${
        Math.trunc(userProfile.walletBalance / pricePerRequest) + userProfile.freeRequest
      } index calculations, but tool got ${requestCount} urls`
    );
    return false;
  }

  const newWalletBalance =
    Math.trunc((userProfile.walletBalance - costOfRequests) * 10000000) / 10000000;
  await modifyUser(userProfile.uid, {
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
