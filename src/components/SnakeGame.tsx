import { useState, useRef, useEffect } from 'react';
import { GRID_LENGTH, TICK_RATE_MS, INITIAL_SNAKE, GRID_SIZE } from '../constants/Config';
import { GameState, Direction } from '../models/Types';
import { Node as SnakeNode } from '../models/Node';
import { Snake } from '../models/Snake';
import { generateTillDifferent } from '../utils/Random';
import { calcNewPosition } from '../utils/GameLogic';
import { Board } from './Board';

const getInitialSnake = (): Snake => {
  const head = new SnakeNode(INITIAL_SNAKE[0]);
  let current = head;
  for (let i = 1; i < INITIAL_SNAKE.length; i++) {
    const newNode = new SnakeNode(INITIAL_SNAKE[i]);
    current.next = newNode;
    current = newNode;
  }
  return new Snake(head, new Set(INITIAL_SNAKE));
};

const getDirectionFromKey = (key: string): Direction | null => {
  switch (key) {
    case 'ArrowDown': return Direction.DOWN;
    case 'ArrowUp': return Direction.UP;
    case 'ArrowLeft': return Direction.LEFT;
    case 'ArrowRight': return Direction.RIGHT;
    default: return null;
  }
};

const isOppositeDirection = (dir1: Direction, dir2: Direction) => {
  if (dir1 === Direction.UP && dir2 === Direction.DOWN) {
    return true;
  }
  if (dir1 === Direction.DOWN && dir2 === Direction.UP) {
    return true;
  }
  if (dir1 === Direction.LEFT && dir2 === Direction.RIGHT) {
    return true;
  }
  if (dir1 === Direction.RIGHT && dir2 === Direction.LEFT) {
    return true;
  }
  return false;
};

export const SnakeGame = () => {
  const [snake, setSnake] = useState<Snake>(getInitialSnake());
  const [food, setFood] = useState<number>(generateTillDifferent(0, GRID_LENGTH - 1, new Set(INITIAL_SNAKE)));
  const [score, setScore] = useState(0);
  const [status, setStatus] = useState<GameState>(GameState.IDLE);
  const currentDirection = useRef<Direction>(Direction.DOWN);
  const directionRef = useRef<Direction>(Direction.DOWN);
  
  useEffect(() => {
    if (status !== GameState.RUNNING) return;
    
    const handleInput = (e: KeyboardEvent) => {
      const newDirection = getDirectionFromKey(e.key);
      if (!newDirection) {
        return;
      }

      if (!isOppositeDirection(newDirection, currentDirection.current) && newDirection !== currentDirection.current) {
        directionRef.current = newDirection;
      }
    };
    
    const runGameLoop = () => {
      setSnake(currentSnake => {
        const currentPosition = currentSnake.head.value;
        const isFood = calcNewPosition(currentPosition, directionRef.current) === food; 
        const newSnake = currentSnake.move(directionRef.current, isFood);
        const nextHeadPos = newSnake.head.value;
        
        if (nextHeadPos > GRID_LENGTH || nextHeadPos < 0) {
          setStatus(GameState.GAME_OVER);
          return currentSnake;
        }

        if (currentPosition < nextHeadPos 
            ? new Array(GRID_SIZE).fill(0).some((_, i) => nextHeadPos === (i + 1) * GRID_SIZE) 
            : new Array(GRID_SIZE).fill(0).some((_, i) => currentPosition === i * GRID_SIZE)
        ) {
          setStatus(GameState.GAME_OVER);
          return currentSnake;
        }

        if (currentSnake.cells.has(newSnake.head.value)) {
           setStatus(GameState.GAME_OVER);
           return currentSnake;
        }

        if (isFood) {
          setScore(s => s + 1);
          setFood(generateTillDifferent(0, GRID_LENGTH - 1, newSnake.cells));
        }

        currentDirection.current = directionRef.current;
          
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
    currentDirection.current = Direction.DOWN;
    directionRef.current = Direction.DOWN;
  };
  
  return (
    <div className="app-container flex flex-col items-center justify-center p-xl font-mono">
      <div className="score-board mb-5 text-2xl text-f-1">
        Score: {score}
      </div>
      
      <Board snakeCells={snake.cells} food={food} />

      <br/>

      <span className='text'>Use arrow keys to move the snake</span>
      
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
