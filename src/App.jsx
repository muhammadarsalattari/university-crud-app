import { useState, useEffect } from "react";

function App() {
  // Load students from localStorage
  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem("students");
    return saved ? JSON.parse(saved) : [];
  });

  const [newStudent, setNewStudent] = useState({
    name: "",
    regNo: "",
    email: "",
    semester: "",
    degree: "",
    faculty: "",
    department: "",
    batch: "",
  });

  const [editing, setEditing] = useState(null);
  const [notification, setNotification] = useState("");

  // Persist in localStorage
  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(students));
  }, [students]);

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(""), 2000);
  };

  const addStudent = (e) => {
    e.preventDefault();

    // Validation: all fields required
    if (
      !newStudent.name ||
      !newStudent.regNo ||
      !newStudent.email ||
      !newStudent.semester ||
      !newStudent.degree ||
      !newStudent.faculty ||
      !newStudent.department ||
      !newStudent.batch
    )
      return;

    if (editing) {
      setStudents(
        students.map((s) => (s.id === editing.id ? { ...s, ...newStudent } : s))
      );
      setEditing(null);
      showNotification("Student updated successfully!");
    } else {
      setStudents([...students, { id: Date.now(), ...newStudent }]);
      showNotification("Student added successfully!");
    }

    setNewStudent({
      name: "",
      regNo: "",
      email: "",
      semester: "",
      degree: "",
      faculty: "",
      department: "",
      batch: "",
    });
  };

  const editStudent = (student) => {
    setEditing(student);
    setNewStudent({ ...student });
  };

  const deleteStudent = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this student?"
    );
    if (confirmed) {
      setStudents(students.filter((s) => s.id !== id));
      showNotification("Student deleted successfully!");
    }
  };

  return (
    <div className="container">
      <h1>University Management System</h1>

      {/* Notification */}
      {notification && <div className="notification">{notification}</div>}

      {/* Student Form */}
      <form onSubmit={addStudent}>
        <input
          type="text"
          placeholder="Name"
          value={newStudent.name}
          onChange={(e) =>
            setNewStudent({ ...newStudent, name: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Registration Number"
          value={newStudent.regNo}
          onChange={(e) =>
            setNewStudent({ ...newStudent, regNo: e.target.value })
          }
        />
        <input
          type="email"
          placeholder="Email"
          value={newStudent.email}
          onChange={(e) =>
            setNewStudent({ ...newStudent, email: e.target.value })
          }
        />

        {/* Semester Dropdown */}
        <select
          value={newStudent.semester}
          onChange={(e) =>
            setNewStudent({ ...newStudent, semester: e.target.value })
          }
        >
          <option value="">Select Semester</option>
          {[...Array(8)].map((_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Degree"
          value={newStudent.degree}
          onChange={(e) =>
            setNewStudent({ ...newStudent, degree: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Faculty"
          value={newStudent.faculty}
          onChange={(e) =>
            setNewStudent({ ...newStudent, faculty: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Department"
          value={newStudent.department}
          onChange={(e) =>
            setNewStudent({ ...newStudent, department: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Batch"
          value={newStudent.batch}
          onChange={(e) =>
            setNewStudent({ ...newStudent, batch: e.target.value })
          }
        />

        <div style={{ display: "flex", gap: "8px" }}>
          <button type="submit" className="add">
            {editing ? "Update" : "Add"}
          </button>
          {editing && (
            <button
              type="button"
              className="cancel"
              onClick={() => {
                setEditing(null);
                setNewStudent({
                  name: "",
                  regNo: "",
                  email: "",
                  semester: "",
                  degree: "",
                  faculty: "",
                  department: "",
                  batch: "",
                });
              }}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Empty state */}
      {students.length === 0 && (
        <p className="empty">No students found. Add some!</p>
      )}

      {/* Student List */}
      <ul>
        {students.map((s) => (
          <li
            key={s.id}
            className={editing && editing.id === s.id ? "editing" : ""}
          >
            <div>
              <strong>{s.name}</strong> ({s.regNo})<br />
              Email: {s.email} | Semester: {s.semester} | Degree: {s.degree}<br />
              Faculty: {s.faculty} | Department: {s.department} | Batch: {s.batch}
            </div>
            <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
              <button className="edit" onClick={() => editStudent(s)}>
                Edit
              </button>
              <button className="delete" onClick={() => deleteStudent(s.id)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
