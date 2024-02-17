import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDML-afYvAu-G1WbjEMMSTxLaQw6NDnsa0",
  authDomain: "cloudnestsync.firebaseapp.com",
  projectId: "cloudnestsync",
  storageBucket: "cloudnestsync.appspot.com",
  messagingSenderId: "462864332223",
  appId: "1:462864332223:web:d20f26ec099fb0692b9d0a",
};

export const app = initializeApp(firebaseConfig);

export default app;
