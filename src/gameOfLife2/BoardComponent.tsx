import { number } from "prop-types";
import React, { CSSProperties, useCallback, useEffect, useMemo, useRef, useState } from "react";
import styled, { StyledComponent } from "styled-components";
import { TextStyled } from "../Tests/styles";
import BtnComponent from "./BtnComponent";
import CellComponent, { Cell, CellStatus } from "./CellComponent";
import { BoardTypes, TimerTypes } from "./ControlComponent";
import { getServerDataCells } from "./server";
import { StyledCellComponent } from "./style";
import {Input} from './input/input'
import { InputNumber } from "./input/InputNumber";
import { InputNumberWithArrows } from "./input/InputNumberWithArrows";



type BoardComponentProps = {
    width: number, 
    heigth: number, 
    className?: string, 
    loading: boolean, 
    endWork: boolean, 
    generation: number, 
    timerType: TimerTypes, 
    errorText: string, 
    error: boolean,
    boardData: Cell[],
    onCellClick: (id: number) => void,
    setBoardType: (type: BoardTypes) => void,
    setTimerType: (type: TimerTypes) => void,
    resetData: () => void,
    setPersentData: (persent: number) => void,
}

//let boardDataForTimer: Cell[];

const BoardComponent: React.FC<BoardComponentProps> = ({ width, heigth, className: classProps, endWork, generation, timerType, errorText, loading, error, onCellClick, boardData, setBoardType, setTimerType, resetData, setPersentData, }) => {


    //const [width, setWidth] = useState(widthProps);
    //const [heigth, setHeigth] = useState(heigthProps);

    //console.log('BoardComponent');

    const [persent, setPersent] = useState<string>('0');

    const [persentToLoad, setPersentToLoad] = useState<number>(0);

    useEffect(()=> {
        let countDead = 0;
        if (boardData?.length > 0) {
            boardData.forEach((el) => { countDead = countDead + (el.status === CellStatus.Dead ? 1 : 0) });
            setPersent(((1 - countDead / boardData.length) * 100).toFixed(0));
        } else {
            setPersent('0');
        }
    },[boardData])

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








    //useMemo(() => ({ test: "test" }), []);

    const onPersentToLoadChange = (event: { value: number }) => {
        console.log(event.value);
        setPersentToLoad(event.value);
    }

    return (

        <div data-testid="boardcomponent" >
            {loading ? <div>Идёт загрузка данных с сервера</div> : endWork ? <div>Выполнение завершено, дальнейшее исполнение бессмыслено</div> :
                <div>
                    <div>Процент заполнения:<InputNumberWithArrows value={persentToLoad} onChange={onPersentToLoadChange} ><BtnComponent onClick={() => setPersentData(persentToLoad)/*setBoardType('small')*/}>Set</BtnComponent></InputNumberWithArrows></div>
                    <div>Генерация:{generation}({timerType})</div>
                    <div>Заполнено:{persent}%</div>
                    <div>
                        <BtnComponent onClick={() => setBoardType('small')/*setBoardType('small')*/}>10x10</BtnComponent>
                        <BtnComponent onClick={() => setBoardType('normal')}>25x25</BtnComponent>
                        <BtnComponent onClick={() => setBoardType('big')}>50x50</BtnComponent>
                        <BtnComponent onClick={resetData}>Reset</BtnComponent>
                    </div>
                    <div>
                        <BtnComponent onClick={() => setTimerType('slow')/*setBoardType('small')*/}>slow</BtnComponent>
                        <BtnComponent onClick={() => setTimerType('normal')}>normal</BtnComponent>
                        <BtnComponent onClick={() => setTimerType('fast')}>fast</BtnComponent>
                        <BtnComponent  onClick={() => setTimerType('pause')}>pause</BtnComponent>
                    </div>

                    {/*<button onClick={this.tick}>Tick</button>*/}
                    <div className={classProps}>
                        {error
                            ? <div>{errorText}</div>
                            : boardData.map((cell, i) => {
                                //return <div key={i} >{cell.id + ';' + cell.status + "|"}</div>
                                return (<StyledCellComponent key={cell.id/* + ';' + cell.status*/} onClick={() => { onCellClick(cell.id) }} id={cell.id} status={cell.status} />)
                                //return (<TextStyled key={cell.id/* + ';' + cell.status*/} onClick={() => { onCellClick(cell.id) }} id={cell.id} status={cell.status} />)
                                //return (<TextStyled color="#ADFF2F"/>)
                            })}

                    </div>

                </div>
            }
        </div>

    );
}



export default BoardComponent;



