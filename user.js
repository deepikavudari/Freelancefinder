// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-analytics.js";
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";


const firebaseConfig = {
  apiKey: "AIzaSyDaQcU5C7TOLGkkgEziVVUn8dk8f9pyqKg",
  authDomain: "freelancefinder-e34e6.firebaseapp.com",
  databaseURL: "https://freelancefinder-e34e6-default-rtdb.firebaseio.com",
  projectId: "freelancefinder-e34e6",
  storageBucket: "freelancefinder-e34e6.firebasestorage.app",
  messagingSenderId: "708300213936",
  appId: "1:708300213936:web:655d39ca28d99c2e003575",
  measurementId: "G-3549SKX3JN"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

const signout = document.querySelector("#signOut");
signout.addEventListener("click",()=>{
signOut(auth).then(()=>{
    alert("Signed out successfully!");
    window.location.href="index.html";
}).catch(()=>{
    console.error("Error signing out: ", error);
});
});