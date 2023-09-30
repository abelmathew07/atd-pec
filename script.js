import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDQ76hufnC9yNGUb-kVe4TyptWWkSFVD2I",
  authDomain: "atd-pec.firebaseapp.com",
  projectId: "atd-pec",
  storageBucket: "atd-pec.appspot.com",
  messagingSenderId: "1008699110235",
  appId: "1:1008699110235:web:e83857d4a799717b33607e",
  measurementId: "G-5L8RF0868K",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const attendanceListRef = collection(db, "attendanceList");

const nameInput = document.getElementById("name");
const rollInput = document.getElementById("roll");
const semesterInput = document.getElementById("semester");
const attendanceSelect = document.getElementById("attendance");
const addButton = document.getElementById("add-button");
const attendanceList = document.getElementById("attendance-list");

addButton.addEventListener("click", async function () {
  const name = nameInput.value;
  const roll = rollInput.value;
  const semester = semesterInput.value;
  const attendance = attendanceSelect.value;

  try {
    await addDoc(attendanceListRef, {
      name,
      roll,
      semester,
      attendance,
    });
  } catch (error) {
    console.error("Error adding document: ", error);
  }

  clearInputFields();
});

onSnapshot(attendanceListRef, (snapshot) => {
  clearAttendanceList();

  if (!snapshot.empty) {
    snapshot.forEach((doc) => {
      appendAttendanceEntryToUI(doc.id, doc.data());
    });
  } else {
    attendanceList.innerHTML = "No attendance records available.";
  }
});

function clearAttendanceList() {
  attendanceList.innerHTML = "";
}

function clearInputFields() {
  nameInput.value = "";
  rollInput.value = "";
  semesterInput.value = "";
  attendanceSelect.value = "absent";
}

function appendAttendanceEntryToUI(docId, entry) {
  const listItem = document.createElement("li");
  listItem.textContent = `Name: ${entry.name}, Roll: ${entry.roll}, Semester: ${entry.semester}, Attendance: ${entry.attendance}`;

  listItem.addEventListener("click", async () => {
    try {
      await deleteDoc(doc(attendanceListRef, docId));
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  });

  attendanceList.appendChild(listItem);
}
