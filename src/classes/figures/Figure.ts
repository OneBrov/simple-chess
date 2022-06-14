import { Colors } from "../Board";
import { Cell } from "../Cell";

import rookBlack from "../../assets/rookBlack.svg";

export enum FigureNames {
    KING,
    PAWN,
    QUEEN,
    BISHOP,
    KNIGHT,
    ROOK
}

export class Figure {
    readonly name: FigureNames;
    readonly color: Colors;
    readonly logo: typeof rookBlack;
    cell: Cell;


    constructor(name: FigureNames, color: Colors, cell: Cell, logo?: typeof rookBlack) {
        this.name = name;
        this.color = color;
        this.cell = cell;
        this.logo = logo;
    }

    isKing(target: Cell) {
        if (target.figure?.name === FigureNames.KING) {
            return true;
        }
        return false;
    }

    isKingUnderCheck(kingColor: Colors) {
        const kingCell = this.cell.board.getKingCell(kingColor);
        for (let row of this.cell.board.cells) {
            for (let cell of row) {
                if (this.isSameColor(cell)) continue;
                if (cell.figure?.canMove(kingCell, false)) {
                    return true;
                }
            }
        }
        return false;
    }

    isSameColor(target: Cell) {
        if (target.figure?.color === this.cell.figure?.color) {
            return true;
        }
        return false;
    }

    isCheckMate(myColor: Colors) {
        const enemyColor = (myColor === Colors.WHITE ? Colors.BLACK : Colors.WHITE);
        this.cell.board.toggleColor()
        for (let row of this.cell.board.cells) {
            for (let cell of row) {
                if (!cell.figure || cell.figure.color !== enemyColor) continue; //skip alias figures
                
                for (let pRow of this.cell.board.cells) {
                    for (let pCell of pRow) {
                        if (cell.figure?.canMove(pCell)) {
                            this.cell.board.toggleColor()
                            return false;
                        }
                    }
                }
            }
        }
        this.cell.board.toggleColor()
        return true;
    }
    
    canMove(target: Cell, kingCheck: boolean = true) {
        if (kingCheck && this.color !== this.cell.board.currentColor) {
            return false;
        }
        
        if (this.isSameColor(target)) {
            return false;
        }

        if (kingCheck && this.isKing(target)) {
            return false
        }
      
        if  (kingCheck) {
            let kingUnderCheck;

            const oldCell   = this.cell
            const oldFigure = target.figure;
            target.figure = this;
            this.cell.figure = null;
            this.cell = target;
          
            kingUnderCheck = this.isKingUnderCheck(this.color);
            
            this.cell = oldCell;
            oldCell.figure = this;

            target.figure = oldFigure;
            if (oldFigure) {
                oldFigure.cell = target;
            }
            if (kingUnderCheck) {
                return false;
            }
        }

        return true;
    }

    moveTo(target: Cell) {
        if (this.canMove(target)) {
            if (target.figure) {
                this.cell.board.deadFigures.push(target.figure);
            }
            this.cell.moveFigure(target, this);
            if (this.isCheckMate(this.color)) {
                this.cell.board.gameStatus = this.color === Colors.WHITE ? 'white wins' : 'black wins';
            }
            this.cell.board.nextTurn();
        } else {
            console.log('impossible');
        }
    }
}