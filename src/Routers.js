import {
    Routes,
    Route
  } from "react-router-dom";
  import Navigation from "./component/navigation/Navigation";
  import OverViewPage from "./component/pages/OverViewPage";
  import Recommend from "./component/pages/Recommend";
  import Result from "./component/pages/Result";
  import Question from "./component/pages/Question";
  import AnalysisPage from "./component/pages/AnalysisPage";
  import StaticsPage from "./component/pages/StaticsPage";
  
  function Routers() {
    return (
        <>
            <Navigation/>
            <Routes>
                <Route path={"/overview"} element={<OverViewPage/>}></Route>
                <Route path={"/analysis"} element={<AnalysisPage/>}></Route>
                <Route path={"/statics"} element={<StaticsPage/>}></Route>
                <Route path={"/recommend"} element={<Recommend/>}></Route>
                <Route path={"/question"} element={<Question/>}></Route>
                <Route path={"/result"} element={<Result/>}></Route>
            </Routes>
        </>
    );
  }
  
  export default Routers;
  