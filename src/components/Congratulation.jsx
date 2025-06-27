// Congrats.jsx
import React, { useEffect, useState } from 'react';
import { gsap, Power1 } from 'gsap';

export default function Congrats({onClick}) {
  const [confetti, setConfetti] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newConfetto = {
        id: Date.now(),
        size: Math.floor(Math.random() * 3) + 7,
        color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
        left: Math.floor(Math.random() * window.innerWidth),
        animation: confettiAnimations[Math.floor(Math.random() * confettiAnimations.length)]
      };
      setConfetti(prev => [...prev, newConfetto]);

      setTimeout(() => {
        setConfetti(prev => prev.filter(c => c.id !== newConfetto.id));
      }, 3000);
    }, 25);

    return () => clearInterval(interval);
  }, []);

  const confettiColors = ["#EF2964", "#00C09D", "#2D87B0", "#48485E", "#EFFF1D"];
  const confettiAnimations = ["slow", "medium", "fast"];

  return (
    <div className="relative w-[90vw] h-[90vh] bg-white overflow-hidden">
      {/* Confetti Container */}
      <div className="confetti-container absolute inset-0 pointer-events-none">
        {confetti.map((c) => (
          <div
            key={c.id}
            className={`confetti confetti--animation-${c.animation}`}
            style={{
              backgroundColor: c.color,
              width: c.size,
              height: c.size,
              left: c.left,
              position: 'absolute',
              top: '-10px',
              borderRadius: '0%',
            }}
          ></div>
        ))}
      </div>

      {/* Checkmark Section */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center z-10">
        <div className="checkmark-circle">
          <div className="background"></div>
          <div className="checkmark draw"></div>
        </div>
        <h1 className="text-3xl font-bold mt-4">Congratulations!</h1>
        <p className="mt-2">You are all set. Well done!</p>
        <button
          className="submit-btn mt-4"
          type="button"
          onClick={() => onClick()}
        >
          Replay
        </button>
      </div>
    </div>
  );
}

