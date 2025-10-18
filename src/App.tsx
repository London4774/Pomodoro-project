import { useEffect, useState, useRef } from 'react';
import './App.css';

function App() {

  const [isRunning, setRunning] = useState(false);
  const [isWork, setIsWork] = useState(false);

  const [workDurationInput, setWorkDurationInput] = useState(25);
  const [workDuration, setWorkDuration] = useState(25 * 60);

  const [breakDuration, setBreakDuration] = useState(300);
  const [breakDurationInput, setBreakDurationInput] = useState(5);

  const [timeLeft, setTimeLeft] = useState(workDuration);


    const inputRef = useRef();

    const focusInput = () => {
      inputRef.current.focus();
    }
  
  const durationHandler = () => {

    if(isRunning){
      alert("Не играйте с кнопкой!!");
      return;
    }

    setWorkDuration(workDurationInput * 60);
    setBreakDuration(breakDurationInput * 60);
    setTimeLeft(workDurationInput * 60);
    setIsWork(true);

  }



  const runningHandler = () => {
    if(timeLeft === 0){
      alert("Добавьте время!");
      return;
    }

    setRunning(!isRunning);
  }

  const resetHandler = () => {
    setTimeLeft(workDuration);
    setRunning(false);
    setIsWork(true);
  }


  useEffect(() => {

    if (!isRunning) return;
    
    const interval = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);

      return () => clearInterval(interval);
    }, [isRunning]);
    


  useEffect(() => {

    if(timeLeft < 0){
      alert("Напиши корректное время!!");
      setTimeLeft(0);
      return;
    }

    if(timeLeft === 0 && isRunning){
      if(isWork){
        setIsWork(false);
        setTimeLeft(breakDuration);
      } else {
        setIsWork(true);
        setTimeLeft(workDuration);
      }
    }

  }, [timeLeft, isRunning, isWork, workDuration, breakDuration]);


    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;




  return (
    <>

    <header className='header'>
      <div className="container">
        <div className="header-content">
          <nav>

            <div className="header-logo">
              <a href="#">PomodoroTimer</a>
            </div>

            <a href="#">Statistics</a>
            <a href="#">About</a>
          </nav>
        </div>
      </div>
    </header>

    <div className='content-container'>
      <div className="timer-div">

        <input ref={inputRef} type="number" placeholder='Your work time' onChange={(e) => setWorkDurationInput(e.target.value)}/>
        <input type="number" placeholder='Your break time' onChange={(e) => setBreakDurationInput(e.target.value)}/>

        <button onClick={durationHandler}>Save</button>
        <button onClick={focusInput}>Check focusing</button>
        <button onClick={resetHandler}>Reset</button>

        <span>{isWork ? 'Work time' : 'Break time'}</span>

        <span className='timerNumber'>{minutes < 10 ? '0'+minutes : minutes}:{seconds < 10 ? '0'+seconds : seconds}</span>
        <button onClick={runningHandler}>{isRunning ? 'Pause' : 'Play'}</button>

      </div>
    </div>
    </>
  )
}

export default App;




