import React from 'react'
import MetaDecorator from './components/MetaDecorator'
import MainContent from './components/MainContent'
import GetRecipes from './components/GetRecipes'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

function App() {
  return (
    <div>
      <MetaDecorator title='Magic Recipes' description='sample description'/>
      <Router>
        <Switch>
          <Route path='/' exact component={MainContent} />
          <Route path='/showRecipe' exact component={GetRecipes} />
          <Route path='/showRecipe/:id' component={GetRecipes} />
        </Switch>
      </Router>      
    </div>
  );
}

export default App;
