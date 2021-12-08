export function getAuth() {
  return {};
}

export async function signOut() { }

export async function signInWithEmailAndPassword() { }

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
