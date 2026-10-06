function StudentCard({
  student,
  currentNumber,
  totalStudents,
  onPresent,
  onAbsent
}) {
  return (
    <div className="student-card">

      <div className="student-number">
        Student {currentNumber} / {totalStudents}
      </div>

      <div className="roll-number">
        Roll No: {student.rollNo}
      </div>

      <div className="student-name">
        {student.name}
      </div>

      <div className="attendance-buttons">

        <button
          className="present-button"
          onClick={onPresent}
        >
          PRESENT
        </button>

        <button
          className="absent-button"
          onClick={onAbsent}
        >
          ABSENT
        </button>

      </div>

      <div className="keyboard-help">
        Press <b>P</b> for Present &nbsp; | &nbsp;
        Press <b>A</b> for Absent
      </div>

    </div>
  );
}

export default StudentCard;