import React from 'react'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import LoginComponent from '../views/login'
import registerComponent from '../views/register'
import errorComponent from '../views/error'
import BlogIndexComponent from '../views/blogIndex'

export default class IndexRouter extends React.Component{
  render(){
    return(
      <Router>
        <Switch>
          <Route exact path={"/"} component={BlogIndexComponent} />
          <Route path={"/login"} component={LoginComponent} />
          <Route path={"/register"} component={registerComponent} />
          <Route  component={errorComponent}/>
        </Switch>
      </Router>
    )
  }
}