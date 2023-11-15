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
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sketch = (p: p5) => {
      // 設定オブジェクト
      const config = {
        count: 30,                  // パーティクルの数
        minSize: 0.3,               // パーティクルの最小サイズ
        maxSize: 0.5,               // パーティクルの最大サイズ
        minSpeed: 0.005,            // パーティクルの最小速度
        maxSpeed: 0.01,            // パーティクルの最大速度
        // bgColor: "#000000",         // 背景色
        // particleColors: ["#FFFFFF", "#000000"],  // パーティクルの色
        particleColors: ["#F25EA3","#471ED9", "#3B42D9", "#1B8EF2","#F26241"],  // パーティクルの色
        horizontalScale: 2,         // 横方向のスケール
        verticalScale: 1,           // 縦方向のスケール
      };

      let particles: Particle[] = [];

      // パーティクルを追加する関数
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

      // 画面外に出たパーティクルを削除する関数
      const removeOutOfCanvasParticles = () => {
        particles = particles.filter((particle) => particle.pos.x * p.width - particle.size >= 0);
      };

      // パーティクルの位置を更新する関数
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

      // パーティクルを描画する関数
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

      // 初期化
      p.setup = () => {
        const canvas = p.createCanvas(p.windowWidth, p.windowHeight);
        canvas.parent(canvasRef.current!);
        p.frameRate(8);
      };

      // 描画
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

      // ウィンドウのリサイズ
      p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
      };
    };

    // p5 インスタンスの生成
    new p5(sketch);
  }, []);

  // パーティクルキャンバスの表示
  return <div ref={canvasRef} className="ParticleCanvas"></div>;
};

export default ParticleCanvas;
