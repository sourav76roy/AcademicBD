import confetti from "canvas-confetti";
import { useEffect } from "react";

export default function CongratsEffect() {
  // The useEffect will run every time the component is called congratulation
  useEffect(() => {
    const interval = setInterval(() => {
      // Create confetti every 25 milliseconds
      const colors = ["#EF2964", "#00C09D", "#2D87B0", "#48485E", "#EFFF1D"];
      const confettiSize = Math.floor(Math.random() * 3) + 7;
      const confettiBackground =
        colors[Math.floor(Math.random() * colors.length)];
      const confettiLeft = Math.floor(Math.random() * window.innerWidth);

      confetti({
        particleCount: confettiSize,
        spread: 70,
        origin: { x: confettiLeft / window.innerWidth, y: 0.6 },
        colors: [confettiBackground],
      });
    }, 25);

    //  20s stop setinterval
    setTimeout(() => clearInterval(interval), 20);

    // Clear interval when component unmounts
    return () => clearInterval(interval);
  }, []); // Run effect only once on component mount

  return (
    <div className="absolute inset-0">
      <div className="grid place-items-center h-screen">
        <div className="checkmark-circle">
          <div className="background"></div>
          <div className="checkmark draw"></div>
        </div>
      </div>
    </div>
  );
}
