"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="p-6 font-sans">
      <h1 className="text-lg font-bold">頁面發生錯誤</h1>
      {error?.digest && (
        <p className="mt-2 text-sm">
          Digest: <code className="px-1 py-0.5 bg-slate-100 rounded">{error.digest}</code>
        </p>
      )}
      <button
        onClick={() => reset()}
        className="mt-4 rounded px-3 py-2 bg-slate-800 text-white"
      >
        重新嘗試
      </button>
    </div>
  );
}
