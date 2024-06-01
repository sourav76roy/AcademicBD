import React from "react";

export default function SectionTitle({ title, description }) {
  return (
    <div className="text-center mb-6">
      <h2 className="text-3xl font-bold capitalize">{title}</h2>
      <p className="text-gray-500 mt-3">{description}</p>
    </div>
  );
}
