import './App.css';
import ControlComponent from './gameOfLife2/ControlComponent';
import { Navigation } from './Navigation/Navigation';
import { TokenProvider } from './TokenProvider';


function App() {
  return (
    <TokenProvider>
      {/*<div className="App">
        <ControlComponent />
  </div>*/}
      <Navigation>
      </Navigation>
    </TokenProvider>
  );
}

export default App;
