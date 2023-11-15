import React, { useRef, useEffect } from "react";
import p5 from "p5";
import "./../App.css";

type Particle = {
  pos: {
    x: number;
    y: number;
  };
  size: number;
  speed: number;
  isFill: boolean;
  color: string;
  opacity: number;
};

const ParticleCanvas: React.FC = () => {
  // Reference to the canvas container
  const canvasRef = useRef<HTMLDivElement>(null);
  // Reference to the current p5 instance
  const p5InstanceRef = useRef<p5 | null>(null);

  useEffect(() => {
    // p5 sketch function
    const sketch = (p: p5) => {
      // Configuration settings
      const config = {
        count: 30,
        minSize: 0.3,
        maxSize: 0.5,
        minSpeed: 0.005,
        maxSpeed: 0.01,
        particleColors: ["#F25EA3", "#471ED9", "#3B42D9", "#1B8EF2", "#F26241"],
        horizontalScale: 2,
        verticalScale: 1,
      };

      let particles: Particle[] = [];

      // Function to add a new particle
      const addParticle = () => {
        const zDist = p.random() ** 3;
        const randomColor = p.random(config.particleColors);

        particles.push({
          pos: { x: 1, y: p.random() },
          size: p.map(zDist, 0, 1, config.minSize, config.maxSize),
          speed: p.map(zDist, 0, 1, config.minSpeed, config.maxSpeed),
          isFill: true,
          color: randomColor,
          opacity: 1000,
        });
      };

      // Function to remove particles outside the canvas
      const removeOutOfCanvasParticles = () => {
        particles = particles.filter((particle) => particle.pos.x * p.width - particle.size >= 0);
      };

      // Function to update particle positions
      const updateParticlePositions = () => {
        particles.forEach((particle) => {
          particle.pos.x -= particle.speed;
          const x = particle.pos.x * p.width;
          const centerX = p.width / 2;
          const dist = p.abs(x - centerX);
          const angle = p.map(dist, 0, p.width / 2, 0, p.PI);
          const opacityFactor = 1 - p.cos(angle) * 2;
          particle.opacity = p.map(opacityFactor, -1, 1, 255, 0);
        });
      };

      // Function to draw particles
      const drawParticles = () => {
        particles.forEach((particle) => {
          const yShift = p.map(particle.pos.y, 0, 1, -0.1, 0.1) * p.height;
          const color = p.color(particle.color);
          color.setAlpha(particle.opacity);
          particle.isFill ? p.fill(color) : p.noFill();
          p.noStroke();
          p.ellipse(
            particle.pos.x * p.width,
            particle.pos.y * p.height + yShift,
            particle.size * p.width * config.horizontalScale,
            particle.size * p.width * config.verticalScale
          );
        });
      };

      // p5 setup function
      p.setup = () => {
        const canvas = p.createCanvas(p.windowWidth, p.windowHeight);
        canvas.parent(canvasRef.current!);
        p.frameRate(8);
      };

      // p5 draw function
      p.draw = () => {
        p.push();
        removeOutOfCanvasParticles();
        while (particles.length < config.count) {
          addParticle();
        }
        updateParticlePositions();
        drawParticles();
        p.pop();
      };

      // p5 windowResized function
      p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
      };
    };

    // Remove previous p5 instance
    if (p5InstanceRef.current) {
      p5InstanceRef.current.remove();
    }

    // Create a new p5 instance
    p5InstanceRef.current = new p5(sketch);

    // Cleanup when the component unmounts
    return () => {
      if (p5InstanceRef.current) {
        p5InstanceRef.current.remove();
      }
    };
  }, []);

  // Render the particle canvas container
  return <div ref={canvasRef} className="ParticleCanvas"></div>;
};

export default ParticleCanvas;
