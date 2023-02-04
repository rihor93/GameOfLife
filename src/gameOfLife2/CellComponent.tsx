import React, { useEffect, useState } from "react";
import styled from "styled-components";
//import './CellComponent.css'


export interface Cell {
    id: number,
    status: CellStatus,
}

/**
 * жизненные статусы ячейки
 */
export enum CellStatus {
    Alive,
    AliveOld,
    Dead,
}

export type Props = {
    id: number,
    status: CellStatus,
    onClick: (id: number) => void
};

const CellComponent: React.FC<Props> = (props) => {
    //console.log('CellComponent')
    const [id, setId] = useState(props.id);
    const [status, setStatus] = useState(props.status);

    useEffect(() => {
        setStatus(props.status);
    }, [props.status])


    return (<div data-testid="cellcomponent" //className={status === CellStatus.Alive ? "cell alive" : (status === CellStatus.AliveOld ? "cell alive old" : "cell dead")}
        onClick={() => props.onClick(id)}>
        {id}
    </div>);
}



export default CellComponent;

