import { useEffect, useRef } from "react";

const HeartAnimation = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const starsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const words: HTMLDivElement[] = [];
    const numWords = 120;

    // Parametric heart equation
    const heartX = (t: number, scale: number) => {
      return scale * 16 * Math.pow(Math.sin(t), 3);
    };

    const heartY = (t: number, scale: number) => {
      return -scale * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
    };

    // Create "TE AMO" words along the heart contour
    for (let i = 0; i < numWords; i++) {
      const t = (i / numWords) * 2 * Math.PI;
      const scale = 8;
      
      const x = heartX(t, scale);
      const y = heartY(t, scale);

      const word = document.createElement("div");
      word.className = "love-text absolute whitespace-nowrap select-none";
      word.textContent = "TE AMO";
      word.style.left = "50%";
      word.style.top = "50%";
      word.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
      word.style.fontSize = "14px";
      word.style.fontWeight = "bold";
      
      container.appendChild(word);
      words.push(word);
    }

    // Cleanup
    return () => {
      words.forEach(word => word.remove());
    };
  }, []);

  useEffect(() => {
    if (!particlesRef.current) return;

    const particlesContainer = particlesRef.current;
    const particles: HTMLDivElement[] = [];
    const numParticles = 30;

    // Create floating particles
    const createParticle = () => {
      const particle = document.createElement("div");
      particle.className = "particle";
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.width = "4px";
      particle.style.height = "4px";
      particle.style.borderRadius = "50%";
      particle.style.backgroundColor = "hsl(0 100% 50% / 0.6)";
      particle.style.boxShadow = "0 0 10px hsl(0 100% 50% / 0.8)";
      particle.style.animationDuration = `${5 + Math.random() * 5}s`;
      particle.style.animationDelay = `${Math.random() * 5}s`;
      
      particlesContainer.appendChild(particle);
      particles.push(particle);
    };

    for (let i = 0; i < numParticles; i++) {
      createParticle();
    }

    // Cleanup
    return () => {
      particles.forEach(particle => particle.remove());
    };
  }, []);

  useEffect(() => {
    if (!starsRef.current) return;

    const starsContainer = starsRef.current;
    const stars: HTMLDivElement[] = [];
    const numStars = 100;

    // Create twinkling stars
    for (let i = 0; i < numStars; i++) {
      const star = document.createElement("div");
      star.className = "star";
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      star.style.animationDelay = `${Math.random() * 3}s`;
      star.style.animationDuration = `${2 + Math.random() * 2}s`;
      
      starsContainer.appendChild(star);
      stars.push(star);
    }

    // Cleanup
    return () => {
      stars.forEach(star => star.remove());
    };
  }, []);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center overflow-hidden gap-8">
      {/* Stars background */}
      <div ref={starsRef} className="absolute inset-0 pointer-events-none z-0" />
      
      {/* Particles container */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none z-0" />
      
      {/* Birthday text - top */}
      <div className="relative z-20 text-center px-4">
        <h2 className="birthday-text select-none text-4xl md:text-5xl">
          ¡Feliz Cumpleaños!
        </h2>
      </div>
      
      {/* Heart container */}
      <div 
        ref={containerRef} 
        className="relative w-full h-[60vh] heartbeat-animation flex-shrink-0"
        style={{ 
          filter: "drop-shadow(0 0 30px hsl(0 100% 50% / 0.3))"
        }}
      >
        {/* Center name */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          <h1 className="center-name pulse-glow-animation select-none">
            Antho
          </h1>
        </div>
      </div>

      {/* Birthday text - bottom */}
      <div className="relative z-20 text-center px-4">
        <p className="text-xl md:text-2xl font-semibold" style={{
          color: '#ffd700',
          textShadow: '0 0 10px rgba(255, 215, 0, 0.5), 0 0 20px rgba(255, 215, 0, 0.3)'
        }}>
          Que este día esté lleno de amor y alegría ✨
        </p>
      </div>
    </div>
  );
};

export default HeartAnimation;
