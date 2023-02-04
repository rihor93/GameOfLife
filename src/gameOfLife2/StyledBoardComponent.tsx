import styled from "styled-components";
import BoardComponent from "./BoardComponent";

export const StyledBoardComponent = styled(BoardComponent)`
.cell {
	font-size: 9px;
	width: 15px;
	height: 15px;
	border-top: 1px solid #333;
	border-left: 1px solid #222;
	margin: 0px;
	float: left;
  	border-radius: none;
}

.alive {
	background: #fbf;
}
.old {
	background: #e44;
}
.dead {
	background: #000;
}
`    