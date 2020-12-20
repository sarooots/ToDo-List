import React from 'react'
import ShowMembers from "./components/ShowMembers";
import Counter from "./components/Counter";
import './App.css';

function App() {

  return (
    <div className="App">
        {/*<ShowMembers/>*/}
        <Counter
            defaultValue={0}
        />
    </div>
  );
}

export default App;
