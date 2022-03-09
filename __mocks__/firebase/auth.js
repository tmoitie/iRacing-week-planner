export function getAuth() {
  return {};
}

export async function signOut() { }

export const signInWithEmailAndPassword = jest.fn(async () => {});

export async function createUserWithEmailAndPassword() { }

const authStateListeners = [];

export function onAuthStateChanged(auth, listener) {
  authStateListeners.push(listener);
}

export function testDispatchOnAuthStateChanged(user) {
  authStateListeners.forEach((listener) => {
    listener(user);
  });
}

export async function sendPasswordResetEmail() { }
