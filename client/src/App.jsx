import Auth from "./pages/auth";
import { Routes , Route  } from 'react-router-dom'
import Home from "./pages/home";
import Purchases from "./pages/purchases";
import PrivateRoute from "./components/PrivateRoute";



const App = () => {

  return (
  <>

  <Routes>
    <Route path="/" element={<PrivateRoute><Home/></PrivateRoute>}/>
    <Route path="/auth" element={<Auth/>}/>
    <Route path="/purchases" element={<PrivateRoute><Purchases/></PrivateRoute>}/>
  </Routes>
  </>
    
   );
}
 
export default App;