import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./Components/Home";
import AssetState from "./Context/AssetState";


function App() {
  return (
    <div className="App">
      <AssetState>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
        </Routes>
      </Router>
      </AssetState>
      
    </div>
  );
}

export default App;
