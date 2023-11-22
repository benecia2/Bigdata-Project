import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import MainPage from "./component/pages/MainPage";
import Routers from './Routers'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage/>} />
        <Route path="/*" element={<Routers />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
