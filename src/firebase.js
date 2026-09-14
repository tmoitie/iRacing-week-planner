import { firebaseConfig } from './config';

let firebaseAppPromise;
let firebaseAuthPromise;
let firebaseFirestorePromise;

export function getFirebaseApp() {
  if (!firebaseAppPromise) {
    firebaseAppPromise = import(/* webpackChunkName: "firebase-app" */ 'firebase/app')
      .then(({ initializeApp }) => initializeApp(firebaseConfig));
  }

  return firebaseAppPromise;
}

export function getFirebaseAuth() {
  if (!firebaseAuthPromise) {
    firebaseAuthPromise = import(/* webpackChunkName: "firebase-auth" */ 'firebase/auth');
  }

  return Promise.all([getFirebaseApp(), firebaseAuthPromise]);
}

export function getFirebaseFirestore() {
  if (!firebaseFirestorePromise) {
    firebaseFirestorePromise = import(/* webpackChunkName: "firebase-firestore" */ 'firebase/firestore');
  }

  return Promise.all([getFirebaseApp(), firebaseFirestorePromise]);
}
