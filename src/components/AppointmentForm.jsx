import { useState } from "react";
import { sanitize } from "../utils/sanitize";
import Loading from "./Loading";

function AppointmentForm({
  selectedDate,
  appointments,
  setAppointments,
  loading,
  setLoading,
}) {
  const [patient, setPatient] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");

  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!patient.trim()) newErrors.patient = true;
    if (!time.trim()) newErrors.time = true;

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    // Prevent duplicate appointment
    const exists = appointments.some(
      (appointment) =>
        appointment.date === selectedDate.toDateString() &&
        appointment.time === time
    );

    if (exists) {
      alert("Appointment already exists for this time.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const appointment = {
        id: Date.now(),
        patient: sanitize(patient),
        date: selectedDate.toDateString(),
        time,
        notes: sanitize(notes),
      };

      // ✅ FIXED: Use functional update
      setAppointments((prevAppointments) => [
        ...prevAppointments,
        appointment,
      ]);

      console.log(
        "[Analytics] User interacted with React Calendar Widget"
      );

      setPatient("");
      setTime("");
      setNotes("");
      setErrors({});

      setLoading(false);
    }, 1000);
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6">
        Book Appointment
      </h2>

      {loading && <Loading />}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            aria-label="Patient Name"
            type="text"
            placeholder="Patient Name"
            value={patient}
            onChange={(e) => setPatient(e.target.value)}
            className={`w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-gray-500 ${
              errors.patient ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.patient && (
            <p className="text-red-500 text-sm mt-1">
              Patient name is required
            </p>
          )}
        </div>

        <div>
          <input
            aria-label="Time"
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className={`w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-gray-500 ${
              errors.time ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.time && (
            <p className="text-red-500 text-sm mt-1">
              Time is required
            </p>
          )}
        </div>

        <textarea
          aria-label="Notes"
          rows="4"
          placeholder="Notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
        />

        <div className="bg-gray-100 p-3 rounded-lg text-gray-700">
          <p className="text-sm">Selected Date</p>
          <p className="font-semibold mt-1">
            {selectedDate.toDateString()}
          </p>
        </div>

        <button
          aria-label="Add Appointment"
          type="submit"
          className="w-full bg-black text-white p-3 rounded-lg hover:bg-gray-800 transition"
        >
          Add Appointment
        </button>
      </form>
    </div>
  );
}

export default AppointmentForm;