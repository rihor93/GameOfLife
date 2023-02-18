import { memo } from "react";


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
    onClick: (id: number) => void,
    className?: string,
};

//const CellComponent: React.FC<Props> = (props) => {
const CellComponent= memo<Props>( (props) => {
    //console.log('CellComponent')
    /*const [id, setId] = useState(props.id);
    const [status, setStatus] = useState(props.status);*/

    /*useEffect(() => {
        setStatus(props.status);
    }, [props.status])*/
    //console.log('cellComponent');

    return (<div className={props.className} data-testid="cellcomponent" /*className={status === CellStatus.Alive ? "cell alive" : (status === CellStatus.AliveOld ? "cell old" : "cell dead")}*/
        onClick={() => props.onClick(props.id)}>
        {props.id}
    </div>);
})



export default CellComponent;

