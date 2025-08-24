import "./Body.css";
import React from "react";

interface BodyProps {
  children: React.ReactNode;
}

export default function Body({ children }: BodyProps) {
  return (
    <main className="body-container">
      <div className="container py-4 h-100">{children}</div>
    </main>
  );
}

