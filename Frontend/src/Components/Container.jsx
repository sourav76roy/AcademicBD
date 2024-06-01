import React from "react";

export default function Container({
  children,
  className = "",
  sectionStyle = "",
  id = "",
}) {
  return (
    <section id={id ? id : ""} className={` ${sectionStyle}`}>
      <div className={`container mx-auto py-20 ${className ? className : ""}`}>
        {children}
      </div>
    </section>
  );
}
