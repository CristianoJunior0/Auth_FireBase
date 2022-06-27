import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAp_TFJuMcVZTZPSdRofAmUP8ecWgQO_0Y",
  authDomain: "login-emballoon.firebaseapp.com",
  projectId: "login-emballoon",
  storageBucket: "login-emballoon.appspot.com",
  messagingSenderId: "49502266238",
  appId: "1:49502266238:web:febeae9e66b2471653c92f",
  measurementId: "G-NJ9GS19W1N"
};


export const app = initializeApp(firebaseConfig);