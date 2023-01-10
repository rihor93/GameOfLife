import React, { useEffect } from "react";
import { boardFunction } from "../hook/boardFunction";
import { CellComponent, Cell, CellStatus } from "./CellComponent";



/**
 * 
 * @returns BoardComponent
 */
export const BoardComponent: React.FC = () => {
    
    let boardData: Cell[] = [];
    /**
     * запускаем первую сборку случайных ячеек, для заполнения массив
     */
    function runItTest() {
        const {board} = boardFunction();
        boardData = board;
    }

    runItTest();

    /*useEffect(() => {
        randomBoard();
    })*/



    //const [broadDraw, setBroad] = React.useState<Cell[]>([]);
    return (
        <div  data-testid="boardcomponent">
            {boardData.map(function (cell, i) {
                return (<CellComponent value={cell} key={cell.id}></CellComponent>);
            })
            }
        </div>)
}