import { act, getByTestId, render, screen, waitFor } from '@testing-library/react';

import userEvent from '@testing-library/user-event';
import ControlComponent from './ControlComponent';
import renderer from 'react-test-renderer';

describe('ControlComponent tests', () => {
    it('show id on screen', async () => {
        /*await act(async()=>{
        
        })*/

        const { getByTestId } = render(<ControlComponent />);
        let btnStart = getByTestId('btnStart')
        await userEvent.click(btnStart);

        const counter = await waitFor(() => getByTestId('HeadComponent'))
        expect(counter).toBeInTheDocument();

    });



});

describe('ControlComponent Snapshottest', () => {
    it('snapshottest', () => {
        const cellContainer = renderer
            .create(<ControlComponent />)
            .toJSON();
        expect(cellContainer).toMatchSnapshot();
    });





});
