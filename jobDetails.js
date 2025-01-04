import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-analytics.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getDatabase, ref, get, push, set } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";



const firebaseConfig = {
    apiKey: "AIzaSyDaQcU5C7TOLGkkgEziVVUn8dk8f9pyqKg",
    authDomain: "freelancefinder-e34e6.firebaseapp.com",
    databaseURL: "https://freelancefinder-e34e6-default-rtdb.firebaseio.com",
    projectId: "freelancefinder-e34e6",
    storageBucket: "freelancefinder-e34e6.firebasestorage.appspot.com",
    messagingSenderId: "708300213936",
    appId: "1:708300213936:web:655d39ca28d99c2e003575",
    measurementId: "G-3549SKX3JN"
};

const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const auth = getAuth(app);
  const database = getDatabase(app);
//urlParams holds all the parameters for the different jobs
//id is the name of the childnode
const URLparams = new URLSearchParams(window.location.search);
        const jobId = URLparams.get("id");
        console.log(jobId);
        


if(jobId){
    const jobRef = ref(database, `postJob`);
    get(jobRef).then((snapshot)=>{
        if(snapshot.exists()){
            const data = snapshot.val();
            for (const uid in data){
                const jobs = data[uid];
                for(const jobKey in jobs){
                    if(jobKey === jobId){
                        const userJob = jobs[jobKey];
                        const container = document.querySelector("#jobDetailsContainer");
            container.innerHTML = `
            <h3> ${userJob.JobTitle}</h3>
            <p><strong> Job Description </strong> : ${userJob.Description} </p>
            <p><strong> Skills Required </strong>: ${userJob.Skills}</p>
            <p><strong> Budget </strong> : ${userJob.Budget}</p>
            <p><strong> Deadline </strong> : ${userJob.Deadline} </p>
           <button onclick="location.href='applyJob.html?id=${jobId}'" id="submit">Apply</button>
            `;
                    }
                }
                
            }
    
        } else{
            document.querySelector("#jobDetailsContainer").innerText = "Job not found!";
        }
    })
    .catch((error)=>{
        console.error("Error fetching job details:", error);
    });
}else{
    document.querySelector("#jobDetailsContainer").innerText="No job ID provided!"
}

