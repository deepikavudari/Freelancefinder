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

const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database();

const dataRef = database.ref("postJob");

dataRef.once("value")
    .then((snapshot) => {
        if (snapshot.exists()) {
            const data = snapshot.val();
            const container = document.querySelector("#dataContainer");
            let output = "";
            
            for (const uid in data) {
                const jobs = data[uid];
                for (const jobID in jobs){
                    const job = jobs[jobID];
                output += `
            <div class="job-card" onclick="window.location.href='jobDetails.html?${jobID}'">
                                <div class="job-title">${job.JobTitle}</div>
                                <div class="job-details">
                                    <p><strong>Budget:</strong> ${job.Budget}</p>
                                    <p><strong>Deadline : </strong> ${job.Deadline}</p>
                                </div>
                                <div class="job-actions">
                                    <a href="jobDetails.html?id=${jobID}" class="btn">View Details</a>
                                </div>
                            </div>
                `
                }
            }

            container.innerHTML = output;
        }

    })

    .catch((error) => {
        console.error("Error fetching data:", error);
    })