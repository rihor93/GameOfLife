import styled from "styled-components";
import CellComponent, { CellStatus } from "./CellComponent";

export const StyledCellComponent = styled(CellComponent)`

	font-size: 9px;
	width: 15px;
	height: 15px;
	border-top: 1px solid #333;
	border-left: 1px solid #222;
	margin: 0px;
	float: left;
  	border-radius: none;

    background: ${props => props.status === CellStatus.Alive ? '#fbf' : (props.status === CellStatus.AliveOld ? '#e44' : '#000')}

`    