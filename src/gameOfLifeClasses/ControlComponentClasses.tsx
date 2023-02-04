import { Component } from "react";
import { BoardComponentClasses } from "./BoardComponentClasses";

type State = {
    mounted: boolean,
};

type Props = {};

export class ControlComponentClasses extends Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            mounted: false,
        }
    }


    toggleMounted = () => {
        this.setState((v) => ({ mounted: !v.mounted }));
    }

    render() {
        const { mounted } = this.state;
        return (
            <div data-testid="ControlComponentClasses">
                <button onClick={this.toggleMounted} data-testid="mountbutton">
                    {mounted ? "Размонтировать" : "Монтировать"}
                </button>
                {mounted && <BoardComponentClasses />}

            </div>);
    }
}