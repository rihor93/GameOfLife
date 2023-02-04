import { fireEvent, render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import userEvent from '@testing-library/user-event';
import LoginComponent from './LoginComponent';

describe('LoginComponent tests', () => {
    it('show id on screen', () => {

        render(<LoginComponent onClick={(name: string) => { console.log(name) }} />);
        const element = screen.getAllByTestId('loginInput');

        expect(element).toHaveLength(1);
    });



});

describe('LoginComponent SnapshotTest', () => {
    /*render(<LoginComponent onClick={(name: string) => { console.log(name) }} />);
    const element = screen.getAllByTestId('loginInput');
    expect(element).toHaveLength(1);
    fireEvent.change(element[0], {target: {value: 'user'}})*/

    it('snapshottest', () => {
        const cellContainer = renderer
            .create(<LoginComponent onClick={()=> {}} />)
            .toJSON();
        expect(cellContainer).toMatchSnapshot();
    });




});
