import logo from './logo.svg';
import './App.css';
import Button from 'react-bootstrap/Button';
import {Home} from './components/Home';
import {Department} from './components/Department';
import {Employee} from './components/Employee';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import {Navigation} from './components/Navigation';


function App() {
  return (
    <BrowserRouter>
      <h3 className="m-3 d-flex justify-content-center">Company Portal</h3>
      <h5 className="m-3 d-flex justify-content-center">with ReactJS</h5>
      <Navigation />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/department" exact component={Department} />
        <Route path="/employee" exact component={Employee} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
