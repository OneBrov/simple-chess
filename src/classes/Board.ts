import { Cell } from "./Cell";
import { Bishop } from "./figures/Bishop";
import { Figure, FigureNames } from "./figures/Figure";
import { King } from "./figures/King";
import { Knight } from "./figures/Knight";
import { Pawn } from "./figures/Pawn";
import { Queen } from "./figures/Queen";
import { Rook } from "./figures/Rook";
import { Player } from "./Player";

export enum Colors {
    WHITE,
    BLACK
}

export class Board {
    cells: Cell[][];
    turn: number = 0;
    deadFigures: Figure[] = [];
    currentColor: Colors = Colors.WHITE;
    gameStatus: 'normal' | 'black wins' | 'white wins' = 'normal';

    constructor(cells?: Cell[][]){
        if (cells) {
            this.cells = cells;
        } else {
            this.cells = [];
            this.createCells();
        }
    }

    nextTurn(){
        console.log(this.currentColor)
        this.toggleColor();
        this.turn ++;
        
    }

    createCells() {
        const cells = [];
        
        for (let i = 0; i < 8; i++) {
            const row = []
            for (let j = 0; j < 8; j++) {
                const isBlack =  (i + j) % 2; 
                if (isBlack) {
                    row.push(new Cell(j, i, Colors.BLACK, this));
                } else {
                    row.push(new Cell (j, i, Colors.WHITE, this));
                }
                
            }
            cells.push(row);
        }
      
        this.cells = cells;
    }

    getCopyBoard(): Board {
        const newBoard = new Board();
        newBoard.cells = this.cells;
        newBoard.deadFigures = this.deadFigures;
        newBoard.turn = this.turn;
        newBoard.currentColor = this.currentColor;
        return newBoard;
    }

    getKingCell(color: Colors): Cell {
        let kingCell =  this.cells[0][0];
        this.cells.forEach(row => 
            row.forEach(cell => {
                if (cell.figure?.name === FigureNames.KING && color === cell.figure.color) {
                    kingCell = cell;
                }
            })    
        )
        return kingCell;
    }

    toggleColor() {
        if (this.currentColor === Colors.WHITE) {
            this.currentColor = Colors.BLACK;
        } else {
            this.currentColor = Colors.WHITE;
        }
    }



    getCell(x: number, y: number) {
        return this.cells[y][x];
    }

    addQueens() {
        this.cells[0][3].figure = new Queen(Colors.BLACK, this.cells[0][3]);

        this.cells[7][3].figure = new Queen(Colors.WHITE, this.cells[7][3]);
    }

    addKings() {
        this.cells[0][4].figure = new King(Colors.BLACK, this.cells[0][4]);

        this.cells[7][4].figure = new King(Colors.WHITE, this.cells[7][4]);
    }

    addBishops() {
        this.cells[0][2].figure = new Bishop(Colors.BLACK, this.cells[0][2]);
        this.cells[0][5].figure = new Bishop(Colors.BLACK, this.cells[0][5]);

        this.cells[7][2].figure = new Bishop(Colors.WHITE, this.cells[7][2]);
        this.cells[7][5].figure = new Bishop(Colors.WHITE, this.cells[7][5]);
    }

    addKnights() {
        this.cells[0][1].figure = new Knight(Colors.BLACK, this.cells[0][1]);
        this.cells[0][6].figure = new Knight(Colors.BLACK, this.cells[0][6]);

        this.cells[7][1].figure = new Knight(Colors.WHITE, this.cells[7][1]);
        this.cells[7][6].figure = new Knight(Colors.WHITE, this.cells[7][6]);
    }

    addPawns() {
        for (let i = 0; i < 8; i++) {
            this.cells[1][i].figure = new Pawn(Colors.BLACK, this.cells[1][i]);
            this.cells[6][i].figure = new Pawn(Colors.WHITE, this.cells[6][i]);
        }
    }

    addRooks() {
        this.cells[0][0].figure = new Rook(Colors.BLACK, this.cells[0][0]);
        this.cells[0][7].figure = new Rook(Colors.BLACK, this.cells[0][7]);

        this.cells[7][0].figure = new Rook(Colors.WHITE, this.cells[7][0]);
        this.cells[7][7].figure = new Rook(Colors.WHITE, this.cells[7][7]);

    }

    restart() {
        this.createCells();
        this.addPawns();
        this.addRooks();
        this.addKnights();
        this.addKings();
        this.addBishops();
        this.addQueens();
        this.turn = 0;
        this.currentColor = Colors.WHITE;
        this.deadFigures = [];
    }
}