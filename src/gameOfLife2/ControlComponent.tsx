import React, { useCallback, useEffect, useRef, useState } from "react";
import BoardComponent from "../gameOfLife2/BoardComponent";
import LoginCompotent from "./LoginComponent";
import styled from "styled-components";
import { baseTheme } from "../styles/theme";
import { StyledBoardComponent, StyledHeader, StyledHeaderContent } from "./style";
import { Cell, CellStatus } from "./CellComponent";
import { getServerDataCells } from "./server";
import BtnComponent from "./BtnComponent";

export type BoardTypes = 'small' | 'normal' | 'big'
export type TimerTypes = 'slow' | 'normal' | 'fast' | 'pause'

const ControlComponent: React.FC = () => {
    const [timerType, setTimerType] = useState<TimerTypes>('normal');
    const [boardType, setBoardType] = useState<BoardTypes>('big');
    const [isLogin, setIsLogin] = useState(false);
    const [userName, setUserName] = useState<string>('');
    const [generation, setGeneration] = useState(0);
    const [error, setError] = useState(false);
    const [errorText, setErrorText] = useState('');
    const [boardData, setBoardData] = useState<Cell[]>([]);
    const [loading, setLoading] = useState(false);
    const [endWork, setEndWork] = useState(false);

    const refTimer = React.useRef<NodeJS.Timeout | null>(null);
    const boardDataForTimer = React.useRef<Cell[]>(boardData);

    

    const [width, setWidth] = useState(50);
    const [heigth, setHeigth] = useState(50);

    const refWidth = useRef<number>(width);
    const refHeigth = useRef<number>(heigth);

    function toggleStart(name: string) {
        console.log('start', name);
        setUserName(name);
        setIsLogin(true);
    }

    const loadServerData = useCallback(() => {
        
        setLoading(true);

        getServerDataCells(false, /*heigth * width*/width * heigth)
            .then((board) => {
                //console.log('getServerData then')
                setLoading(false)
                //console.log('setServerData', board);
                setBoardData(board);
                boardDataForTimer.current = board;
                setTimerType('normal');
            })
            .catch((err) => {

                setError(true);
                setErrorText(err);
                setLoading(false);
            })
    }, [width, heigth])

    const setForPersent = useCallback((persent: number) => {
        console.log('setForPersent')
        const cells = refHeigth.current * refWidth.current;
        let boardNew = [];
        for (let i = 0; i < cells; i++) {
            if (i <= cells * persent / 100) {
                boardNew.push({ id: i, status: CellStatus.Alive });
            } else {
                boardNew.push({ id: i, status: CellStatus.Dead });
            }
        }
        setBoardData(boardNew);
        //setBoard(boardNew);
    }, [width, heigth])

    useEffect(() => {
        loadServerData();
        return () => {
            if (refTimer.current !== null) {
                clearInterval(refTimer.current);
            }
        };
    }, []);

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

    useEffect(() => {
        //console.log('BoardComponent123', widthProps);
        //setWidth(widthProps);
        refWidth.current = width;
        tick();
    }, [width])

    useEffect(() => {
        //console.log('BoardComponent123', widthProps);
        //setHeigth(heigthProps);
        refHeigth.current = heigth;
        tick();
    }, [heigth])

    function tick() {
        //console.log('test timer', new Date())
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

    useEffect(() => {
        boardDataForTimer.current = boardData;

    }, [boardData]);

    useEffect(() => {

        switch (boardType) {
            case 'small':
                setWidth(10);
                setHeigth(10);
                return
            case 'normal':
                setWidth(25);
                setHeigth(25);
                return
            case 'big':
                setWidth(50);
                setHeigth(50);
                return
            default:
                return
        }
    }, [boardType]);

    const onCellClick = useCallback((id: number) => {
        //console.log('onClick1')
        boardDataForTimer.current[id].status = boardDataForTimer.current[id].status === CellStatus.Alive ? CellStatus.Dead : CellStatus.Alive;
        const updatedBoardData = JSON.parse(JSON.stringify(boardDataForTimer.current));
        //this.setState((state) => ({ ...state, boardData: updatedBoardData }))
        setBoardData(updatedBoardData);
        //console.log('onClick2')
    }, [])

    const setBoard = useCallback((type: BoardTypes) => {
        //console.log('onClick1')
        setBoardType(type)
        //console.log('onClick2')
    }, [])

    const setTimer = useCallback((type: TimerTypes) => {
        //console.log('onClick1')
        setTimerType(type)
        //console.log('onClick2')
    }, [])
    /*function onCellClick(id: number) {
        //console.log('onClick1')
        boardDataForTimer.current[id].status = boardDataForTimer.current[id].status === CellStatus.Alive ? CellStatus.Dead : CellStatus.Alive;
        const updatedBoardData = JSON.parse(JSON.stringify(boardDataForTimer.current));
        //this.setState((state) => ({ ...state, boardData: updatedBoardData }))
        setBoardData(updatedBoardData);
        //console.log('onClick2')
    }*/

    /**
             * функция по обработке массива ячеек, на очередном тике жизни
             * @returns массив ячеек, после очередного цикла работы
             */
    function runGeneration(): Cell[] {

        const width = refWidth.current;
        const heigth = refHeigth.current;
        //console.log('runGeneration', width);
        const board = boardDataForTimer.current;
        let newBoard = [];

        //let cellStatus = null;
        const cells = width * heigth;
        if (board.length < cells) {
            for (let i = board.length; i < cells; i++) {
                board.push({ id: i, status: CellStatus.Dead });
            }
        }
        //console.log({cells})
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
        //console.log({newBoard})
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

    return (

        <div data-testid="ControlComponent">
            <StyledHeader>{isLogin && <StyledHeaderContent data-testid="HeadComponent">Привет, {userName}!<button onClick={() => { setIsLogin(false); }}>Выйти</button></StyledHeaderContent>}</StyledHeader>
            {!isLogin
                ? <LoginCompotent onClick={toggleStart} />
                : <div>
                    
                    {/*<BoardComponent width={width} heigth={heigth} />*/}
                    <StyledBoardComponent width={width} heigth={heigth} boardData={boardData} loading={loading} error={error} errorText={errorText} 
                        endWork={endWork} generation={generation} timerType={timerType} onCellClick={onCellClick} setBoardType={setBoard} setTimerType={setTimer} 
                        resetData={loadServerData} setPersentData={setForPersent}/>
                </div>}

        </div>

    );
}



export default ControlComponent;