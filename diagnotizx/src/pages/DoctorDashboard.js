import React, { useEffect, useState } from "react";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import "./DoctorDashboard.css";

const DoctorDashboard = () => {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "medicalInfo"));
      const patientList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPatients(patientList);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching patient records:", error);
    }
  };

  const fetchPatientDetails = async (patientId) => {
    try {
      const patientDoc = await getDoc(doc(db, "medicalInfo", patientId));
      if (patientDoc.exists()) {
        setSelectedPatient({ id: patientId, ...patientDoc.data() });
      } else {
        console.error("Patient record not found!");
      }
    } catch (error) {
      console.error("Error fetching patient details:", error);
    }
  };

  const startConsultation = (patientId) => {
    navigate(`/video-call/${patientId}`); // Navigate to Video Call page
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Doctor Dashboard</h2>
      </div>

      {loading ? (
        <p className="loading-text">Loading patient records...</p>
      ) : (
        <table className="patient-table">
          <thead>
            <tr>
              <th>Patient ID</th>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <tr key={patient.id}>
                <td>{patient.id}</td>
                <td>{patient.name || "N/A"}</td>
                <td>
                  <button onClick={() => fetchPatientDetails(patient.id)}>View Details</button>
                  <button onClick={() => startConsultation(patient.id)}>Consult Patient</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {selectedPatient && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Patient Details</h3>
            <p><strong>Name:</strong> {selectedPatient.name || "N/A"}</p>
            <p><strong>Symptoms:</strong> {JSON.stringify(selectedPatient.symptoms) || "N/A"}</p>
            <p><strong>Vitals:</strong> {JSON.stringify(selectedPatient.vitals) || "N/A"}</p>
            <button className="close-btn" onClick={() => setSelectedPatient(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorDashboard;
