import React from "react";
import "./App.css";
import { NavBar } from "./components/NavBar";
import { ErrorTable } from "./components/ErrorTable";

function App() {
  return (
    <div className="App">
      <NavBar />
      <header className="App-header">
        <ErrorTable />
      </header>
    </div>
  );
}

export default App;
