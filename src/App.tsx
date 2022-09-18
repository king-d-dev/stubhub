import { useState } from "react";
import "./App.css";
import { EventsPage } from "./pages/events";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="app">
      <EventsPage />
    </div>
  );
}

export default App;
