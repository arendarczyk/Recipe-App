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
          <Route path='/Recipe-App' exact component={MainContent} />
          <Route path='/Recipe-App/showRecipe' exact component={GetRecipes} />
          <Route path='/Recipe-App/showRecipe/:id' component={GetRecipes} />
        </Switch>
      </Router>      
    </div>
  );
}

export default App;
