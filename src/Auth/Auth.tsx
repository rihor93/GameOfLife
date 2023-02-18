import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { NavigationState } from "../Navigation/types";
import { useTokenContext } from "../TokenProvider";
import BtnComponent from "../gameOfLife2/BtnComponent";
import { Container } from "../gameOfLife2/style";


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

        <Container>
            <div>Введите имя:
                <input data-testid="loginInput" value={name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setName(e.target.value) }}></input>
            </div>
            <div>
                {name.length > 0 && <BtnComponent data-testid="btnStart" onClick={() => onClick(name)}>Старт!</BtnComponent>}
            </div>
        </Container>

    );
}



export default Auth;