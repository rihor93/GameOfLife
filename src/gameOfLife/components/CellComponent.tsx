import { PropsWithChildren } from "react"
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


    /**
     * функция выводит id ячейки, на которую кликнули
     */
    function showNumber(): void{
        let stringData = value.id + " status:" + value.status;
        console.log(stringData);
        alert(stringData);
        //return value.id + " status:" + value.status;
    }

    return (
    <div className={value.status === CellStatus.Alive ? "cell alive" : (value.status === CellStatus.AliveOld ? "cell alive old" : "cell dead")} onClick={showNumber}>
        {value.id}
    </div>)
}