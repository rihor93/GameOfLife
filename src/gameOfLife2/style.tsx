import styled, { keyframes } from "styled-components";
import { baseTheme } from "../styles/theme";
import BoardComponent from "./BoardComponent";
import CellComponent, { CellStatus } from "./CellComponent";


export const Container = styled.div`
	text-align: center;
	display: block;
	margin: 0px auto;
`

export const StyledBoardComponent = styled(BoardComponent)`
background: #000;
margin: 0px auto;
border: 9px solid #333;
border-radius: 9px;
box-shadow: 0px 16px 30px 0px #200;
width:${props => props.width * 16}px;
height:${props => props.heigth * 16}px;
`



export const StyledHeaderContent = styled.div`
float: right;
`

export const StyledHeader = styled.header`
background-color: ${baseTheme.colors.headerBackgroudColor};
height: ${baseTheme.sizes.header.height}px;
z-index: ${baseTheme.order.header};
color: ${baseTheme.colors.headerBackgroudTextColor};
text-align: center;
`

export const alive = keyframes`
	from {
		background-color: black;
	}

	to {
		background-color: red;
	}
`

export const old = keyframes`
	from {
		background-color: black;
	}

	to {
		background-color: yellow;
	}
`

export const dead = keyframes`
	from {
		background-color: black;
	}

	to {
		background-color: black;
	}
`


export const StyledCellComponent = styled(CellComponent)`

	font-size: 9px;
	width: 15px;
	height: 15px;
	border-top: 1px solid #333;
	border-left: 1px solid #222;
	margin: 0px;
	float: left;
  	border-radius: none;
    animation-timing-function: linear;
	animation: ${props => props.status === CellStatus.Alive ? alive : (props.status === CellStatus.AliveOld ? old : dead)} 1s 1 linear;
	background: ${props => props.status === CellStatus.Alive ? 'red' : (props.status === CellStatus.AliveOld ? 'yellow' : 'black')}

`