import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";


// eslint-disable-next-line react/prop-types
const PrivateRoute = ({children}) => {

    const [auth,setAuth] = useState(null);

    useEffect(()=>{
      const token = localStorage.getItem("token");
      setAuth(!!token)
    },[]);

    if (auth === null) {
        return <div>Loading...</div>; // Show a loading message while checking the token
    }

    return auth?children:<Navigate to='/auth'/>;
}

export default PrivateRoute;