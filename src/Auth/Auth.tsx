import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { NavigationState } from "../Navigation/types";
import { useTokenContext } from "../TokenProvider";
import BtnComponent from "../gameOfLife2/BtnComponent";


const Auth: React.FC = () => {

    const [name, setName] = useState('');

    const location = useLocation();
    const navigate = useNavigate();
    const [, { login }] = useTokenContext();
    const onClick = (userName: string) => {
        const state = location.state as NavigationState;
        login(userName);
        navigate(state?.from || '/');
    };

    return (

        <div className="cardBorder contentWrapper">
            <div>Введите имя:
                <input data-testid="loginInput" value={name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setName(e.target.value) }}></input>
            </div>
            <div>
                <BtnComponent data-testid="btnStart" onClick={() => onClick(name)}>Старт!</BtnComponent>
            </div>
        </div>

    );
}



export default Auth;