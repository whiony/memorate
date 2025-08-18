import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { initializeAuth, getAuth, Auth } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { API_KEY, AUTH_DOMAIN, PROJECT_ID, STORAGE_BUCKET, MESSAGING_SENDER_ID, APP_ID } from '@env';

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID,
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const firestore = getFirestore(app);

let auth: Auth;
try {
  const { getReactNativePersistence } = require('@firebase/auth/dist/rn');
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
  });
} catch (error) {
  console.log('Auth initialization with persistence failed, using basic auth:', error);
  try {
    auth = getAuth(app);
  } catch (getAuthError) {
    auth = initializeAuth(app);
  }
}

export { auth };