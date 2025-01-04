
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-analytics.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getDatabase, ref, set, push, get } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";

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

  const urlParams = new URLSearchParams(window.location.search);
const jobId = urlParams.get("id");
 console.log(jobId);
  

        document.querySelector("#submit").addEventListener("click",(event)=>{
            event.preventDefault();
        const fullName = document.querySelector("#name").value;
        const application = document.querySelector("#application").value;
        const budget = document.querySelector("#budget").value;
        const deadline = document.querySelector("#deadline").value;const email = document.querySelector("#email").value;
        saveApplication(jobId, fullName, application, budget, deadline, email);
        
        alert("Your application has been submitted successfully!");
         });

    
const saveApplication = (jobId, fullName, application, budget, deadline, email)=>{
    const jobRef = ref(database, 'postJob');
get(jobRef).then((snapshot) =>{
    if(snapshot.exists()){
        const jobs = snapshot.val();
        let jobCreatorUid = null;

        for(const uid in jobs){
            if(jobs[uid][jobId]){
                jobCreatorUid = uid;
                console.log(jobCreatorUid);
                break;
            }
        }
        if (jobCreatorUid){
            const applyJobDB = ref(database, `postJob/${jobCreatorUid}/${jobId}/applicants`)
            const newInfo = push(applyJobDB);
            set(newInfo, {
                fullName: fullName,
                Application: application,
                Budget: budget,
                Deadline: deadline,
                Email: email,
            })
        }
        
    }
    
})
}