import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

export default function VideoCall() {
  const { roomID } = useParams();
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const appID = 559595722;
    const serverSecret = "3b9f74214fc1359e2f3dd7eefd8f8c08";

    // ✅ Get logged-in user from localStorage / context
    const user = JSON.parse(localStorage.getItem("user"));

    const userID = user?.id || Date.now().toString();
    const userName = user?.name || "Farhan";

    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomID,
      userID,
      userName
    );

    const zp = ZegoUIKitPrebuilt.create(kitToken);

    zp.joinRoom({
      container: containerRef.current,
      scenario: {
        mode: ZegoUIKitPrebuilt.OneONoneCall,
      },
    });
  }, [roomID]);

  return (
    <div
      ref={containerRef}
     className="fixed inset-0 w-screen h-[100dvh] bg-black"
    />
  );
}