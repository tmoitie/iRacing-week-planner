import { initializeApp } from 'firebase/app';
import * as firebaseAuth from 'firebase/auth';
import * as firebaseFirestore from 'firebase/firestore';

import { getFirebaseAuth, getFirebaseFirestore } from '../firebase';

jest.mock('firebase/app');
jest.mock('firebase/auth');
jest.mock('firebase/firestore');

describe('firebase loader', () => {
  test('loads Firebase products lazily with one shared app', async () => {
    const [[authApp, auth], [firestoreApp, firestore]] = await Promise.all([
      getFirebaseAuth(),
      getFirebaseFirestore(),
    ]);

    expect(initializeApp).toHaveBeenCalledTimes(1);
    expect(authApp).toBe(firestoreApp);
    expect(auth).toBe(firebaseAuth);
    expect(firestore).toBe(firebaseFirestore);
  });
});
