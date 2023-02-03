import { Component } from "react";
import { BoardComponentClasses } from "./BoardComponentClasses";
import LoginCompotent from "./LoginCompotent";

type State = {
    isLogin: boolean,
    userName: string,
};

type Props = {};

export class ControlComponentClasses extends Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            isLogin: false,
            userName: '',
        }
    }


    toggleStart = (name: string) => {
        console.log('start', name); 
        this.setState((v) => ({ userName: name, isLogin: true }));
    }

    render() {
        const { isLogin, userName } = this.state;
        return (
            <div data-testid="ControlComponentClasses">
                {isLogin && <div>Привет, {userName}!</div>}
                {!isLogin 
                    ? <LoginCompotent onClick={this.toggleStart} />
                    : <BoardComponentClasses></BoardComponentClasses>}

            </div>);
    }
}