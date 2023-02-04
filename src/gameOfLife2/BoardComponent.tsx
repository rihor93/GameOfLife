import React, { CSSProperties, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import CellComponent, { Cell, CellStatus } from "./CellComponent";

import { getServerData, getServerDataCells } from "../gameOfLifeClasses/server";


type TimerTypes = 'slow' | 'normal' | 'fast' | 'pause'

//let boardDataForTimer: Cell[];


const BoardComponent: React.FC<{width: number, heigth: number}> = ({width: widthProps, heigth: heigthProps}) => {
    const [boardStyle, setBoardStyle] = useState<CSSProperties>({});
    const [timerType, setTimerType] = useState<TimerTypes>('normal');
    
    //const [width, setWidth] = useState(widthProps);
    //const [heigth, setHeigth] = useState(heigthProps);
    const [generation, setGeneration] = useState(0);
    const [error, setError] = useState(false);
    const [errorText, setErrorText] = useState('');
    const [boardData, setBoardData] = useState<Cell[]>([]);
    const [loading, setLoading] = useState(false);
    const [endWork, setEndWork] = useState(false);
    console.log('BoardComponent');

    const refTimer = React.useRef<NodeJS.Timeout | null>(null);
    const boardDataForTimer = React.useRef<Cell[]>(boardData);
    const refWidth = useRef<number>(widthProps); 
    const refHeigth = useRef<number>(heigthProps); 

    useEffect(() => {
        //console.log('BoardComponent123', widthProps);
        //setWidth(widthProps);
        refWidth.current = widthProps;
        tick();
    }, [widthProps])

    useEffect(() => {
        //console.log('BoardComponent123', widthProps);
        //setHeigth(heigthProps);
        refHeigth.current = heigthProps;
        tick();
    }, [heigthProps])

    useEffect(() => {
        setLoading(true);

        getServerDataCells(false, /*heigth * width*/refHeigth.current * refWidth.current)
            .then((board) => {
                //console.log('getServerData then')
                setLoading(false)
                console.log('setServerData', board);
                setBoardData(board);
                boardDataForTimer.current = board;
                setTimerType('normal');
            })
            .catch((err) => {

                setError(true);
                setErrorText(err);
                setLoading(false);
            })
        return () => {
            if (refTimer.current !== null) {
                clearInterval(refTimer.current);
            }
        };
    }, []);

    useEffect(() => {
        boardDataForTimer.current = boardData;
        
    }, [boardData]);

    /*useEffect(() => {
        const tt = timerType;

        setTimerType('pause');

        switch (boardType) {
            case 'small':
                setBoardStyle({height: 200, width:200});
                setTimerType(tt);
                return
                case 'normal':
                setBoardStyle({height: 400, width:400});
                setTimerType(tt);
                return
                case 'big':
                setBoardStyle({height: 800, width:800});
                setTimerType(tt);
                return
            default:
                return
        }
    }, [boardType]);*/

    useEffect(() => {
        if (refTimer.current !== null) {
            clearInterval(refTimer.current);
        }
        switch (timerType) {
            case 'normal':

                refTimer.current = setInterval(() => {
                    tick();
                    //console.log('test timer', new Date())
                }, 5000);
                return;
            case 'slow':

                refTimer.current = setInterval(() => {
                    tick();
                    //console.log('test timer', new Date())
                }, 10000);
                return;
            case 'fast':

                refTimer.current = setInterval(() => {
                    tick();
                    //console.log('test timer', new Date())
                }, 1000);
                return;
            default:
                if (refTimer.current !== null) {
                    clearInterval(refTimer.current);
                }
        }
    }, [timerType])

    function onCellClick(id: number) {
        //console.log('onClick1')
        boardDataForTimer.current[id].status = boardDataForTimer.current[id].status === CellStatus.Alive ? CellStatus.Dead : CellStatus.Alive;
        const updatedBoardData = JSON.parse(JSON.stringify(boardDataForTimer.current));
        //this.setState((state) => ({ ...state, boardData: updatedBoardData }))
        setBoardData(updatedBoardData);
        //console.log('onClick2')
    }


    function tick() {
        console.log('test timer', new Date())
        if (boardDataForTimer.current.length > 0) {
            let newBoard = runGeneration();
            //const updatedBoardData = JSON.parse(JSON.stringify(newBoard));
            if (JSON.stringify(newBoard) === JSON.stringify(boardDataForTimer.current)) {
                setTimerType('pause');
            } else {
                setBoardData(newBoard);
                setGeneration((v) => v = v + 1);
            }
        }
        //initTimer();
        //console.log('tick', this.state.boardData);
    }

    const StyledBoard = styled.div`
    background: #000;
	margin: 0px auto;
	border: 9px solid #333;
	border-radius: 9px;
	box-shadow: 0px 16px 30px 0px #200;
    width:${widthProps*16}px;
    height:${heigthProps*16}px;
    `

    return (

        <div data-testid="boardcomponent">
            {loading ? <div>Идёт загрузка данных с сервера</div> : endWork ? <div>Выполнение завершено, дальнейшее исполнение бессмыслено</div> :
                <div>
                    <div>Генерация:{generation}({timerType})</div>
                    <div>
                        <button onClick={() => setTimerType('pause')}>Pause</button>
                        <button onClick={() => setTimerType('slow')}>Slow</button>
                        <button onClick={() => setTimerType('normal')}>Normal</button>
                        <button onClick={() => setTimerType('fast')}>Fast</button>
                    </div>
                    
                    {/*<button onClick={this.tick}>Tick</button>*/}
                    <StyledBoard>
                        {error
                            ? <div>{errorText}</div>
                            : boardData.map((cell, i) => {
                                //return <div key={i} >{cell.id + ';' + cell.status + "|"}</div>
                                return (<CellComponent key={cell.id/* + ';' + cell.status*/} onClick={() => { onCellClick(cell.id) }} id={cell.id} status={cell.status} />)
                            })}

                    </StyledBoard>

                </div>
            }
        </div>

    );

    /**
         * функция по обработке массива ячеек, на очередном тике жизни
         * @returns массив ячеек, после очередного цикла работы
         */
    function runGeneration(): Cell[] {
        
        const width = refWidth.current;
        const heigth = refHeigth.current;
        console.log('runGeneration', width);
        const board = boardDataForTimer.current;
        let newBoard = [];

        //let cellStatus = null;
        const cells = width * heigth;
        if (board.length < cells) {
            for (let i = board.length; i < cells;i++) {
                board.push({id: i, status: CellStatus.Dead});
            }
        }
        console.log({cells})
        for (var i = 0; i < (cells); i++) {

            newBoard.push({ id: i, status: CellStatus.Dead });

            var check = cellCheck(i, width, heigth, board);

            //keeps the living cell alive if it has 2 or 3 living neighbors
            if ((board[i].status === CellStatus.Alive || board[i].status === CellStatus.AliveOld) && (check === 3 || check === 2)) {
                newBoard[i] = { id: i, status: CellStatus.AliveOld };
            }
            //brings the dead cell to life if there are exactly 3 neighbors
            if (board[i].status === CellStatus.Dead && check === 3) {
                newBoard[i] = { id: i, status: CellStatus.Alive };
            }

        }
        console.log({newBoard})
        return newBoard;
    }


    /**
     * функция проверки ячейки, на то, сколько воркуг неё живых ячеек
     * @param i номер ячейки в массиве, которую проверяем
     * @returns количество живых ячеек вокруг заданной
     */
    function cellCheck(i: number, width: number, heigth: number, board: Cell[]) {

        /*const width = refWidth.current;
        const heigth = refHeigth.current;
        const board = boardDataForTimer.current;*/
        const cells = width * heigth;


        let count = 0;
        let borderCell = 0;
        //checks wrap-around for the top row going upward to the bottom
        if (i >= 0 && i <= (width - 1)) {
            borderCell = 1;
            let dif = width - i;
            //console.log('i:' + i + ' dif:' + dif + ' cell:' + (cells - dif));
            if (board[cells - dif].status === CellStatus.Alive
                || board[cells - dif].status === CellStatus.AliveOld) {
                count++;
                //console.log(status + ' 1 high center one for: ' + i + ' cell: ' + (cells - dif));
            }
            if (i !== 0 && (board[cells - dif - 1].status === CellStatus.Alive
                || board[cells - dif - 1].status === CellStatus.AliveOld)) {
                count++;
                //console.log(status + ' 1 high left one for: ' + i + ' cell: ' + (cells - dif - 1));
            }
            if (i !== (width - 1) && (board[cells - dif + 1].status === CellStatus.Alive
                || board[cells - dif + 1].status === CellStatus.AliveOld)) {
                count++;
                //console.log(status + ' 1 high right one for: ' + i + ' cell: ' + (cells - dif + 1));
            }
            //normal checks, not involving wrap-arounds
            if (i !== 0 && (board[i + width - 1].status === CellStatus.Alive
                || board[i + width - 1].status === CellStatus.AliveOld)) {
                count++;
                //console.log(status + ' 1 low left one for: ' + i + ' cell: ' + (i + width - 1));
            }
            if (board[i + width].status === CellStatus.Alive
                || board[i + width].status === CellStatus.AliveOld) {
                count++;
                //console.log(status + ' 1 low center one for: ' + i + ' cell: ' + (i + width));
            }
            if (i !== (width - 1) && (board[i + width + 1].status === CellStatus.Alive
                || board[i + width + 1].status === CellStatus.AliveOld)) {
                count++;
                //console.log(status + ' 1 low right one for: ' + i + ' cell: ' + (i + width + 1));
            }
            if (i !== 0 && (board[i - 1].status === CellStatus.Alive
                || board[i - 1].status === CellStatus.AliveOld)) {
                count++;
                //console.log(status + ' 1 left one for: ' + i + ' cell: ' + (i - 1));
            }
            if (i !== (width - 1) && (board[i + 1].status === CellStatus.Alive
                || board[i + 1].status === CellStatus.AliveOld)) {
                count++;
                //console.log(status + ' 1 right right one for: ' + i + ' cell: ' + (i + 1));
            }
        }
        //checks wrap-around for the bottom row going down to the top row
        if (i >= (cells - width) && i <= (cells - 1)) {
            borderCell = 1;
            let dif = i + width - cells;
            //console.log('i:' + i + ' dif:' + dif + ' cell:' + (cells - dif));
            if (board[dif].status === CellStatus.Alive
                || board[dif].status === CellStatus.AliveOld) {
                count++;
                //console.log(status + ' 2 low center one for: ' + i + ' cell: ' + (cells - dif));
            }
            if (i !== (cells - width) && (board[dif - 1].status === CellStatus.Alive
                || board[dif - 1].status === CellStatus.AliveOld)) {
                count++;
                //console.log(status + ' 2 low left one for: ' + i + ' cell: ' + (cells - dif - 1));
            }
            if (i !== (cells - 1) && (board[dif + 1].status === CellStatus.Alive
                || board[dif + 1].status === CellStatus.AliveOld)) {
                count++;
                //console.log(status + ' 2 low right one for: ' + i + ' cell: ' + (cells - dif + 1));
            }
            //normal checks, not involving wrap-arounds
            if (i !== (cells - width) && (board[i - width - 1].status === CellStatus.Alive
                || board[i - width - 1].status === CellStatus.AliveOld)) {
                count++;
                //console.log(status + ' 2 high left for: ' + i + ' cell: ' + (i - width - 1));
            }
            if (board[i - width].status === CellStatus.Alive
                || board[i - width].status === CellStatus.AliveOld) {
                count++;
                //console.log(status + ' 2 high center for: ' + i + ' cell: ' + (i + width));
            }
            if (i !== (cells - 1) && (board[i - width + 1].status === CellStatus.Alive
                || board[i - width + 1].status === CellStatus.AliveOld)) {
                count++;
                //console.log(status + ' 2 high right for: ' + i + ' cell: ' + (i - width - 1));
            }
            if (i !== (cells - width) && (board[i - 1].status === CellStatus.Alive
                || board[i - 1].status === CellStatus.AliveOld)) {
                count++;
                //console.log(status + ' 2 left for: ' + i + ' cell: ' + (i - 1));
            }
            if (i !== (cells - 1) && (board[i + 1].status === CellStatus.Alive
                || board[i + 1].status === CellStatus.AliveOld)) {
                count++;
                //console.log(status + ' 2 right for: ' + i + ' cell: ' + (i + 1));
            }

        }
        //checks for cells on the right border (wraping around to left)
        if (((i + 1) % width) === 0) {
            borderCell = 1;

            //to the 'immediate right' with wrap-around
            if (board[i - width + 1].status === CellStatus.Alive
                || board[i - width + 1].status === CellStatus.AliveOld) {
                count++;
                //console.log(status + ' 3 right for: ' + i + ' cell: ' + (i - width + 1));
            }
            //to the 'lower right' with wrap-around
            if (i !== (cells - 1) && (board[i + 1].status === CellStatus.Alive
                || board[i + 1].status === CellStatus.AliveOld)) {
                count++;
                //console.log(status + ' 3 lower right: ' + i + ' cell: ' + (i + 1));
            }
            //to the 'lower right' with wrap-around for the last cell
            if (i === (cells - 1) && (board[0].status === CellStatus.Alive
                || board[0].status === CellStatus.AliveOld)) {
                count++;
                //console.log(status + ' 3 lower right for last cell: ' + i + ' cell: 0');
            }
            //to the 'upper right' with wrap-around for all but the cell
            //in the upper right
            if (i > width && (board[i - (2 * width) + 1].status === CellStatus.Alive
                || board[i - (2 * width) + 1].status === CellStatus.AliveOld)) {
                count++;
                //console.log(status + ' 3 upper right: ' + i + ' cell: ' + (i - (2 * width) + 1));
            }
            //to the 'upper right' with wrap-around for the
            //cell in the upper right
            if (i === width - 1 && (board[(cells - width)].status === CellStatus.Alive
                || board[(cells - width)].status === CellStatus.AliveOld)) {
                count++;
                //console.log(status + ' 3 highdiag one for upper right cell: ' + i + ' cell: ' + (cells + 1 - width));
            }

            //normal checks for normal cells that don't wrap around

            //checks for the cell directly above (non-wrapping)
            if (i !== (width - 1) && i !== (cells - 1) && (board[i - width].status === CellStatus.Alive
                || board[i - width].status === CellStatus.AliveOld)) {
                count++;
                //console.log(status + ' 3 center top for: ' + i + ' cell: ' + (i - width));
            }
            //checks for the cell directly below (non-wrapping)
            if (i !== (cells - 1) && i !== (width - 1) && (board[i + width].status === CellStatus.Alive
                || board[i + width].status === CellStatus.AliveOld)) {
                count++;
                //console.log(status + ' 3 center bottom for: ' + i + ' cell: ' + (i + width));
            }
            if (i !== (cells - 1) && i !== (width - 1) && (board[i + width - 1].status === CellStatus.Alive
                || board[i + width - 1].status === CellStatus.AliveOld)) {
                count++;
                //console.log(status + ' 3 lower left: ' + i + ' cell: ' + (i + width - 1));
            }
            if (i !== (cells - 1) && i !== (width - 1) && (board[i - 1].status === CellStatus.Alive
                || board[i - 1].status === CellStatus.AliveOld)) {
                count++;
                //console.log(status + ' 3 left: ' + i + ' cell: ' + (i - 1));
            }
            if (i !== (width - 1) && i !== (cells - 1) && (board[i - width - 1].status === CellStatus.Alive
                || board[i - width - 1].status === CellStatus.AliveOld)) {
                count++;
                //console.log(status + ' 3 upper left: ' + i + ' cell: ' + (i - width - 1));
            }
            if (i === (width - 1) && (board[cells - width - 1].status === CellStatus.Alive
                || board[cells - width - 1].status === CellStatus.AliveOld)) {
                count++;
                //console.log(status + ' 3 upper left for top left cell: ' + i + ' cell: ' + (i + width - 1));
            }

        }
        //checks for cells on the left border (wraping around to right)
        if (((i) % width) === 0 || i === 0) {
            borderCell = 1;

            //to the 'immediate left' with wrap-around
            if (board[i + width - 1].status === CellStatus.Alive
                || board[i + width - 1].status === CellStatus.AliveOld) {
                count++;
                //console.log(status + ' 4 left one for: ' + i + ' cell: ' + (i + width - 1));
            }
            //to the 'lower left' with wrap-around for all but lowest left cell
            if (i !== (cells - width) && (board[i + (width * 2) - 1].status === CellStatus.Alive
                || board[i + (width * 2) - 1].status === CellStatus.AliveOld)) {
                count++;
                //console.log(status + ' 4 lower left one for: ' + i + ' cell: ' + (i + (width * 2) - 1));
            }
            //to the 'lower right' with wrap-around for the low left cell
            if (i === (cells - width) && (board[width - 1].status === CellStatus.Alive
                || board[width - 1].status === CellStatus.AliveOld)) {
                count++;
                //console.log(status + ' 4 low left one for lowest left cell: ' + i + ' cell: ' + (width - 1));
            }
            //to the 'upper left' with wrap-around for all but the cell in the upper left
            if (i >= width && (board[i - 1].status === CellStatus.Alive
                || board[i - 1].status === CellStatus.AliveOld)) {
                count++;
                //console.log(status + ' 4 highleft one for: ' + i + ' cell: ' + (i - 1));
            }
            //to the 'upper left' with wrap-around for the cell in the upper left
            if (i === 0 && (board[cells - 1].status === CellStatus.Alive
                || board[cells - 1].status === CellStatus.AliveOld)) {
                count++;
                //console.log(status + ' 4 highleft one for upper left cell: ' + i + ' cell: ' + (cells - 1));
            }

            //normal checks for normal cells that don't wrap around

            //checks for the cell directly above (non-wrapping)
            if (i !== (width + 1) && i !== (cells - width) && i !== 0 && (board[i - width].status === CellStatus.Alive
                || board[i - width].status === CellStatus.AliveOld)) {
                count++;
                //console.log(status + ' 4 center top for: ' + i + ' cell: ' + (i - width));
            }
            //checks for the cell directly below (non-wrapping) for all but cell 0
            //or the lower left cell
            if (i < (cells - width) && i !== 0 && (board[i + width].status === CellStatus.Alive
                || board[i + width].status === CellStatus.AliveOld)) {
                count++;
                //console.log(status + ' 4 center bottom for: ' + i + ' cell: ' + (i + width));
            }
            //checks for the cell to the upper right (non-wrapping) for all but cell 0
            //or the lower left cell
            if (i !== 0 && i !== (cells - width) && (board[i - width + 1].status === CellStatus.Alive
                || board[i - width + 1].status === CellStatus.AliveOld)) {
                count++;
                //console.log(status + ' 4 upper right for: ' + i + ' cell: ' + (i - width + 1));
            }
            //checks for the cell to the immediate right (non-wrapping)
            if (i !== 0 && i !== (cells - width) && (board[i + 1].status === CellStatus.Alive
                || board[i + 1].status === CellStatus.AliveOld)) {
                count++;
                //console.log(status + ' 4 right for: ' + i + ' cell: ' + (i + 1));
            }
            //checks for the cell to the lower right (non-wrapping) for all
            //but lower left cell and cell 0

            if (i < (cells - width) && i !== 0) {
                if (board[i + width + 1].status === CellStatus.Alive
                    || board[i + width + 1].status === CellStatus.AliveOld) {
                    count++;
                    //console.log(status + ' 4 lower right for: ' + i + ' cell: ' + (i + width + 1));
                }
            }

        }

        if (borderCell === 0) {
            if (board[i - width].status === CellStatus.Alive
                || board[i - width].status === CellStatus.AliveOld) {
                count++;
                //console.log(status + ' non-border -- upper center for: ' + i);
            }
            if (board[i - width - 1].status === CellStatus.Alive
                || board[i - width - 1].status === CellStatus.AliveOld) {
                count++;
                //console.log(status + ' non-border -- upper left for: ' + i);
            }
            if (board[i - width + 1].status === CellStatus.Alive
                || board[i - width + 1].status === CellStatus.AliveOld) {
                count++;
                //console.log(status + ' non-border -- upper right for: ' + i);
            }
            if (board[i - 1].status === CellStatus.Alive
                || board[i - 1].status === CellStatus.AliveOld) {
                count++;
                //console.log(status + ' non-border -- left for: ' + i);
            }
            if (board[i + 1].status === CellStatus.Alive
                || board[i + 1].status === CellStatus.AliveOld) {
                count++;
                //console.log(status + ' non-border -- right for: ' + i);
            }
            if (board[i + width].status === CellStatus.Alive
                || board[i + width].status === CellStatus.AliveOld) {
                count++;
                //console.log(status + ' non-border -- lower center for: ' + i);
            }
            if (board[i + width - 1].status === CellStatus.Alive
                || board[i + width - 1].status === CellStatus.AliveOld) {
                count++;
                //console.log(status + ' non-border -- lower left for: ' + i);
            }
            if (board[i + width + 1].status === CellStatus.Alive
                || board[i + width + 1].status === CellStatus.AliveOld) {
                count++;
                //console.log(status + ' non-border -- lower right for: ' + i);
            }
        }
        return count;
    }
}



export default BoardComponent;



