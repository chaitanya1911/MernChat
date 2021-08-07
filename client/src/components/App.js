import React,{useState} from 'react'
import Login from './Login'
import Dashboard from './Dashboard';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  
  return (
    
   // {id ? dashboard:  <Login onIdSubmit={setId}/>}
    
    <Router>
    <div className="App">
      <Switch>
      <Route path='/' exact component={Login}/>
      <Route path='/dashboard/:id' render={(props) => <Dashboard props={props} />} />
      </Switch>
    </div>
    </Router>
  
  )

}

export default App;
