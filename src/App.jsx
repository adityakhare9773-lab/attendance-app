import { useState } from "react";

import Login from "./components/Login";
import students from "./students";
import StudentCard from "./components/StudentCard";
import AttendanceSummary from "./components/AttendanceSummary";

import "./App.css";


function App() {

  const [loggedIn, setLoggedIn] = useState(false);

  const [session, setSession] = useState("");

  const [currentIndex, setCurrentIndex] = useState(0);

  const [attendance, setAttendance] = useState({});


  // =========================
  // LOGIN
  // =========================

  if (!loggedIn) {

    return (
      <Login
        onLogin={() => setLoggedIn(true)}
      />
    );

  }


  // =========================
  // SELECT ATTENDANCE
  // =========================

  if (!session) {

    return (
      <div className="login-page">

        <div className="login-box">

          <h1>Attendance System</h1>

          <h2>Select Attendance</h2>


          <button
            onClick={() => {
              setSession("First Lecture");
              setCurrentIndex(0);
            }}
          >
            FIRST LECTURE
          </button>


          <button
            onClick={() => {
              setSession("After Lunch");
              setCurrentIndex(0);
            }}
          >
            AFTER LUNCH
          </button>


          <br />
          <br />


          {/* BACK TO LOGIN */}

          <button
            onClick={() => {
              setLoggedIn(false);
            }}
          >
            BACK
          </button>

        </div>

      </div>
    );

  }


  // =========================
  // MARK PRESENT
  // =========================

  const markPresent = async () => {

    const student = students[currentIndex];

    await fetch(
      "http://localhost:5000/api/attendance",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          rollNo: student.rollNo,
          name: student.name,
          status: "P",
          session: session
        })
      }
    );


    setAttendance(prev => ({
      ...prev,

      [student.rollNo]: {

        ...prev[student.rollNo],

        firstLecture:
          session === "First Lecture"
            ? "P"
            : prev[student.rollNo]?.firstLecture || "",

        afterLunch:
          session === "After Lunch"
            ? "P"
            : prev[student.rollNo]?.afterLunch || ""

      }
    }));


    setCurrentIndex(prev => prev + 1);

  };


  // =========================
  // MARK ABSENT
  // =========================

  const markAbsent = async () => {

    const student = students[currentIndex];

    await fetch(
      "http://localhost:5000/api/attendance",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          rollNo: student.rollNo,
          name: student.name,
          status: "A",
          session: session
        })
      }
    );


    setAttendance(prev => ({
      ...prev,

      [student.rollNo]: {

        ...prev[student.rollNo],

        firstLecture:
          session === "First Lecture"
            ? "A"
            : prev[student.rollNo]?.firstLecture || "",

        afterLunch:
          session === "After Lunch"
            ? "A"
            : prev[student.rollNo]?.afterLunch || ""

      }
    }));


    setCurrentIndex(prev => prev + 1);

  };


  // =========================
  // EDIT ATTENDANCE
  // =========================

  const changeAttendance = async (
    rollNo,
    status,
    editSession
  ) => {

    await fetch(
      `http://localhost:5000/api/attendance/${rollNo}`,
      {
        method: "PUT",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          status: status,
          session: editSession
        })
      }
    );


    setAttendance(prev => ({
      ...prev,

      [rollNo]: {

        ...prev[rollNo],

        firstLecture:
          editSession === "First Lecture"
            ? status
            : prev[rollNo]?.firstLecture || "",

        afterLunch:
          editSession === "After Lunch"
            ? status
            : prev[rollNo]?.afterLunch || ""

      }
    }));

  };


  // =========================
  // BACK TO SESSION SELECTION
  // =========================

  const goBackToSessionSelection = () => {

    setSession("");

    setCurrentIndex(0);

  };


  // =========================
  // ATTENDANCE COMPLETED
  // =========================

 if (currentIndex >= students.length) {

  return (
    <AttendanceSummary
      students={students}
      attendance={attendance}
      onChangeAttendance={changeAttendance}
      onBack={goBackToSessionSelection}
    />
  );

}


  // =========================
  // ATTENDANCE SCREEN
  // =========================

  const student = students[currentIndex];


  const presentCount = Object.values(attendance).filter(
    student =>
      session === "First Lecture"
        ? student.firstLecture === "P"
        : student.afterLunch === "P"
  ).length;


  const absentCount = Object.values(attendance).filter(
    student =>
      session === "First Lecture"
        ? student.firstLecture === "A"
        : student.afterLunch === "A"
  ).length;


  const remainingCount =
    students.length - currentIndex;


  return (

    <div className="app">

      <h1>Attendance System</h1>


      {/* STATISTICS */}

      <div className="stats">

        <div>
          <span>Session</span>
          <strong>{session}</strong>
        </div>

        <div>
          <span>Current</span>
          <strong>
            {currentIndex + 1} / {students.length}
          </strong>
        </div>

        <div>
          <span>Present</span>
          <strong>{presentCount}</strong>
        </div>

        <div>
          <span>Absent</span>
          <strong>{absentCount}</strong>
        </div>

        <div>
          <span>Remaining</span>
          <strong>{remainingCount}</strong>
        </div>

      </div>


      {/* BACK BUTTON */}

      <button
        onClick={goBackToSessionSelection}
        style={{
          marginBottom: "20px",
          padding: "10px 25px",
          fontSize: "18px",
          fontWeight: "bold",
          cursor: "pointer",
          borderRadius: "8px",
          border: "none"
        }}
      >
        ← BACK
      </button>


      {/* CURRENT STUDENT */}

      <StudentCard
        student={student}
        currentNumber={currentIndex + 1}
        totalStudents={students.length}
        onPresent={markPresent}
        onAbsent={markAbsent}
      />

    </div>

  );
}


export default App;