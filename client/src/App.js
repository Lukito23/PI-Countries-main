import './App.css';
import { Route } from 'react-router-dom';
import Landing from './components/Landing';
import Home from './components/Home';
import ActivityCreate from './components/CreateActivity';
import Detail from './components/Detail';


function App() {
  return (
    <div className="App">
      <Route exact path='/' component={Landing} />
      <Route exact path='/home' component={Home} />
      <Route path='/home/:id' render={({match}) => <Detail country={match.params.id} />}></Route>
      <Route path='/activity' component={ActivityCreate}/>
    </div>
  );
}

export default App;
