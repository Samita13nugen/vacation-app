import "./App.css";
import { Routes, Route } from "react-router-dom";
import { routes} from "./routes/routes"


function App() {
  return (
    <div className="App">
      <Routes>
        {routes?.map((item, index) => {
          return (
            <Route
              path={item.path}
              element={item.element}
              key={index + "route"}
            />
          );
        })}
      </Routes>
    </div>
  );
}

export default App;
