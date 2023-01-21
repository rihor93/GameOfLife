import { PropsWithChildren, useState } from "react"
import './CellComponent.css'

/**
     * интерфейс ячейки сетки, содержит id и жизненный статус
     */
export interface Cell {
    id: number,
    status: CellStatus,
}

/**
 * жизненные статусы ячейки
 */
export enum CellStatus{
    Alive,
    AliveOld,
    Dead,
}

export const CellComponent: React.FC<
PropsWithChildren<{ value: Cell}>
>= ({value}) => {

    const [cellState, setCellState] = useState(value);


    /**
     * функция меняет состояние ячейки
     */
    function updateCell(): void{

        setCellState((previewState) => ({id: previewState.id, status: previewState.status == CellStatus.Alive ? CellStatus.Dead : CellStatus.Alive}));
    }

    return (
    <div data-testid="cellcomponent" className={cellState.status === CellStatus.Alive ? "cell alive" : (cellState.status === CellStatus.AliveOld ? "cell alive old" : "cell dead")} onClick={updateCell}>
        {cellState.id}
    </div>)
}