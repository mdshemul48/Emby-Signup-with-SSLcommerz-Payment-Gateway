import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Signup from "./signup/pages/Signup";
import Created from "./signup/pages/Created";
import "./App.css";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Signup />
        </Route>
        <Route path="/successful" exact>
          <Created />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
