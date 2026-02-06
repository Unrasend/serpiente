import { useState, useRef, useEffect } from 'react';
import { GRID_LENGTH, TICK_RATE_MS, INITIAL_SNAKE, GRID_SIZE } from '../constants/Config';
import { GameState, Direction } from '../models/Types';
import { Node } from '../models/Node';
import { Snake } from '../models/Snake';
import { generateTillDifferent } from '../utils/Random';
import { updateSnake } from '../utils/GameLogic';
import { Board } from './Board';

const getInitialSnake = (): Snake => {
  const head = new Node(INITIAL_SNAKE[0]);
  let current = head;
  for (let i = 1; i < INITIAL_SNAKE.length; i++) {
    const newNode = new Node(INITIAL_SNAKE[i]);
    current.next = newNode;
    current = newNode;
  }
  return new Snake(head);
};

export const SnakeGame = () => {
  const [snakeCells, setSnakeCells] = useState<Set<number>>(new Set(INITIAL_SNAKE));
  const [_, setSnake] = useState<Snake>(getInitialSnake());
  const [food, setFood] = useState<number>(generateTillDifferent(0, GRID_LENGTH - 1, new Set(INITIAL_SNAKE)));
  const [score, setScore] = useState(0);
  const [status, setStatus] = useState<GameState>(GameState.IDLE);
  
  const directionRef = useRef<Direction>(Direction.DOWN);
  
  useEffect(() => {
    if (status !== GameState.RUNNING) return;
    
    const handleInput = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowDown':
          if (directionRef.current === Direction.UP) break;
          directionRef.current = Direction.DOWN;
          break;
        case 'ArrowUp':
          if (directionRef.current === Direction.DOWN) break;
          directionRef.current = Direction.UP;
          break;
        case 'ArrowLeft':
          if (directionRef.current === Direction.RIGHT) break;
          directionRef.current = Direction.LEFT;
          break;
        case 'ArrowRight':
          if (directionRef.current === Direction.LEFT) break;
          directionRef.current = Direction.RIGHT;
          break;
        default:
          return;
      }
    };
    
    const runGameLoop = () => {
      setSnake(currentSnake => {
        const [newSnake, cells, lastCell] = updateSnake(currentSnake, directionRef.current);

        const newPosition = newSnake.head.value;
        const currentPosition = currentSnake.head.value;

        if (newPosition > GRID_LENGTH || newPosition < 0) {
          setStatus(GameState.GAME_OVER);
          return currentSnake;
        }

        if (currentPosition < newPosition ? new Array(GRID_SIZE).fill(0).some((_, i) => newPosition === (i + 1) * GRID_SIZE) : new Array(GRID_SIZE).fill(0).some((_, i) => currentPosition === i * GRID_SIZE)) {
          setStatus(GameState.GAME_OVER);
          return currentSnake;
        }

        if (newSnake.head.value === food) {
          setScore(s => s + 1);
          newSnake.increase(lastCell);
          cells.add(lastCell);
          setFood(generateTillDifferent(0, GRID_LENGTH - 1, cells));
        }
          
        setSnakeCells(cells);
        
        return newSnake;
      });
    };
    
    window.addEventListener('keydown', handleInput);
    const timerId = window.setInterval(runGameLoop, TICK_RATE_MS);
    
    return () => {
      window.removeEventListener('keydown', handleInput);
      window.clearInterval(timerId);
    };
  }, [status, food]);
  
  const handleStart = () => {
    setStatus(GameState.RUNNING);
    setScore(0);
    setSnake(getInitialSnake());
    setSnakeCells(new Set(INITIAL_SNAKE));
    directionRef.current = Direction.DOWN;
  };
  
  return (
    <div className="app-container flex flex-col items-center justify-center p-xl font-mono">
      <div className="score-board mb-5 text-2xl text-f-1">
        Score: {score}
      </div>
      
      <Board snakeCells={snakeCells} food={food} />
      
      {status !== GameState.RUNNING && (
        <button
          onClick={handleStart}
          className="start-button mt-5 px-5 py-2.5 text-lg cursor-pointer bg-f-1 border-none rounded-md text-bg-1 transition-colors hover:bg-f-2"
        >
          {status === GameState.GAME_OVER ? 'Try Again' : 'Start Game'}
        </button>
      )}
    </div>
  );
};
