export default function Audio({ payload }) {
  if (!payload?.src) throw new Error("Audio block requires src");

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-4 sm:p-6 w-full max-w-lg mx-auto space-y-3">
      {payload.title && (
        <div className="text-gray-900 dark:text-gray-100 font-semibold text-lg sm:text-xl truncate">
          {payload.title}
        </div>
      )}
      <audio
        controls
        src={payload.src}
        className="w-full h-12 sm:h-14 rounded-md bg-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}
