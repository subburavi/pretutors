// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
const firebaseConfig = {
apiKey: "AIzaSyBeFHssxMk92I8NavY_BQ0HswDRkUXdrrY",

  authDomain: "pretutors-2c078.firebaseapp.com",

  projectId: "pretutors-2c078",

  storageBucket: "pretutors-2c078.firebasestorage.app",

  messagingSenderId: "426184557245",

  appId: "1:426184557245:web:e2eff58fa90d9a553badd4",

  measurementId: "G-XBYX2ZR88T"


};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const storage = getStorage(app); 

export { auth, provider, storage };