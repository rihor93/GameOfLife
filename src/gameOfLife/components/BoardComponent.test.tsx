import { render, screen } from '@testing-library/react';
import { BoardComponent } from './BoardComponent';

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