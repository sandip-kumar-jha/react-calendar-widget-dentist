import { useState } from "react";

function Calendar({ selectedDate, setSelectedDate }) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const month = currentMonth.getMonth();
  const year = currentMonth.getFullYear();

  const firstDay = new Date(year, month, 1).getDay();

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const prevMonth = () => {
    setCurrentMonth(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(year, month + 1, 1));
  };

  const monthName = currentMonth.toLocaleString("default", {
    month: "long",
  });

  const today = new Date();

  return (
    <div className="bg-white rounded-lg shadow p-6">

      <div className="flex justify-between items-center mb-6">

        <button
          aria-label="Previous Month"
          onClick={prevMonth}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          ←
        </button>

        <h2 className="text-2xl font-bold">
          {monthName} {year}
        </h2>

        <button
          aria-label="Next Month"
          onClick={nextMonth}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          →
        </button>

      </div>

      <div className="grid grid-cols-7 gap-2 text-center font-semibold mb-3">

        <div>Sun</div>
        <div>Mon</div>
        <div>Tue</div>
        <div>Wed</div>
        <div>Thu</div>
        <div>Fri</div>
        <div>Sat</div>

      </div>

      <div className="grid grid-cols-7 gap-2">

        {Array.from({ length: firstDay }).map((_, index) => (
          <div key={index}></div>
        ))}

        {Array.from({ length: daysInMonth }).map((_, index) => {

          const day = index + 1;

          const date = new Date(year, month, day);

          const isToday =
            date.toDateString() === today.toDateString();

          const isSelected =
            date.toDateString() === selectedDate.toDateString();

          return (
            <button
              key={day}
              aria-label={`Select ${day}`}
              tabIndex={0}
              onClick={() => {
                setSelectedDate(date);

                console.log(
                  "[Analytics] User interacted with React Calendar Widget"
                );
              }}
              className={`h-12 rounded border transition

              ${
                isSelected
                  ? "bg-black text-white"
                  : "bg-white"
              }

              ${
                isToday
                  ? "border-2 border-gray-700"
                  : "border-gray-300"
              }

              hover:bg-gray-200`}
            >
              {day}
            </button>
          );
        })}

      </div>

    </div>
  );
}

export default Calendar;