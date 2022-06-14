import { Figure, FigureNames } from "./Figure";

import whiteLogo from '../../assets/pawnWhite.svg';
import blackLogo from '../../assets/pawnBlack.svg';
import { Colors } from "../Board";
import { Cell } from "../Cell";

export class Pawn extends Figure {
    constructor(color: Colors, cell: Cell) {
        super (FigureNames.PAWN, color, cell, color === Colors.WHITE ? whiteLogo : blackLogo)
    }

    canMove(target: Cell, kingCheck: boolean = true): boolean {
        if (super.canMove(target, kingCheck)) {

            let dy = this.cell.y > target.y ? -1 : 1;
            const absY = Math.abs(target.y - this.cell.y);
            const absX = Math.abs(target.x - this.cell.x);

            let moveLength = 1; 
            if (
                (this.color === Colors.WHITE && this.cell.y === 6) ||
                (this.color === Colors.BLACK && this.cell.y === 1)
            ) {
                moveLength = 2;
            }

            if ( absY > moveLength ) {
                return false;
            }

            if ((this.color === Colors.WHITE && dy !== -1) || (this.color === Colors.BLACK && dy !== 1)) {
                return false;
            }

            if (
                (absX !== 0 && !(absX === 1 && absX + absY === 2 && target.figure)) || 
                (absX === 0 && target.figure) 
            ) {
                return false
            }

            return true;
        } 
        return false;
    }
}