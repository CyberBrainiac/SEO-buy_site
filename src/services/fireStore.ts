import { db } from './config/firebase';
import { setDoc, doc, getDoc, updateDoc, Timestamp } from 'firebase/firestore';
import { UserInfo } from 'firebase/auth/cordova';
import price from './config/price';

type ToolNames = 'LinkInsertion' | 'ThematicityIndex';

export interface FirestoreUserProfile {
  uid: string;
  displayName: string;
  email: string;
  phoneNumber: string | null;
  photoURL: string;
  providerId: string;
  freeRequest: number;
  walletBalance: number;
  allIndexCalculation: number;
  lastLogIn: Timestamp;
  whenFreebies: Timestamp;
}

export interface UserProfile extends Omit<FirestoreUserProfile, 'lastLogIn' | 'whenFreebies'> {
  lastLogIn: number;
  whenFreebies: number;
}

interface ModifyUserProps {
  freeRequest?: number;
  walletBalance?: number;
  allIndexCalculation?: number;
  lastLogIn?: Timestamp;
  whenFreebies?: Timestamp;
}

interface ModifyUserBalanceProps {
  requestCount: number;
  userProfile: UserProfile;
  toolName: ToolNames;
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
    lastLogIn: Timestamp.now(),
    whenFreebies: Timestamp.now(),
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
  return data as FirestoreUserProfile;
}

async function modifyUser(userID: string, modifyObj: ModifyUserProps) {
  const userProflRef = doc(db, 'users', userID);

  try {
    await updateDoc(userProflRef, { ...modifyObj, lastLogIn: Timestamp.now() });
    return true;
  } catch (error) {
    return false;
  }
}

async function calculateBalance({ userProfile, requestCount, toolName }: ModifyUserBalanceProps) {
  const paidRequest = requestCount - userProfile.freeRequest;
  const indexCalculation = userProfile.allIndexCalculation + requestCount;
  const pricePerRequest = (() => {
    switch (toolName) {
      case 'LinkInsertion':
        return price.linkInsertionRequest;
      case 'ThematicityIndex':
        return price.indexThematiicityRequest;
      default:
        alert(`Tool: ${toolName} doesn't exist`);
        return 0;
    }
  })();

  if (requestCount > 5000) {
    alert(
      'Sorry but Thematicity index has limit 5000 request per day. If you want do more request, please contact with us. We solve this problem!'
    );
    return false;
  }

  if (paidRequest <= 0) {
    const newFreeRequest = userProfile.freeRequest - requestCount;
    return {
      freeRequest: newFreeRequest,
      allIndexCalculation: indexCalculation,
    };
  }
  const costOfRequests = paidRequest * pricePerRequest;

  if (userProfile.walletBalance - costOfRequests < 0) {
    alert(
      `You can do ${
        Math.trunc(userProfile.walletBalance / pricePerRequest) + userProfile.freeRequest
      } index calculations, but tool get ${requestCount} urls`
    );
    return false;
  }

  const newWalletBalance =
    Math.trunc((userProfile.walletBalance - costOfRequests) * 10000000) / 10000000;

  return {
    freeRequest: 0,
    walletBalance: newWalletBalance,
    allIndexCalculation: indexCalculation,
  };
}

//Modify login time and set free request
async function modifyFreeRequest(uid: string) {
  const FirestoreUserProfile = await fireStore.getUserProfl(uid);

  if (!FirestoreUserProfile) {
    alert('Authorization error');
    return;
  }
  const userProfl = serializeUserProfile(FirestoreUserProfile);
  const dayInMillSec = 86400000;

  //take user additional free request
  if (Date.now() - userProfl.whenFreebies >= dayInMillSec) {
    fireStore.modifyUser(userProfl.uid, {
      freeRequest: 20,
      whenFreebies: Timestamp.now(),
    });
    return;
  }
  fireStore.modifyUser(userProfl.uid, {}); //modify user logIn time
}

export const serializeUserProfile = (userProfile: FirestoreUserProfile): UserProfile => {
  const logInTimestamp = userProfile.lastLogIn.toMillis();
  const freebiesTimestamp = userProfile.whenFreebies.toMillis();
  const serializedUserProfile = {
    ...userProfile,
    lastLogIn: logInTimestamp,
    whenFreebies: freebiesTimestamp,
  };
  return serializedUserProfile;
};

const fireStore = {
  isUserExist,
  createUser,
  getUserProfl,
  modifyUser,
  calculateBalance,
  modifyFreeRequest,
};

export default fireStore;
