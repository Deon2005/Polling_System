const express = require("express");
const admin = require("firebase-admin");
const cors = require("cors");

// Initialize Firebase
admin.initializeApp();
const db = admin.firestore();

const app = express();
app.use(cors());
app.use(express.json());

// 🔐 Predefined Admin Credentials
const ADMIN_CREDENTIALS = {
  username: "admin",
  password: "admin"
};

// 🔑 Admin Login API
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
    res.json({ success: true, message: "Login successful" });
  } else {
    res.status(401).json({ success: false, message: "Invalid credentials" });
  }
});

// 🗳 API to Get All Voters
app.get("/voters", async (req, res) => {
  try {
    const snapshot = await db.collection("voters").get();
    const voters = [];
    snapshot.forEach(doc => voters.push({ id: doc.id, ...doc.data() }));
    res.json(voters);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// ✅ API to Add a Voter
app.post("/voters", async (req, res) => {
  try {
    const voterData = req.body;
    const docRef = await db.collection("voters").add(voterData);
    res.status(201).json({ id: docRef.id, ...voterData });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// 🔍 Get Specific Voter
app.get("/voters/:id", async (req, res) => {
  try {
    const doc = await db.collection("voters").doc(req.params.id).get();
    if (!doc.exists) return res.status(404).send("Voter not found");
    res.json({ id: doc.id, ...doc.data() });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = app;
