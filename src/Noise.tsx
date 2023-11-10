import React, { useRef, useEffect } from "react";
import p5 from "p5";
import "./App.css";

const Noise: React.FC = () => {
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sketch = (p: p5) => {
      const updateCanvas = () => {
        const data = new Uint32Array(p.windowHeight * p.windowWidth);
        for (let i = 0; i < data.length; i++) {
          data[i] = p.random(0, 0xFFFFFFFF);
        }
        const img = new ImageData(new Uint8ClampedArray(data.buffer), p.windowWidth, p.windowHeight);
        const ctx = p.drawingContext as CanvasRenderingContext2D;
        ctx.putImageData(img, 0, 0);
      };

      // 初期化
      p.setup = () => {
        const canvas = p.createCanvas(p.windowWidth, p.windowHeight);
        canvas.parent(canvasRef.current!);
        updateCanvas();
      };

      // 描画
      p.draw = () => {
        setTimeout(() => {
          updateCanvas();
        }, 125);
      };

      // ウィンドウのリサイズ
      p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
        updateCanvas();
      };
    };

    // p5 インスタンスの生成
    new p5(sketch);

  }, []);

  // キャンバスの表示
  return <div ref={canvasRef} className="Noise"></div>;
};

export default Noise;
