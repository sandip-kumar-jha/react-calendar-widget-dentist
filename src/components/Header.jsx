function Header() {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center">

        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Dentist Calendar Widget
          </h1>

          <p className="text-gray-500 mt-1">
            React Appointment Scheduler
          </p>
        </div>

        <span className="mt-4 md:mt-0 bg-gray-100 px-4 py-2 rounded-full text-gray-700 text-sm">
          React + Vite
        </span>

      </div>
    </header>
  );
}

export default Header;