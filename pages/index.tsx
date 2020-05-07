import {useRef, useEffect, useState} from "react";
import styles from './div.module.css'

const Canvas = () => {

  const canvasRef = useRef(null);
  const [drawing,setDrawing] = useState<boolean>(false);

  const getContext = (): CanvasRenderingContext2D => {
    const canvas: any = canvasRef.current;
    return canvas.getContext('2d');
  }

  const getRect = () => {
    const canvas: any = canvasRef.current;
    return canvas.getBoundingClientRect();
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
    <div className={styles.div}>
      <h1>Canvas</h1>
      <canvas
      ref={canvasRef}
      width="500px"
      height="500px"
      onTouchStart={e => startDrawing(e.changedTouches[0].pageX - getRect().left, e.changedTouches[0].pageY - getRect().top)}
      onTouchEnd={() => setDrawing(false)}
      onTouchMove={e => draw(e.changedTouches[0].pageX - getRect().left, e.changedTouches[0].pageY - getRect().top)}
      onMouseDown={e => startDrawing(e.nativeEvent.offsetX, e.nativeEvent.offsetY)}
      onMouseUp={() => setDrawing(false)}
      onMouseLeave={() => setDrawing(false)}
      onMouseMove={e => draw(e.nativeEvent.offsetX, e.nativeEvent.offsetY)}
    />
  </div>
  )
};

export default Canvas;