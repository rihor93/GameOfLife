import { Component } from "react";
import "../gameOfLife/components/CellComponent.css"

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
export enum CellStatus {
    Alive,
    AliveOld,
    Dead,
}

type State = {
    cell: Cell,
};

type Props = {
    id: number,
    status: CellStatus,
    onClick: (id: number) => void
};

export class CellComponentClasses extends Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            cell: {
                id: props.id,
                status: props.status
            },
        }
    }

    componentDidMount() {
        //console.log("componentDidMount CellComponentClasses", this);
    }

    componentWillUnmount() {
        //console.log("componentWillUnmount CellComponentClasses", this);
    }

    /*shouldComponentUpdate(nextProps: Props, nextState: State) {
        //console.log('shouldComponentUpdate cell', nextProps, nextState)
        //this.setState((v) => ({ boardData: newBoard, generation: v.generation + 1 }))
        if (this.state.cell.status !== nextProps.status) {
            this.setState((v) => ({ cell: { id: v.cell.id, status: nextProps.status } }))
            return true;
        } else {
            return false;
        }
    }*/

    /*componentDidUpdate(prevProps: Props, prevState: State, snapshot: any){
        console.log('componentDidUpdate cell', prevProps, prevState, this.state)
    }*/

    render() {
        const { id, status } = this.state.cell;
        const { onClick } = this.props;
        return (<div data-testid="cellcomponent" className={status === CellStatus.Alive ? "cell alive" : (status === CellStatus.AliveOld ? "cell alive old" : "cell dead")}
            onClick={() => onClick(id)}>
            {id}
        </div>)
    }
}