function Loading() {
  return (
    <div
      className="flex justify-center items-center py-6"
      aria-live="polite"
    >
      <div className="h-8 w-8 rounded-full border-4 border-gray-300 border-t-gray-700 animate-spin"></div>
    </div>
  );
}

export default Loading;