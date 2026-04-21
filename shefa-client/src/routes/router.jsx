import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";
import DoctorDetailsPage from "../pages/Doctor/DoctorDetails/DoctorDetails";
import AllDoctors from "../pages/Doctor/AllDoctors/AllDoctors";
import Services from "../pages/Services/Services";

import Pharmacy from "../pages/Services/Pharmacy/Pharmacy";
import PatientDashBoard from "../pages/DashBoard/PatientDashBoard/PatientDashBoard";
import Dashboard from "../pages/DashBoard/Dashboard";
import DashBoard from "../layouts/DashBoardLayout";
import PatientDashboard from "../pages/DashBoard/PatientDashBoard/PatientDashBoard";
import DashBoardLayout from "../layouts/DashBoardLayout";
import DoctorDashBoard from "../pages/DashBoard/DoctorDashboard/DoctorDashBoard";
import AmbulanceCard from "../pages/Services/Ambulance/AmbulanceCard";
import DeliveryForm from "../pages/Services/Delivery/DeliveryForm";

import Diagnostics from "../pages/Services/Diagnostics/Diagnostics";
import VideoCall from "../pages/Services/VedioCall/VedioCall";
import PatientDashboardLayout from "../layouts/PatientDashboardLayout";
import Overview from "../pages/DashBoard/PatientDashBoard/DashPages/Overview";
import DashConsultation from "../pages/DashBoard/PatientDashBoard/DashPages/DashConsultation";
import Prescriptions from "../pages/DashBoard/PatientDashBoard/DashPages/Prescriptions";
import Payment from "../pages/DashBoard/PatientDashBoard/DashPages/Payment";
import Settings from "../pages/DashBoard/PatientDashBoard/DashPages/Settings";
import Reports from "../pages/DashBoard/PatientDashBoard/DashPages/Reports";
import MedicalHistory from "../pages/DashBoard/PatientDashBoard/DashPages/MedicalHistory";
import MedicineChecker from "../pages/Services/MedicineChecker/MedicineChecker";
import FatherDashboard from "../pages/DashBoard/FatherDashboard/FatherDashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: Home },
      { path: "doctors", Component: AllDoctors },
      { path: "doctors/:id", Component: DoctorDetailsPage },
      { path: "call/:roomID", Component: VideoCall },
      { path: "medicine-checker", Component: MedicineChecker },

      { path: "services", Component: Services },
      { path: "services/ambulance", Component: AmbulanceCard },
      { path: "services/medicine-delivery", Component: DeliveryForm },
      { path: "services/pharmacy", Component: Pharmacy },
      { path: "services/diagnostic-centers", Component: Diagnostics },
    ],
  },

  {
    path: "/",
    Component: AuthLayout,
    children: [
      { path: "login", Component: Login },
      { path: "register", Component: Register },
    ],
  },

  {
    path: "/dashboard",
    element: <DashBoardLayout />,
    children: [
      { index: true, element: <Dashboard /> },

      {
        path: "patient",
        element: <PatientDashboardLayout />,
        children: [
          { index: true, element: <Overview /> },
          { path: "overview", element: <Overview /> },
          { path: "consultation", element: <DashConsultation /> },
          { path: "prescriptions", element: <Prescriptions /> },
          { path: "reports", element: <Reports /> },
          { path: "payment", element: <Payment /> },
          { path: "history", element: <MedicalHistory /> },
          { path: "settings", element: <Settings /> },
          { path: "father", element: <FatherDashboard /> },
        ],
      },


      { path: "doctor", element: <DoctorDashBoard /> },
    ],
  },
]);