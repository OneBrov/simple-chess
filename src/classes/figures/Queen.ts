import { Figure, FigureNames } from "./Figure";

import whiteLogo from '../../assets/queenWhite.svg';
import blackLogo from '../../assets/queenBlack.svg';
import { Colors } from "../Board";
import { Cell } from "../Cell";

export class Queen extends Figure {
    constructor(color: Colors, cell: Cell) {
        super (FigureNames.QUEEN, color, cell, color === Colors.WHITE ? whiteLogo : blackLogo)
    }

    canMove(target: Cell, kingCheck: boolean = true): boolean {
        if (super.canMove(target, kingCheck) && (
               this.cell.isVerticalReachable(target) || 
               this.cell.isHorizontalReachable(target) ||
               this.cell.isDiagonalReachable(target))
            ) {
            return true;
        } 
        return false;
    }
}