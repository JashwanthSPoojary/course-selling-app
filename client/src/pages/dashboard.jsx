import axios from "axios";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [data,setData] = useState([]);
  const [enroll,setEnroll] = useState([]);

  useEffect(() => {
    const allCourses = async () => {
      try {
        const token = localStorage.getItem("token");
        const rescourse = await axios.get("http://localhost:3000/course/preview");
        const respurchase = await axios.get("http://localhost:3000/user/purchases",{
          headers:{
            token
          }
        });
        const course = rescourse.data.data;
        const purchase = respurchase.data.data.map((data)=>data.courseId)        
        setData(course);
        setEnroll(purchase)
      } catch (error) {
        console.log(error);
      }
    };
    allCourses();
  }, []);
  

  const onEnroll =  async (courseId) => {
    try {
      const token = localStorage.getItem("token")
      
      const respurchase = await axios.get("http://localhost:3000/user/purchases",{
        headers:{
          token
        }
      });
      const purchase = respurchase.data.data;
      const value = purchase.some(item=>item.userId===respurchase.data.userId && item.courseId===courseId);      
            
      if(!value){
        await axios.post("http://localhost:3000/course/purchase",{
          courseId
        },{
          headers:{
            token
          }
        })
        setEnroll(prev=>[...prev,courseId])
      }     
    } catch (error) {
      console.log("error is "+error);
      
    }
  }

  return (
    <main className="flex-1 overflow-auto">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-semibold text-gray-900">
            Course Dashboard
          </h1>
        </div>
      </header>
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="bg-white shadow sm:rounded-lg p-6">
          <h2 className="text-xl font-medium text-gray-900 mb-4">
            Available Courses
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.map((data, index) => {
              return (
                <div
                  className="border rounded-lg shadow-sm overflow-hidden"
                  key={index}
                >
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {data.title}
                    </h3>
                  </div>
                  <div className="px-4 py-3 bg-gray-50">
                    <p className="text-sm text-gray-500">
                      {data.description}
                    </p>
                  </div>
                  <div className="px-4 py-3 bg-gray-50 border-t">
                    <button onClick={()=>onEnroll(data._id)} className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200">
                      {
                        enroll.some(enroll=>enroll==data._id)===true?"Enrolled":"Enroll"
                        
                      }
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
