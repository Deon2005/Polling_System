import { initializeApp, getApps } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyBUBRZVkEMunfeGuWI-Szxg4rqXrkE_30g",
    authDomain: "pollingsystem-b083e.firebaseapp.com",
    projectId: "pollingsystem-b083e",
    storageBucket: "pollingsystem-b083e.appspot.com", // Fixed typo in storageBucket
    messagingSenderId: "194732815011",
    appId: "1:194732815011:web:987da02e82f913a7774516"
};

// Initialize Firebase only if no app exists
let app;
if (!getApps().length) {
    app = initializeApp(firebaseConfig);
} else {
    app = getApps()[0];
}

const db = getFirestore(app);

// Function to verify login
async function verifyLogin(userId, password) {
    const userRef = doc(db, "users", userId);  // Fetch document by userId
    try {
        console.log("Fetching data for userId:", userId);
        const userSnap = await getDoc(userRef);
        
        if (userSnap.exists()) {
            console.log("Document found:", userSnap.data());
            if (userSnap.data().password === password) {
                alert("Login successful!"); // Confirmation alert
                window.location.href = "verification.html";  // Redirect if valid
            } else {
                console.log("Incorrect password entered");
                document.getElementById("error-message").textContent = "Invalid User ID or Password!";
                document.getElementById("error-message").style.color = "red";
            }
        } else {
            console.log("No document found for userId:", userId);
            document.getElementById("error-message").textContent = "Invalid User ID or Password!";
            document.getElementById("error-message").style.color = "red";
        }
    } catch (error) {
        console.error("Login error:", error);
        document.getElementById("error-message").textContent = "Error logging in. Please try again later.";
        document.getElementById("error-message").style.color = "red";
    }
}

// Event Listener for Login Form
document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const userId = document.getElementById("loginId").value;
    const password = document.getElementById("password").value;
    verifyLogin(userId, password);
});