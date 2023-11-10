import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: 'AIzaSyDpoWIqtGP4SlVAsAEjAel84a58694785A',
  authDomain: 'thematicity-index.firebaseapp.com',
  projectId: 'thematicity-index',
  storageBucket: 'thematicity-index.appspot.com',
  messagingSenderId: '663201961145',
  appId: '1:663201961145:web:000f2a4bc459865e287768',
  measurementId: 'G-XS7TD538VE',
};

const app = initializeApp(firebaseConfig);

export const analytics = getAnalytics(app);
export const db = getFirestore(app);
export default firebaseConfig;
