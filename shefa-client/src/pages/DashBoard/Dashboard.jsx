import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Loading from "../../components/Loading/Loading";
import useAuth from "../../hooks/useAuth";

const Dashboard = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === "doctor") {
      navigate("/dashboard/doctor");
    } else if (user?.role === "patient") {
      navigate("/dashboard/patient");
    }
  }, [user, navigate]);

  if (loading) return <Loading />;
  if (!user) return <div>Please login</div>;

  return <Loading />; // temporary while redirecting
};

export default Dashboard;