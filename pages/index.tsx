import {useRef, useEffect, useState} from "react";
import styles from './Canvas.module.css'

const Canvas = () => {

  const canvasRef = useRef(null);
  const [drawing,setDrawing] = useState<boolean>(false);
  const [imageData, setImageData] = useState<ImageData[]>([]);

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
    ctx.clearRect(0, 0, 600, 600)
    ctx.beginPath();
    ctx.fillStyle = "#A0A0A0A0"; 
    ctx.fillRect(0, 0, 600, 600)
  }

  const startDrawing = (x:number, y:number) => {
    setDrawing(true);
    const ctx = getContext();
    const image = ctx.getImageData(0, 0, 600, 600);
    setImageData(imageData.concat(image))
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

  const stopDraw = () => {
    setDrawing(false)
  }

  const undo = () => {
    const ctx = getContext();
    const prevImageData = imageData[imageData.length - 1]
    if(!prevImageData){
      return;
    }
    ctx.putImageData(prevImageData, 0, 0)
    setImageData(imageData.slice(0, imageData.length - 1))
    ctx.beginPath();
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
      onTouchEnd={stopDraw}
      onTouchMove={e => draw(e.changedTouches[0].pageX - getRect().left, e.changedTouches[0].pageY - getRect().top)}
      onMouseDown={e => startDrawing(e.nativeEvent.offsetX, e.nativeEvent.offsetY)}
      onMouseUp={stopDraw}
      onMouseLeave={stopDraw}
      onMouseMove={e => draw(e.nativeEvent.offsetX, e.nativeEvent.offsetY)}
    />
    <button onClick={undo}>Undo</button>
    {/* <button>Redo</button> */}
    <button onClick={initCanvas}>Clear</button>
  </div>
  )
};

export default Canvas;