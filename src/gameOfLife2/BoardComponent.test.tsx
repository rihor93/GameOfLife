import { cleanup, render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { CellStatus } from './CellComponent';
import { BoardTypes, TimerTypes } from "./ControlComponent";
import { width } from './server';
import { StyledBoardComponent } from './style';

afterEach(cleanup)

describe('BoardComponent tests', () => {
    it('show id on screen', () => {
        let cellCLick = jest.fn();
        render(<StyledBoardComponent width={0} heigth={0} loading={false} endWork={false} generation={0} timerType={"slow"} errorText={""} error={false} boardData={[]} 
        onCellClick={function (id: number): void {
            throw new Error("Function not implemented.");
        } } 
        setBoardType={function (type: BoardTypes): void {
            throw new Error("Function not implemented.");
        } } 
        setTimerType={function (type: TimerTypes): void {
            throw new Error("Function not implemented.");
        } } 
        resetData={function (): void {
            throw new Error("Function not implemented.");
        } } 
        setPersentData={function (persent: number): void {
            throw new Error("Function not implemented.");
        } }   />);
        const allElements = screen.getByTestId('boardcomponent');

        expect(allElements).toBeInTheDocument();
    });
});

describe('BoardComponent Snapshottest', () => {
    it('Small BoardComponent', () => {
        const width = 10;
        const heigth = 10;
        let boardDataTest = [];
        for (let i = 0; i < heigth * width; i++) {
            boardDataTest.push({ id: i, status: CellStatus.Dead });
        }
        const boardContainer = renderer
            .create(<StyledBoardComponent width={width} heigth={heigth} loading={false} endWork={false} generation={0} timerType={"slow"} errorText={""} error={false} boardData={boardDataTest} 
            onCellClick={function (id: number): void {
                throw new Error("Function not implemented.");
            } } 
            setBoardType={function (type: BoardTypes): void {
                throw new Error("Function not implemented.");
            } } 
            setTimerType={function (type: TimerTypes): void {
                throw new Error("Function not implemented.");
            } } 
            resetData={function (): void {
                throw new Error("Function not implemented.");
            } } 
            setPersentData={function (persent: number): void {
                throw new Error("Function not implemented.");
            } }   />)
            .toJSON();
        expect(boardContainer).toMatchSnapshot();
    });

    it('Normal BoardComponent', () => {
        const width = 25;
        const heigth = 25;
        let boardDataTest = [];
        for (let i = 0; i < heigth * width; i++) {
            boardDataTest.push({ id: i, status: CellStatus.Alive });
        }
        const boardContainer = renderer
            .create(<StyledBoardComponent width={width} heigth={heigth} loading={false} endWork={false} generation={0} timerType={"slow"} errorText={""} error={false} boardData={boardDataTest} 
            onCellClick={function (id: number): void {
                throw new Error("Function not implemented.");
            } } 
            setBoardType={function (type: BoardTypes): void {
                throw new Error("Function not implemented.");
            } } 
            setTimerType={function (type: TimerTypes): void {
                throw new Error("Function not implemented.");
            } } 
            resetData={function (): void {
                throw new Error("Function not implemented.");
            } } 
            setPersentData={function (persent: number): void {
                throw new Error("Function not implemented.");
            } }   />)
            .toJSON();
        expect(boardContainer).toMatchSnapshot();
    });

    it('Big BoardComponent', () => {
        const width = 50;
        const heigth = 50;
        let boardDataTest = [];
        for (let i = 0; i < heigth * width; i++) {
            boardDataTest.push({ id: i, status: CellStatus.AliveOld });
        }
        const boardContainer = renderer
            .create(<StyledBoardComponent width={width} heigth={heigth} loading={false} endWork={false} generation={0} timerType={"slow"} errorText={""} error={false} boardData={boardDataTest} 
            onCellClick={function (id: number): void {
                throw new Error("Function not implemented.");
            } } 
            setBoardType={function (type: BoardTypes): void {
                throw new Error("Function not implemented.");
            } } 
            setTimerType={function (type: TimerTypes): void {
                throw new Error("Function not implemented.");
            } } 
            resetData={function (): void {
                throw new Error("Function not implemented.");
            } } 
            setPersentData={function (persent: number): void {
                throw new Error("Function not implemented.");
            } }   />)
            .toJSON();
        expect(boardContainer).toMatchSnapshot();
    });
})