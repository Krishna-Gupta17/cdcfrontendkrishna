import { useEffect, useRef } from "react";

export default function MatrixRain() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const setCanvasSize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    setCanvasSize();

    const codeChars = [
      "if", "else", "for", "let", "var", "=>", "()", "[]", "{}", "0", "1",
      "+", "-", "=", ";", "::", "fn", "log", "const", "return"
    ];

    const columnWidth = 20;
    let columns = Math.floor(canvas.width / columnWidth);
    let drops = Array(columns).fill(1);

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 64, 0.08)"; // subtle dark blue background fade
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#00bfff"; // bright neon blue
      ctx.font = "16px monospace";
      ctx.textAlign = "center";

      for (let i = 0; i < drops.length; i++) {
        const text = codeChars[Math.floor(Math.random() * codeChars.length)];
        const x = i * columnWidth + columnWidth / 2;
        const y = drops[i] * 20;

        ctx.fillText(text, x, y);

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i]++;
      }
    };

    const interval = setInterval(draw, 50);

    // Resize canvas if parent box resizes
    const handleResize = () => {
      setCanvasSize();
      columns = Math.floor(canvas.width / columnWidth);
      drops = Array(columns).fill(1);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full z-0 opacity-10 pointer-events-none rounded-3xl"
    />
  );
}

