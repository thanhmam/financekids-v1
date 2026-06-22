import { useState, useRef } from 'react';

export default function AnimatedMascot({ animation = 'wave', size = 120, style = {} }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    // Calculate rotation angles (max 15 degrees)
    const rotateY = (x / (rect.width / 2)) * 18;
    const rotateX = -(y / (rect.height / 2)) * 18;
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  const handleMouseEnter = () => {
    setHovered(true);
  };

  // Determine animation classes
  let animationClass = 'animate-float';
  if (animation === 'wave') {
    animationClass = 'animate-wave';
  } else if (animation === 'joy') {
    animationClass = 'animate-joy';
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        perspective: '600px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        userSelect: 'none',
        ...style
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          transformStyle: 'preserve-3d',
          transform: hovered
            ? `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(1.08)`
            : `rotateX(0deg) rotateY(0deg) scale(1)`,
          transition: hovered ? 'transform 0.08s ease-out' : 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,122,0,0.06) 0%, rgba(255,122,0,0) 70%)'
        }}
      >
        <img
          src="/mascot.png"
          alt="Cáo Cam Mascot"
          className={animationClass}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            filter: hovered ? 'drop-shadow(0 8px 16px rgba(255,122,0,0.15))' : 'drop-shadow(0 4px 8px rgba(0,0,0,0.08))',
            transition: 'filter 0.3s ease'
          }}
        />
      </div>
    </div>
  );
}
