import SignUp from './components/Signup.js';
import NavBar from './components/NavBar.js';
import SignOut from './components/SignOut.js';
import NextComp from './components/homepage/NextComp.js'
function App() {
  return (
    <div className="App">
      <NavBar/>
      <div id='homeTitle'>
        <h1>Pickem compotions</h1>
      </div>
      <SignUp/>
      <SignOut/>
      <NextComp/>
    </div>
  );
}

export default App;
