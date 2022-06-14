import { Figure, FigureNames } from "./Figure";

import whiteLogo from '../../assets/kingWhite.svg';
import blackLogo from '../../assets/kingBlack.svg';
import { Colors } from "../Board";
import { Cell } from "../Cell";

export class King extends Figure {
    constructor(color: Colors, cell: Cell) {
        super (FigureNames.KING, color, cell, color === Colors.WHITE ? whiteLogo : blackLogo)
    }

    canMove(target: Cell, kingCheck: boolean = true): boolean {
        if (super.canMove(target, kingCheck)) {
            const startX = this.cell.x;
            const startY = this.cell.y;
    
            const finishX = target.x;
            const finishY = target.y;

            const dx = Math.abs(finishX - startX);
            const dy = Math.abs(finishY - startY);
            if ( dx <= 1 && dy <= 1 ){
                return true;
            }
        } 
        return false;
    }
}