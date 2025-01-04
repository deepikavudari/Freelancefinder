// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

export const firebaseConfig = {
  apiKey: "AIzaSyDaQcU5C7TOLGkkgEziVVUn8dk8f9pyqKg",
  authDomain: "freelancefinder-e34e6.firebaseapp.com",
  projectId: "freelancefinder-e34e6",
  storageBucket: "freelancefinder-e34e6.firebasestorage.app",
  messagingSenderId: "708300213936",
  appId: "1:708300213936:web:655d39ca28d99c2e003575",
  measurementId: "G-3549SKX3JN",
};

{
  /* Initialize Firebase */
}
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

const submit = document.getElementById("submit");
submit.addEventListener("click", function (event) {
  event.preventDefault();

const email = document.getElementById("email").value;
const password = document.getElementById("password").value;

 if(!email||!password){
  alert("Enter email or password!")
 }

 signInWithEmailAndPassword(auth, email, password)
 .then((userCredential) => {
   // Signed in 
   const user = userCredential.user;
   // ...
   alert("Signed in successfully")

   
   window.location.href = "user.html"

 })
 .catch((error) => {
   const errorCode = error.code;
   const errorMessage = error.message;
   alert("Error!")
 });
});
