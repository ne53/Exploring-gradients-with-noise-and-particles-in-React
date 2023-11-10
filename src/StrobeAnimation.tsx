import React, { useEffect, useRef, useCallback } from 'react';
import p5 from 'p5';
import './App.css';

const StrobeAnimation = () => {
  // ウィンドウの幅と高さを取得
  const w = window.innerWidth;
  const h = window.innerHeight;

  // キャンバス要素への参照を作成
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // キャンバスを更新する関数
  const updateCanvas = useCallback((canvas: HTMLCanvasElement) => {
    new p5((p) => {
      // Preload関数（一度だけ呼び出されます）
      p.preload = () => {
        p.createCanvas(w, h); // 指定した幅と高さでキャンバスを作成
      };

      // Setup関数（一度だけ呼び出されます）
      p.setup = () => {
        p.clear(); // キャンバスをクリア
        // キャンバスの2D描画コンテキストを取得してイメージデータを描画
        const ctx = canvas.getContext('2d');
        if (ctx) {
          // ストロボアニメーション
          let isWhite = true;
          setInterval(() => {
            if (isWhite) {
              ctx.fillStyle = p.color(0, 0, 0); // 黒い色
            } else {
              ctx.fillStyle = p.color(255, 255, 255); // 白い色
            }
            ctx.fillRect(0, 0, w, h); // 四角形を描画
            isWhite = !isWhite;
          }, 500); // 500ミリ秒ごとに四角形を描画
        }
      };

      // Draw関数（連続的に呼び出されます）
      p.draw = () => {
        // 必要に応じて描画ロジックを追加できます
      };
    }, canvas);
  }, [w, h]);

  // キャンバスの更新を管理するためのuseEffect
  useEffect(() => {
    if (canvasRef.current) {
      // 参照を使用してキャンバスを更新する関数
      const updateCanvasWithRef = () => {
        if (canvasRef.current) {
          canvasRef.current.getContext('2d')?.clearRect(0, 0, w, h); // キャンバスをクリア
          updateCanvas(canvasRef.current); // updateCanvas関数を呼び出す
        }
      };

      // 初期のキャンバス更新
      updateCanvasWithRef();

      // キャンバスを連続的に更新するためのインターバルを設定
      const intervalId = setInterval(updateCanvasWithRef, 1000 / 8); // 8フレーム毎に更新

      // コンポーネントがアンマウントされたときにインターバルをクリア
      return () => {
        clearInterval(intervalId);
      };
    }
  }, [updateCanvas, w, h]);

  // キャンバス要素をレンダリング
  return (
    <canvas id="canvas" ref={canvasRef} width={w} height={h} className='StrobeAnimation' />
  );
};

export default StrobeAnimation;
