import GetRecipes from './GetRecipes'
import MetaDecorator from './MetaDecorator'
import MainContent from './MainContent';
import Header from './Header'


function App() {
  return(
    <div>
      <MetaDecorator title='Magic Recipes' description='sample description'/>
      <Header />
      <MainContent />
      <GetRecipes />         
    </div>
  );
}

export default App;
