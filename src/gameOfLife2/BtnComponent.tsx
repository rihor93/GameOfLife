import React from "react"

export interface BtnProps {
    onClick: () => void,
    value: string,
}

const BtnComponent: React.FC<BtnProps> = ({ value, onClick }) => {
    return (

        <button onClick={onClick}>{value}</button>

    );
}



export default BtnComponent;