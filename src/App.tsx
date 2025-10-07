import { useEffect, useState } from 'react';
import './App.css';

function App() {

  const [isRunning, setRunning] = useState(false);
  const [isWork, setIsWork] = useState(false);

  const [timer, setTimer] = useState(0);

  const [workDurationInput, setWorkDurationInput] = useState(25);
  const [workDuration, setWorkDuration] = useState(2);

  const [breakDuration, setBreakDuration] = useState(300);

  const [timeLeft, setTimeLeft] = useState(workDuration);



  const runningHandler = () => {
    setRunning(!isRunning);
  }

  useEffect(() => {
    const interval = setInterval(() => {

      if(isRunning === true){
        setTimeLeft(prev => prev - 1);
    }
      }, 1000);

      return () => clearInterval(interval);

    }, [isRunning, timeLeft, isWork]);
    


  useEffect(() => {

    if(timeLeft === 0){
      if(isWork){
        setIsWork(false);
        setTimeLeft(breakDuration);
      } else {
        setIsWork(true);
        setTimeLeft(workDuration)
      }
    }

  }, [timeLeft]);


    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;


  return (
    <>
    <div className='container'>
      <div className="timer-div">

        <input type="number" />
        <input type="number" />

        <button>Save</button>

        {/* <span>{isWork ? 'Work time' : 'Break time'}</span> */}

        <span className='timerNumber'>{minutes < 10 ? '0'+minutes : minutes}:{seconds < 10 ? '0'+seconds : seconds}</span>
        <button onClick={runningHandler}>{isRunning ? 'Pause' : 'Play'}</button>
      </div>
    </div>
    </>
  )
}


export default App;




