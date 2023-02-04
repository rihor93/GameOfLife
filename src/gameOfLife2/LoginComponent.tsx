import React, { useState } from "react";


export interface LoginComponentProps {
    onClick: (name: string) => void,
}

const LoginComponent: React.FC<LoginComponentProps> = (props) => {

    const [name, setName] = useState('');

    return (

        <div className="cardBorder contentWrapper">
            <div>Введите имя:
                <input data-testid="loginInput" value={name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setName(e.target.value) }}></input>
            </div>
            <div>
                <button data-testid="btnStart" onClick={() => props.onClick(name)}>Старт!</button>
            </div>
        </div>

    );
}



export default LoginComponent;