import { useState } from "react";
import { Sidebar } from "../components/sidebar";
import Dashboard from "./dashboard";
import Purchases from "./purchases";

const Home = () => {
  const [active,setActive] = useState('dashboard');
  return (
    <>
      <div className="flex h-screen bg-gray-100">
            <Sidebar  setActive={setActive}/>
            {active==="dashboard"?<Dashboard/>:<Purchases/>}
      </div>
    </>
  );
};

export default Home;
