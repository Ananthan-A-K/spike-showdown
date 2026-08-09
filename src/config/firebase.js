import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, doc, onSnapshot, setDoc, getDoc } from 'firebase/firestore';

// Firebase configuration (with default project credentials for direct sync)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyAHySEaDfHNpFZTgJoCG4z83Dxv2V4k1Gc',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'test-4d096.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'test-4d096',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'test-4d096.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '18247087949',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:18247087949:web:2545e105b6f2b23c232904',
};

// Check if Firebase credentials are provided
export const isFirebaseConfigured = () => {
  return Boolean(
    firebaseConfig.apiKey &&
    firebaseConfig.projectId &&
    firebaseConfig.apiKey !== 'YOUR_FIREBASE_API_KEY'
  );
};

// Initialize Firebase App and Firestore safely
let app = null;
let db = null;

if (isFirebaseConfigured()) {
  try {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    db = getFirestore(app);
  } catch (error) {
    console.error('Firebase initialization error:', error);
  }
}

export { db };

const TOURNAMENT_DOC_ID = 'spike_showdown_s1';
const COLLECTION_NAME = 'tournaments';

/**
 * Subscribe to real-time bracket updates from Firestore
 * @param {function} onUpdate Callback when cloud data changes
 * @param {function} onError Optional error callback
 * @returns {function} Unsubscribe function
 */
export const subscribeToBracketUpdates = (onUpdate, onError) => {
  if (!db) {
    return () => {};
  }

  const docRef = doc(db, COLLECTION_NAME, TOURNAMENT_DOC_ID);

  const unsubscribe = onSnapshot(
    docRef,
    (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data && data.bracketState) {
          onUpdate(data.bracketState);
        }
      }
    },
    (err) => {
      console.warn('Firestore live listener warning:', err);
      if (onError) onError(err);
    }
  );

  return unsubscribe;
};

/**
 * Save bracket state to Firestore
 * @param {object} bracketState Full tournament bracket state object
 */
export const saveBracketToCloud = async (bracketState) => {
  if (!db) {
    return false;
  }

  try {
    const docRef = doc(db, COLLECTION_NAME, TOURNAMENT_DOC_ID);
    await setDoc(docRef, {
      bracketState,
      updatedAt: new Date().toISOString(),
    }, { merge: true });
    return true;
  } catch (error) {
    console.error('Failed to sync bracket state to Firestore:', error);
    throw error;
  }
};
