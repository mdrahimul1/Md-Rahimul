import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAHJZorYshiAqVw4FU8LN30JY1sh-8_R5Y",
  authDomain: "pro-video-wb.firebaseapp.com",
  databaseURL: "https://pro-video-wb-default-rtdb.firebaseio.com",
  projectId: "pro-video-wb",
  storageBucket: "pro-video-wb.firebasestorage.app",
  messagingSenderId: "1057454914410",
  appId: "1:1057454914410:web:c076c48a52e4a6834d8313"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
export default app;