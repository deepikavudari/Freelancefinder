// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getDatabase, ref, set, push } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";

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
const database = getDatabase(app);
const userInfoDB = ref(database, "userInfo")

const userInfo = (uid, name, email) => {
    const userRef = ref(database, "userInfo/" + uid); // Generate a unique key
    set(userRef, {
      name: name,
      email: email,
     });
  };

const submit = document.getElementById("submit");
submit.addEventListener("click", function (event) {
  event.preventDefault();

const name = document.getElementById("name").value;
const email = document.getElementById("email").value;
const password = document.getElementById("password").value;



 if(!email||!password){
  alert("Enter email or password!");
return;
 }

createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    
    // ...
    userInfo(user.uid, name, email);
    alert("Account Created!")
    window.location.href="user.html"
  })

  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });
});



