import { useEffect, useState } from "react";
import Header from "./components/Header";
import Calendar from "./components/Calendar";
import AppointmentForm from "./components/AppointmentForm";
import AppointmentList from "./components/AppointmentList";

function App() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load from Local Storage
  useEffect(() => {
    const saved = localStorage.getItem("appointments");

    if (saved) {
      setAppointments(JSON.parse(saved));
    }
  }, []);

  // Save to Local Storage
  useEffect(() => {
    localStorage.setItem(
      "appointments",
      JSON.stringify(appointments)
    );
  }, [appointments]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <main className="max-w-7xl mx-auto p-8 grid lg:grid-cols-2 gap-8">
        <div className="space-y-8">
          <Calendar
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />

          <AppointmentList
            appointments={appointments}
            setAppointments={setAppointments}
            setLoading={setLoading}
          />
        </div>

        <AppointmentForm
          selectedDate={selectedDate}
          appointments={appointments}
          setAppointments={setAppointments}
          loading={loading}
          setLoading={setLoading}
        />
      </main>
    </div>
  );
}

export default App;