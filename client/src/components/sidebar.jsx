import  { useState } from 'react'
import { ChevronLeft, ChevronRight, Home, BookImage, LogOut  } from 'lucide-react'
import { useNavigate } from 'react-router-dom'


// eslint-disable-next-line react/prop-types
export function Sidebar({setActive}) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const navigate = useNavigate();


  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed)
  }
  const onLogout = () =>{
    localStorage.removeItem("token");
    navigate('/auth')
  }


  return (
    <div className={`bg-white border-r border-gray-200 h-screen transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'}`}>
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-4">
          <h1 className={`text-xl font-bold ${isCollapsed ? 'hidden' : 'block'}`}>My App</h1>
          <button
            onClick={toggleSidebar}
            className="p-1 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? <ChevronRight size={24} /> : <ChevronLeft size={24} />}
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto">
            <div className="mb-4">
              <ul>
                  <li>
                    <div
                      className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-blue-600 cursor-pointer"
                      onClick={()=>setActive('dashboard')}
                    >
                      <Home size={20} className="mr-3"  />
                      {!isCollapsed && <span>Dashboard</span>}
                    </div>
                  </li>
                  <li>
                    <div
                      className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-blue-600 cursor-pointer"
                      onClick={()=>setActive('purchases')}
                    >
                      <BookImage size={20} className="mr-3" />
                      {!isCollapsed && <span>Purchases</span>}
                    </div>
                  </li>
                  <li>
                    <div
                      className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-blue-600 cursor-pointer"
                      onClick={onLogout}
                    >
                      <LogOut size={20} className="mr-3" />
                      {!isCollapsed && <span>Logout</span>}
                    </div>
                  </li>
              </ul>
            </div>
        </nav>
      </div>
    </div>
  )
}

