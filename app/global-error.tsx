"use client";

import React, { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global application error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body className="bg-[#1C2A38] text-[#FAF7F2] font-sans min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <div className="max-w-md space-y-6 bg-[#253545] p-8 rounded-2xl border border-white/10 shadow-2xl">
          <div className="w-16 h-16 rounded-2xl bg-[#C86D51]/20 border border-[#C86D51]/40 flex items-center justify-center text-[#C86D51] font-bold text-2xl mx-auto">
            A
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-white">System Error</h1>
            <p className="text-sm text-gray-300">
              A critical exception occurred. Click below to reload the application.
            </p>
            {error.digest && (
              <p className="text-xs font-mono text-gray-400 pt-2">
                Digest: {error.digest}
              </p>
            )}
          </div>
          <button
            onClick={() => reset()}
            className="w-full py-2.5 px-4 rounded-lg bg-[#C86D51] hover:bg-[#b55f45] text-white font-medium transition-colors"
          >
            Reload Page
          </button>
        </div>
      </body>
    </html>
  );
}
