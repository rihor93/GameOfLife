import { render, screen } from '@testing-library/react';
import { CellComponent, CellStatus } from './CellComponent';
import renderer from 'react-test-renderer';
import userEvent from '@testing-library/user-event';

describe('CellComponent tests', () => {
    it('show id on screen', () => {
        let cellData = { id: 1, status: CellStatus.Alive };
        render(<CellComponent value={cellData} />);
        const allElements = screen.getAllByText('1');

        expect(allElements).toHaveLength(1);
    });

    it('show alive element with class alive', () => {
        let cellData = { id: 1, status: CellStatus.Alive };
        const { container } = render(<CellComponent value={cellData} />);
        const allElements = container.getElementsByClassName("cell alive")

        expect(allElements).toHaveLength(1);
    });

    it('show alive element with class dead', () => {
        let cellData = { id: 1, status: CellStatus.Alive };
        const { container } = render(<CellComponent value={cellData} />);
        const allElements = container.getElementsByClassName("cell dead")

        expect(allElements).toHaveLength(0);
    });

    it('show dead element with class dead', () => {
        let cellData = { id: 1, status: CellStatus.Dead };
        const { container } = render(<CellComponent value={cellData} />);
        const allElements = container.getElementsByClassName("cell dead")

        expect(allElements).toHaveLength(1);
    });

    it('show aliveold element with class aliveold', () => {
        let cellData = { id: 1, status: CellStatus.AliveOld };
        const { container } = render(<CellComponent value={cellData} />);
        const allElements = container.getElementsByClassName("cell old")

        expect(allElements).toHaveLength(1);
    });

    it('click and update state alive to dead', async () => {
        let cellData = { id: 2, status: CellStatus.Alive };
        const { getByTestId, container } = render(<CellComponent value={cellData} />);
        
        let cellComponent = getByTestId('cellcomponent')
        await userEvent.click(cellComponent);
        expect(cellComponent).toHaveClass('dead');
    });

    it('click and update state dead to alive', async () => {
        let cellData = { id: 2, status: CellStatus.Dead };
        const { getByTestId, container } = render(<CellComponent value={cellData} />);
        
        let cellComponent = getByTestId('cellcomponent')
        await userEvent.click(cellComponent);
        expect(cellComponent).toHaveClass('alive');
    });

});

describe('CellComponent Snapshottest', () => {
    it('Alive cell snapshot', () => {
        let cellData = { id: 1, status: CellStatus.Alive };
        const cellContainer = renderer
            .create(<CellComponent value={cellData} />)
            .toJSON();
        expect(cellContainer).toMatchSnapshot();
    });

    it('Alive old cell snapshot', () => {
        let cellData = { id: 12, status: CellStatus.AliveOld };
        const cellContainer = renderer
            .create(<CellComponent value={cellData} />)
            .toJSON();
        expect(cellContainer).toMatchSnapshot();
    });

    it('Dead cell snapshot', () => {
        let cellData = { id: 47, status: CellStatus.Dead };
        const cellContainer = renderer
            .create(<CellComponent value={cellData} />)
            .toJSON();
        expect(cellContainer).toMatchSnapshot();
    });

});
