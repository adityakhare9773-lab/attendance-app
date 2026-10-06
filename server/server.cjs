const express = require("express");
const Database = require("better-sqlite3");

const app = express();
const db = new Database("attendance.db");


// Create attendance table
db.prepare(`
  CREATE TABLE IF NOT EXISTS attendance (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    rollNo TEXT NOT NULL,
    name TEXT NOT NULL,
    status TEXT NOT NULL,
    date TEXT NOT NULL,
    session TEXT NOT NULL
  )
`).run();


const PORT = 5000;


// CORS
app.use((req, res, next) => {

  res.header("Access-Control-Allow-Origin", "*");

  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );

  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type"
  );

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});


// JSON data
app.use(express.json());


// Test backend
app.get("/", (req, res) => {

  res.send("Attendance Backend is Running");

});


// Save attendance
app.post("/api/attendance", (req, res) => {

  const {
    rollNo,
    name,
    status,
    session
  } = req.body;

  const date =
    new Date().toISOString().split("T")[0];


  db.prepare(`
    INSERT INTO attendance
    (rollNo, name, status, date, session)
    VALUES (?, ?, ?, ?, ?)
  `).run(
    rollNo,
    name,
    status,
    date,
    session
  );


  res.json({
    message: "Attendance saved"
  });

});


// Update attendance
app.put("/api/attendance/:rollNo", (req, res) => {

  const { rollNo } = req.params;

  const {
    status,
    session
  } = req.body;

  const date =
    new Date().toISOString().split("T")[0];


  db.prepare(`
    UPDATE attendance
    SET status = ?
    WHERE rollNo = ?
    AND date = ?
    AND session = ?
  `).run(
    status,
    rollNo,
    date,
    session
  );


  res.json({
    message: "Attendance updated"
  });

});


// Start server
app.listen(PORT, () => {

  console.log(
    `Server running on http://localhost:${PORT}`
  );

});