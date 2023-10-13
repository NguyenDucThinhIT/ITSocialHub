import { Suspense } from "react"
import Loading from "./components/Loading/Loading.jsx";
import useRouteElements from "./useRouteElements.jsx";


function App() {
  const routeElements = useRouteElements();
  return (
    <div className="App">
       
      <Suspense fallback={Loading}>{routeElements}</Suspense> 
     
    </div>

  );
}

export default App;
