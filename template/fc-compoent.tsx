import { useState } from "react";
import './App.css';

function App() {
  const [count, handleCount] = useState(0);
  return (
    <div className="App">
      <button onClick={() => handleCount(count + 1)}>add+1</button>
    </div>
  );
}

export default App;
