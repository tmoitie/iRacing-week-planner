export const getAuth = jest.fn(() => ({}));

export const signOut = jest.fn(async () => {});

export const signInWithEmailAndPassword = jest.fn(async () => {});

export const createUserWithEmailAndPassword = jest.fn(async () => {});

export const signInWithPopup = jest.fn(async () => {});

const authStateListeners = [];

export function onAuthStateChanged(auth, listener) {
  authStateListeners.push(listener);
}

export async function testDispatchOnAuthStateChanged(user) {
  await Promise.all(authStateListeners.map((listener) => listener(user)));
}

export const sendPasswordResetEmail = jest.fn(async () => {});

export const GoogleAuthProvider = jest.requireActual('@firebase/auth').GoogleAuthProvider;
