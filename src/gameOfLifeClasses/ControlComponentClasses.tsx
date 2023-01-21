import { Component } from "react";
import { BoardComponentClasses } from "./BoardComponentClasses";

type State = {
    mounted: boolean;
};

type Props = {};

export class ControlComponentClasses extends Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            mounted: false
        }
    }

    componentDidMount() {
        console.log("componentDidMount ControlComponentClasses", this);
    }

    componentWillUnmount() {
        console.log("componentWillUnmount ControlComponentClasses", this);
    }

    toggleMounted = () => {
        this.setState((v) => ({ mounted: !v.mounted }));
      }

    render() {
        const { mounted } = this.state;
        return (
            <div>
                <button onClick={this.toggleMounted}>
                    {mounted ? "Размонтировать" : "Монтировать"}
                </button>
                {mounted && <BoardComponentClasses/>}

            </div>);
    }
}