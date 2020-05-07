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

  const startTouchDrawing = (e:React.TouchEvent<HTMLCanvasElement>) => {
    setDrawing(true);
    const ctx = getContext();
    const rect = this.getBoundingClientRect()
    const x = e.changedTouches[0].clientX - (rect.left + window.pageXOffset);
    const y = e.changedTouches[0].clientY - (rect.top + window.pageYOffset);
    ctx.moveTo(x, y);
  }

  const startDrawing = (x:number, y:number) => {
    setDrawing(true);
    const ctx = getContext();
    ctx.moveTo(x, y);
  }

  const mouseDraw = (x:number, y:number) => {
    if (!drawing) {
      return;
    }
    const ctx = getContext();
    ctx.lineTo(x, y);
    ctx.stroke();
  }

  const touchDraw = (e:React.TouchEvent<HTMLCanvasElement>) => {
    if (!drawing) {
      return;
    }
    const ctx = getContext();
    const rect = this.getBoundingClientRect()
    const x = e.changedTouches[0].clientX - (rect.left + window.pageXOffset);
    const y = e.changedTouches[0].clientY - (rect.top + window.pageYOffset);
    ctx.lineTo(x, y);
    ctx.stroke();
  }

  useEffect(() => {
    initCanvas();
  },[])

  return (
    <div style={{ touchAction: 'none' }}>
      <h1>Canvas</h1>
      <canvas
      ref={canvasRef}
      width="500px"
      height="500px"
      onTouchStart={e => startTouchDrawing(e)}
      onTouchEnd={() => setDrawing(false)}
      onTouchMove={e => touchDraw(e)}
      onMouseDown={e => startDrawing(e.nativeEvent.offsetX, e.nativeEvent.offsetY)}
      onMouseUp={() => setDrawing(false)}
      onMouseLeave={() => setDrawing(false)}
      onMouseMove={e => mouseDraw(e.nativeEvent.offsetX, e.nativeEvent.offsetY)}
    />
  </div>
  )
};

export default Canvas;