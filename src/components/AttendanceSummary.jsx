import * as XLSX from "xlsx";

function AttendanceSummary({
  students,
  attendance,
  onChangeAttendance,
  onBack
}) {

  const today = new Date().toISOString().split("T")[0];

  const presentCount = students.filter(
    student =>
      attendance[student.rollNo]?.firstLecture === "P" ||
      attendance[student.rollNo]?.afterLunch === "P"
  ).length;

  const absentCount = students.filter(
    student =>
      attendance[student.rollNo]?.firstLecture === "A" ||
      attendance[student.rollNo]?.afterLunch === "A"
  ).length;


  const exportToExcel = () => {

    const data = students.map((student, index) => ({
      "Date": today,
      "No.": index + 1,
      "Roll Number": student.rollNo,
      "Name": student.name,
      "First Lecture":
        attendance[student.rollNo]?.firstLecture || "",
      "After Lunch":
        attendance[student.rollNo]?.afterLunch || ""
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Attendance"
    );

    XLSX.writeFile(
      workbook,
      `Attendance-${today}.xlsx`
    );
  };


  return (
    <div className="summary-page">

      <h1>Attendance Completed</h1>


      {/* BACK BUTTON */}

      <button
        onClick={onBack}
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


      {/* EXPORT */}

      <button
        className="export-button"
        onClick={exportToExcel}
      >
        EXPORT TO EXCEL
      </button>


      {/* STATISTICS */}

      <div className="summary-stats">

        <div>
          <span>Total</span>
          <strong>{students.length}</strong>
        </div>

        <div>
          <span>Present</span>
          <strong>{presentCount}</strong>
        </div>

        <div>
          <span>Absent</span>
          <strong>{absentCount}</strong>
        </div>

      </div>


      <h2>Edit Attendance</h2>


      <div className="attendance-table">

        {/* HEADER */}

        <div className="table-header">

          <span>No.</span>

          <span>Roll Number</span>

          <span>Name</span>

          <span>First Lecture</span>

          <span>After Lunch</span>

          <span>First Edit</span>

          <span>After Lunch Edit</span>

        </div>


        {/* STUDENTS */}

        {students.map((student, index) => (

          <div
            className="table-row"
            key={student.rollNo}
          >

            <span>
              {index + 1}
            </span>


            <span>
              {student.rollNo}
            </span>


            <span>
              {student.name}
            </span>


            {/* FIRST LECTURE STATUS */}

            <span
              className={
                attendance[student.rollNo]?.firstLecture === "P"
                  ? "status-present"
                  : attendance[student.rollNo]?.firstLecture === "A"
                    ? "status-absent"
                    : ""
              }
            >
              {attendance[student.rollNo]?.firstLecture || "-"}
            </span>


            {/* AFTER LUNCH STATUS */}

            <span
              className={
                attendance[student.rollNo]?.afterLunch === "P"
                  ? "status-present"
                  : attendance[student.rollNo]?.afterLunch === "A"
                    ? "status-absent"
                    : ""
              }
            >
              {attendance[student.rollNo]?.afterLunch || "-"}
            </span>


            {/* FIRST LECTURE EDIT */}

            <span className="edit-buttons">

              <button
                className="small-present"
                onClick={() =>
                  onChangeAttendance(
                    student.rollNo,
                    "P",
                    "First Lecture"
                  )
                }
              >
                P
              </button>

              <button
                className="small-absent"
                onClick={() =>
                  onChangeAttendance(
                    student.rollNo,
                    "A",
                    "First Lecture"
                  )
                }
              >
                A
              </button>

            </span>


            {/* AFTER LUNCH EDIT */}

            <span className="edit-buttons">

              <button
                className="small-present"
                onClick={() =>
                  onChangeAttendance(
                    student.rollNo,
                    "P",
                    "After Lunch"
                  )
                }
              >
                P
              </button>

              <button
                className="small-absent"
                onClick={() =>
                  onChangeAttendance(
                    student.rollNo,
                    "A",
                    "After Lunch"
                  )
                }
              >
                A
              </button>

            </span>

          </div>

        ))}

      </div>

    </div>
  );
}

export default AttendanceSummary;