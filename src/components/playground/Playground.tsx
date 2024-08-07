import { useEffect, useRef, useState } from 'react'
import './Playground.scss'
import minionImage from '../../img/minion.png'

const Playground = () => {

  const [xPos, setXPos] = useState(0);
  const [yPos, setYPos] = useState(0);

  const [timeStamp, setTimestamp] = useState(0);

  const [buttons, setButtons] = useState({
    ArrowRight: false,
    ArrowLeft: false,
    ArrowDown: false,
    ArrowUp: false,
  });

  const requestRef = useRef<any>();

  const animate = () => {

    buttons.ArrowRight && setXPos(prev => prev < 635 ? prev + 10 : prev);
    buttons.ArrowLeft && setXPos(prev => prev > 0 ? prev - 10 : prev);
    buttons.ArrowDown && setYPos(prev => prev < 500 ? prev + 10 : prev);
    buttons.ArrowUp && setYPos(prev => prev > 0 ? prev - 10 : prev);

    requestRef.current = requestAnimationFrame(animate);
  }

  useEffect(() => {
    document.addEventListener('keydown', (ev) => {
      setButtons(prev => ({ ...prev, [ev.key]: true }))
    });
    document.addEventListener('keyup', (ev) => {
      setButtons(prev => ({ ...prev, [ev.key]: false }))
    });
  }, []);

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [buttons])

  return (
    <div className='playground'>
      <div className="minion"
        style={{
          left: `${xPos}px`,
          top: `${yPos}px`,
        }}>
        <img src={minionImage} alt="minion img" />
      </div>

    </div>
  )
}

export default Playground