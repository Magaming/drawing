import {useRef, useEffect, useState} from "react";

const Canvas = () => {

  const canvasRef = useRef(null);
  const [drawing,setDrawing] = useState<boolean>(false);

  const getContext = (): CanvasRenderingContext2D => {
    const canvas: any = canvasRef.current;
    return canvas.getContext('2d');
  }

  const initCanvas = () => {
    const ctx = getContext();
    ctx.fillStyle = "#A0A0A0A0"; //筆に白い絵の具をつけて
    ctx.fillRect(0, 0, 600, 600); //四角を描く
  }

  const startDrawing = (x:number, y:number) => {
    setDrawing(true);
    const ctx = getContext();
    ctx.moveTo(x, y);
  }

  const draw = (x:number, y:number) => {
    if (!drawing) {
      return;
    }
    const ctx = getContext();
    ctx.lineTo(x, y);
    ctx.stroke();
  }

  useEffect(() => {
    initCanvas();
  },[])

  return (
    <>
      <h1>Canvas</h1>
      <canvas
      ref={canvasRef}
      width="500px"
      height="500px"
      onTouchStart={e => startDrawing(e.touches[0].clientX, e.touches[0].clientY)}
      onTouchEnd={() => setDrawing(false)}
      onTouchMove={e => draw(e.touches[0].clientX, e.touches[0].clientY)}
      onMouseDown={e => startDrawing(e.nativeEvent.offsetX, e.nativeEvent.offsetY)}
      onMouseUp={() => setDrawing(false)}
      onMouseLeave={() => setDrawing(false)}
      onMouseMove={e => draw(e.nativeEvent.offsetX, e.nativeEvent.offsetY)}
    />
  </>
  )
};

export default Canvas;