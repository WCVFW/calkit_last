import React from "react";

export default function PageLoader({ show = false }) {
  if (!show) return null;
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-white/60 backdrop-blur-sm">
      <div
        className="h-10 w-10 rounded-full border-4 border-[#003366]/20 border-t-[#003366] animate-spin"
        aria-label="Loading"
      />
    </div>
  );
}
