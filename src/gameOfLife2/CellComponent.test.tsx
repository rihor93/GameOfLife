import { cleanup, render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import userEvent from '@testing-library/user-event';
import CellComponent, { CellStatus } from './CellComponent';

afterEach(cleanup)

describe('CellComponent tests', () => {
    it('show id on screen', () => {
        let cellCLick = jest.fn();
        render(<CellComponent id={1} status={CellStatus.Alive} onClick={() => console.log('click')}  />);
        const allElements = screen.getByTestId('cellcomponent');

        expect(allElements).toBeInTheDocument();
    });

    
});

describe('CellComponent Snapshottest', () => {
    it('Alive cell snapshot', () => {
        const cellContainer = renderer
            .create(<CellComponent id={1} status={CellStatus.Alive} onClick={() => console.log('click')}  />)
            .toJSON();
        expect(cellContainer).toMatchSnapshot();
    });

    it('Alive old cell snapshot', () => {
        const cellContainer = renderer
            .create(<CellComponent id={1} status={CellStatus.AliveOld} onClick={() => console.log('click')}  />)
            .toJSON();
        expect(cellContainer).toMatchSnapshot();
    });

    it('Dead cell snapshot', () => {
        const cellContainer = renderer
            .create(<CellComponent id={1} status={CellStatus.Dead} onClick={() => console.log('click')} />)
            .toJSON();
        expect(cellContainer).toMatchSnapshot();
    });
    
});
