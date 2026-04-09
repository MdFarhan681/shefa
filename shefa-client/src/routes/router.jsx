


import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";
import DoctorDetailsPage from "../pages/Doctor/DoctorDetails/DoctorDetails";
import AllDoctors from "../pages/Doctor/AllDoctors/AllDoctors";
import Services from "../pages/Services/Services";
import MedicineShop from "../pages/Services/Pharmacy/Pharmacy";
import Pharmacy from "../pages/Services/Pharmacy/Pharmacy";

 export const router = createBrowserRouter([
  {
    path: "/",
  Component:RootLayout,
  children:[
    {
        index:true,
        Component:Home
    }, {
       path: "doctors", 
       Component: AllDoctors
      },
    {
       path: "/doctors/:id", 
       Component: DoctorDetailsPage 
      },
    {
       path: "/services", 
       Component: Services,
      },
      {
        path:"/services/pharmacy",
        Component: Pharmacy
      }
]},{

  path:"/",
  Component:AuthLayout,
  children:[
    {
      path:"/login",
      Component:Login
    },{
      path:"/register",
      Component:Register
    }
  ]
}


]);