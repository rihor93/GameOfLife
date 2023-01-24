import { render, screen } from '@testing-library/react';
import { CellComponentClasses, CellStatus } from './CellComponentClasses';
import renderer from 'react-test-renderer';
import userEvent from '@testing-library/user-event';

describe('CellComponent tests', () => {
    it('show id on screen', () => {
        render(<CellComponentClasses id={1} status={CellStatus.Alive} onClick={() => console.log('click')}  />);
        const allElements = screen.getAllByText('1');

        expect(allElements).toHaveLength(1);
    });

    it('show alive element with class alive', () => {
        const { container } = render(<CellComponentClasses id={1} status={CellStatus.Alive} onClick={() => console.log('click')}  />);
        const allElements = container.getElementsByClassName("cell alive")

        expect(allElements).toHaveLength(1);
    });

    it('show alive element with class dead', () => {
        const { container } = render(<CellComponentClasses id={1} status={CellStatus.Alive} onClick={() => console.log('click')}  />);
        const allElements = container.getElementsByClassName("cell dead")

        expect(allElements).toHaveLength(0);
    });

    it('show dead element with class dead', () => {
        const { container } = render(<CellComponentClasses id={1} status={CellStatus.Dead} onClick={() => console.log('click')}  />);
        const allElements = container.getElementsByClassName("cell dead")

        expect(allElements).toHaveLength(1);
    });

    it('show aliveold element with class aliveold', () => {
        const { container } = render(<CellComponentClasses id={1} status={CellStatus.AliveOld} onClick={() => console.log('click')}  />);
        const allElements = container.getElementsByClassName("cell old")

        expect(allElements).toHaveLength(1);
    });

});

describe('CellComponent Snapshottest', () => {
    it('Alive cell snapshot', () => {
        const cellContainer = renderer
            .create(<CellComponentClasses id={1} status={CellStatus.Alive} onClick={() => console.log('click')}  />)
            .toJSON();
        expect(cellContainer).toMatchSnapshot();
    });

    it('Alive old cell snapshot', () => {
        const cellContainer = renderer
            .create(<CellComponentClasses id={1} status={CellStatus.AliveOld} onClick={() => console.log('click')}  />)
            .toJSON();
        expect(cellContainer).toMatchSnapshot();
    });

    it('Dead cell snapshot', () => {
        const cellContainer = renderer
            .create(<CellComponentClasses id={1} status={CellStatus.Dead} onClick={() => console.log('click')} />)
            .toJSON();
        expect(cellContainer).toMatchSnapshot();
    });

});
