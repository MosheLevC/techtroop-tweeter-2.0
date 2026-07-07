import { useState } from "react";
import "./App.css";
import TweetField from "./components/TweetField";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="container">
      <TweetField />
    </div>
  );
}

export default App;
