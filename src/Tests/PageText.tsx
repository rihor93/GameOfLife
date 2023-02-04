import React from 'react'

interface Props{
    className?: string;
    fontSize?: any;
    color?: string;
}
export const PageText:React.FC <Props> = ({className}) => {
    return (
       <span className={className}>test</span>
    )
}