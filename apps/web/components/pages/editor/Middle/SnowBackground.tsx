"use client";

import { ReactNode, useEffect } from "react";

const SnowBackground = ({ onClick, children }: { children?: ReactNode; onClick?: () => void }) => {
  // 动态创建雪花元素（避免手动写大量 DOM）
  useEffect(() => {
    const createSnow = () => {
      const snowContainer = document.querySelector(".snow-container");
      if (!snowContainer) return;

      // 生成 50 片雪花
      for (let i = 0; i < 100; i++) {
        const snow = document.createElement("div");
        snow.className = "snow";

        // 为每个雪花生成随机水平位移方向
        const randomX = (Math.random() - 0.5) * 60; // [-30vw, 30vw]
        snow.style.setProperty("--translate-x", `${randomX}vw`); // 存储为 CSS 变量

        // 随机初始位置和动画参数
        snow.style.left = `${Math.random() * 100}%`;
        snow.style.animationDelay = `${Math.random() * 5}s`;
        snow.style.animationDuration = `${5 + Math.random() * 10}s`;
        snow.style.opacity = `${0.5 + Math.random() * 0.5}`;

        snowContainer.appendChild(snow);
      }
    };

    createSnow();
  }, []);

  return (
    <div
      onClick={onClick}
      // className="relative w-3/5 bg-gradient-to-b from-[#ffe5e5] to-[#ffcccc] overflow-hidden"
      className="relative w-3/5 bg-gradient-to-b from-red-50 to-red-100 overflow-hidden"
      // className="relative w-3/5 bg-gradient-to-b from-[#ffb3ba] to-[#ffdfba] overflow-hidden"
    >
      {/* 雪花容器 */}
      <div className="snow-container absolute inset-0" />

      {/* 页面内容 */}
      <div className="relative flex justify-center items-center flex-col">{children}</div>

      {/* CSS 样式 */}
      <style
        jsx
        global
      >{`
        .snow {
          position: absolute;
          width: 8px;
          height: 8px;
          background: white;
          // background: red;
          border-radius: 50%;
          filter: blur(1px);
          animation: fall linear infinite;
          will-change: transform;
        }

        @keyframes fall {
          0% {
            transform: translateY(-100vh) rotate(0deg);
          }
          100% {
            transform: translateY(100vh) translateX(var(--translate-x, 0));
          }
        }
      `}</style>
    </div>
  );
};

export default SnowBackground;
