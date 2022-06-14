import { Figure, FigureNames } from "./Figure";

import whiteLogo from '../../assets/bishopWhite.svg';
import blackLogo from '../../assets/bishopBlack.svg';
import { Colors } from "../Board";
import { Cell } from "../Cell";

export class Bishop extends Figure {
    constructor(color: Colors, cell: Cell) {
        super (FigureNames.BISHOP, color, cell, color === Colors.WHITE ? whiteLogo : blackLogo)
    }

    canMove(target: Cell, kingCheck: boolean = true): boolean {
        if (super.canMove(target, kingCheck) && (
                this.cell.isDiagonalReachable(target))
            ) {
            return true;
        } 
        return false;
    }
}