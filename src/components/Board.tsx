import React from 'react';
import classNames from 'classnames';
import { BOARD, CELL_SIZE_PX, GRID_SIZE } from '../constants/Config';
import './Board.scss'; 

interface BoardProps {
  snakeCells: Set<number>;
  food: number;
}

export const Board: React.FC<BoardProps> = ({ snakeCells, food }) => {
  return (
    <div
      className="game-board"
      style={{
        gridTemplateColumns: `repeat(${GRID_SIZE}, ${CELL_SIZE_PX}px)`,
        gridTemplateRows: `repeat(${GRID_SIZE}, ${CELL_SIZE_PX}px)`,
      }}
    >
      {BOARD.map((element, index) => {
        const cellClassName = classNames('cell', {
          'snake-cell': snakeCells.has(element),
          'food-cell': element === food,
        });
        
        return (
          <div
            key={`cell-${index}`}
            className={cellClassName}
          />
        );
      })}
    </div>
  );
};
