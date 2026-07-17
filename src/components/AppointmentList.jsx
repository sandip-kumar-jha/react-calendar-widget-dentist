function AppointmentList({
  appointments,
  setAppointments,
  setLoading,
}) {
  const deleteAppointment = (id) => {
    setLoading(true);

    setTimeout(() => {
      setAppointments((prevAppointments) =>
        prevAppointments.filter(
          (appointment) => appointment.id !== id
        )
      );

      console.log(
        "[Analytics] User interacted with React Calendar Widget"
      );

      setLoading(false);
    }, 1000);
  };

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-2xl font-bold mb-6">
        Appointments
      </h2>

      {appointments.length === 0 ? (
        <div className="text-center py-10">
          <h3 className="text-xl font-semibold text-gray-700">
            No data found
          </h3>

          <p className="text-gray-500 mt-2">
            Add your first appointment.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {appointments.map((appointment) => (
            <div
              key={appointment.id}
              className="border rounded-xl shadow-sm p-5 hover:shadow-md transition"
            >
              <h3 className="text-lg font-bold text-gray-800">
                {appointment.patient}
              </h3>

              <p className="text-gray-600 mt-2">
                📅 {appointment.date}
              </p>

              <p className="text-gray-600">
                🕒 {appointment.time}
              </p>

              <p className="text-gray-500 mt-2">
                {appointment.notes || "No Notes"}
              </p>

              <button
                aria-label="Delete Appointment"
                onClick={() => deleteAppointment(appointment.id)}
                className="mt-4 bg-black text-white px-5 py-2 rounded-lg hover:bg-gray-800 transition"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AppointmentList;