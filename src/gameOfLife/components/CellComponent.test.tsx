import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BoardComponent } from './BoardComponent';
import { CellComponent, CellStatus } from './CellComponent';


describe('CellComponent tests', () => {
    it('show id on screen', () => {
        let cellData = {id: 1, status: CellStatus.Alive};
        render(<CellComponent value={cellData}/>);
        const allElements = screen.getAllByText('1');

        expect(allElements).toHaveLength(1);
    });

    it('show alive element with class alive', () => {
        let cellData = {id: 1, status: CellStatus.Alive};
        const {container} = render(<CellComponent value={cellData}/>);
        const allElements = container.getElementsByClassName("cell alive")

        expect(allElements).toHaveLength(1);
    });

    it('show alive element with class dead', () => {
        let cellData = {id: 1, status: CellStatus.Alive};
        const {container} = render(<CellComponent value={cellData}/>);
        const allElements = container.getElementsByClassName("cell dead")

        expect(allElements).toHaveLength(0);
    });

    it('show dead element with class dead', () => {
        let cellData = {id: 1, status: CellStatus.Dead};
        const {container} = render(<CellComponent value={cellData}/>);
        const allElements = container.getElementsByClassName("cell dead")

        expect(allElements).toHaveLength(1);
    });

    it('show aliveold element with class aliveold', () => {
        let cellData = {id: 1, status: CellStatus.AliveOld};
        const {container} = render(<CellComponent value={cellData}/>);
        const allElements = container.getElementsByClassName("cell old")

        expect(allElements).toHaveLength(1);
    });

});

describe('BoardComponent tests', () => {
    it('show cell component with id', () => {
        
        render(<BoardComponent/>);
        const allElements = screen.getAllByText('2399');

        expect(allElements).toHaveLength(1);
    });

    it('count cell element equal 2500', () => {
        const {container} = render(<BoardComponent/>);
        const allElements = container.getElementsByClassName("cell")

        expect(allElements).toHaveLength(2500);
    });

    
});