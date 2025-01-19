import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-analytics.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";

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
const database = getDatabase(app);
const auth = getAuth(app);
const submitBtn = document.querySelector("#submit");
submitBtn.disabled = true;
onAuthStateChanged(auth, (user)=>{
    if(user){
        submitBtn.disabled = false;
        const uid = user.uid;
    document.querySelector("#PostJob").addEventListener("submit", async function (event)  {
        event.preventDefault();
        
            const JobTitle = document.querySelector("#JobTitle").value;
            const skills = document.querySelector("#skills").value;
            const description = document.querySelector("#description").value;
            const budget = document.querySelector("#budget").value;
            const deadline = document.querySelector("#deadline").value;
        
            if (JobTitle && skills && description && budget && deadline) {
                let assurance = await saveData(uid, JobTitle, skills, description, budget, deadline);
                if(assurance){
                    alert("Job posted successfully!");
                    location.href = "user.html";
                }
            } else {
                alert("Fill all the fields!");
            }
        });
    } else{
        alert("Login to post job!");
    }
})



const saveData = async (uid, JobTitle, skills, description, budget, deadline) => {
    const postJobDB = ref(database, `postJob/${uid}`);
    const jobRef = push(postJobDB);
    await set(jobRef, {
        JobTitle: JobTitle,
        Skills: skills,
        Description: description,
        Budget: budget,
        Deadline: deadline,
    });
    return true;
    
};


