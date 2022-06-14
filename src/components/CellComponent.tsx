import React from 'react'
import { Colors } from '../classes/Board'
import { Figure } from '../classes/figures/Figure';

interface CellComponentProps {
    color: Colors;
    figure: Figure | null;
    isSelected: boolean;
    onclick: ()=>void;
    isCanMove?: boolean;
}

export const CellComponent: React.FC<CellComponentProps> = ({
    color, 
    figure,
    isSelected,  
    onclick,
    isCanMove
}) => {
  return (
    <div 
        className={['cell', color === Colors.WHITE ? 'white' : 'black'].join(' ')}
        onClick={onclick}
    >
      {isSelected && <div className='selected' />}
      {figure && <img src={figure.logo} alt={'' + figure.name}/>}
      {isCanMove && <div className='possibleTarget' />}
    </div>
  )
}
