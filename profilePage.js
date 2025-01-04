import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-analytics.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getDatabase, ref, query, orderByChild, equalTo, get } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";


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

  //initialize firebase
  const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const database = getDatabase(app);
  

onAuthStateChanged(auth, (user)=>{
    if(user){
        const uid = user.uid;
        console.log(uid); //remove later
        fetchUserName(uid);
        getPostedJobs(uid);
    }

})

function fetchUserName(uid) {
    const userRef = ref(database, 'userInfo/' + uid);
    
    get(userRef).then((snapshot)=>{
        if(snapshot.exists()){
            const userData = snapshot.val();
            const userName = userData.name;
            document.querySelector("#welcome").innerText=`Welcome, ` + userName;
        }
        else{
            console.error("User data not found.")
        }
    }) .catch((error)=>{
        console.error("Error fetching data:", error);
    });
}

function getPostedJobs(uid){
    const jobInfo = ref(database, `postJob/${uid}`);
    get(jobInfo).then((snapshot)=>{
        if(snapshot.exists()){
            const data = snapshot.val();
            
            let output = "";
            for(const key in data){
                const job = data[key];
                output += document.querySelector(".jobs").innerHTML= `
                <div class="job-card"><div> <strong>JobTitle : </strong> ${job.JobTitle}</div>
                   <div><strong> Skills :</strong> ${job.Skills}</div>
                   <div> <strong> Description : </strong>${job.Description}</div>
                   <div> <strong> Budget : </strong> ${job.Budget}</div>
                   <div><strong> Deadline : </strong> ${job.Deadline}</div>
                    <a href='applicants.html?id=${key}'><button class="btn"> See applicants </button>
                   </div></a>
                   `
            }
            document.querySelector(".jobs").innerHTML= output;
        }
        else{
            const text = document.querySelector(".jobs");
            text.innerHTML = "<h3> No jobs posted yet!</h3>"
        }
        
    });
}

function getAppliedjobs(uid){
    const appliedJob = ref(database, "applyJob");

}