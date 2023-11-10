import React, { useRef, useEffect } from "react";
import p5 from "p5";
import "./App.css";

const StrobeAnimation: React.FC = () => {
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sketch = (p: p5) => {
      const canvasWidth = p.windowWidth;
      const canvasHeight = p.windowHeight;

      const updateCanvas = () => {
        const ctx  = p.drawingContext as CanvasRenderingContext2D;
        let White = true;
        setInterval(() => {
          if (White) {
              ctx.fillStyle = "#FFFFFF"; // 白
            } else {
              ctx.fillStyle = "#000000"; // 黒
            }
            ctx.fillRect(0, 0, canvasWidth, canvasHeight);
            White = !White;
        }
        , 125);
      }
          p.setup = () => {
            const canvas = p.createCanvas(canvasWidth, canvasHeight);
            canvas.parent(canvasRef.current!);
            updateCanvas();
          };
    
          // 描画
          p.draw = () => {
            setInterval(() => {
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
      return <div ref={canvasRef} className="StrobeAnimation"></div>;
    };
    
    export default StrobeAnimation;