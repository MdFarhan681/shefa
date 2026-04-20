import { useEffect, useState } from "react";
import { ref, onValue, update } from "firebase/database";
import { db } from "../../../firebase/firebase.init";
import IncomingCall from "../../../components/IncomingCall/IncomingCall.jsx";

export default function DoctorDashboard() {
  const [call, setCall] = useState(null);
  const doctorId = "doctor123"; // dynamic later

  useEffect(() => {
    const callRef = ref(db, `calls/${doctorId}`);

    onValue(callRef, (snapshot) => {
      const data = snapshot.val();
      if (data?.status === "calling") {
        setCall(data);
      }
    });
  }, []);

  const acceptCall = () => {
    update(ref(db, `calls/${doctorId}`), {
      status: "accepted",
    });

    window.open(`/video/${call.roomID}`, "_blank");
    setCall(null);
  };

  const rejectCall = () => {
    update(ref(db, `calls/${doctorId}`), {
      status: "rejected",
    });

    setCall(null);
  };

  return (
    <>
      <h1>Doctor Dashboard dekso</h1>
      {call && (
        <IncomingCall
          call={call}
          onAccept={acceptCall}
          onReject={rejectCall}
        />
      )}
    </>
  );
}