import React from 'react';
import { getByTestId, render, screen } from '@testing-library/react';
import { ControlComponentClasses } from './ControlComponentClasses';
import userEvent from '@testing-library/user-event';
describe('Test mount', () => {
    test('click mount button', async () => {
        const { getByTestId, container } = render(<ControlComponentClasses />);
        let cellComponent = getByTestId('mountbutton')
        await userEvent.click(cellComponent);
        const boardComponent = screen.getAllByTestId('boardcomponent');
        expect(boardComponent).toHaveLength(1);
    });

    test('before click mount button', async () => {
        const { queryByTestId } = render(<ControlComponentClasses />);
        expect(queryByTestId(/boardcomponent/)).toBeNull();
    });
})
