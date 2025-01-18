
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

  const urlParams = new URLSearchParams(window.location.search);
  const jobId = urlParams.get("id");
// console.log(jobId)

  //initialize firebase
   const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const auth = getAuth(app);
  const database = getDatabase(app); 
  
  onAuthStateChanged(auth,(user)=>{
    if(user){
       const uid = user.uid;
        fetchApplicantData(uid);
    }
  })

  const fetchApplicantData = (uid)=>{
    const jobRef = ref(database, `postJob/${uid}/${jobId}/applicants` )
    get(jobRef).then((snapshot)=>{
        if(snapshot.exists()){
            const applicants = snapshot.val();
            if(applicants){
                displayApplicants(applicants);
            }
                else{
                    document.querySelector("#applicant-info").innerHTML = "<h2>No applicants for this job!</h2>";
                }
            
        }
        else{
            document.querySelector("#applicant-info").innerHTML = "<h2 style='text-align : center'>No applicants for this job!</h2>";
        }
    })
  }

  const displayApplicants = (applicants) => {
    console.log(applicants);
    const container = document.querySelector("#applicant-info");  
    for (const applicantID in applicants) {
        const applicant = applicants[applicantID];
        const applicantInfo = document.createElement("div");
        applicantInfo.innerHTML = `<div>
            <p><strong>Full Name:</strong> ${applicant.fullName}</p>
            <p><strong>Application:</strong> ${applicant.Application}</p>
            <p><strong>Budget:</strong> ${applicant.Budget}</p>
            <p><strong>Deadline:</strong> ${applicant.Deadline}</p>
            <p><strong>Email:</strong> ${applicant.Email}</p>
            </div>
        `;
        container.appendChild(applicantInfo);
}}