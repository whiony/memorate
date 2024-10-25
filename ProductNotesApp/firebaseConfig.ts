import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { API_KEY, AUTH_DOMAIN, PROJECT_ID, STORAGE_BUCKET, MESSAGING_SENDER_ID, APP_ID } from '@env';

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const firestore = getFirestore(app);

// Example function to add a note to Firestore
const addNote = async () => {
  try {
    await addDoc(collection(firestore, 'notes'), {
      comment: 'This is a new note',
      rating: 5,
      image: 'https://example.com/image.jpg',
    });
    console.log('Note added!');
  } catch (error) {
    console.error('Error adding note:', error);
  }
};