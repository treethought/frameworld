export default function Loading() {
  return (
    <main className="bg-base-100 w-full max-w-screen skeleton">
      <div className="flex flex-col items-center w-full h-full max-w-screen overflow-hidden">
        {Array.from(
          { length: 1 },
          (_, i) => (
            <div key={i} className="flex sm:h-screen md:h-1/3 sm:w-1/2 p-2">
            </div>
          ),
        )}
      </div>
    </main>
  );
}
