import type { SingleValue } from 'react-select';
import Search from './components/search'

function App() {
  const handleOnSearchChange = (searchData: SingleValue<string>) => {
    console.log("Search value changed:", searchData);
  }

  return (
    <div className='container'>
      <header className='header'>
        <a className='logo' href='/'>Weather forecast</a>
        <Search onSearchChange={handleOnSearchChange}/>
      </header>
      
    </div>
  )
}

export default App
