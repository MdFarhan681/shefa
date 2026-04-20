import { useEffect } from "react";

const useBotpress = () => {
  useEffect(() => {
    // Prevent duplicate loading
    if (document.getElementById("botpress-webchat")) return;

    // 1. Load Botpress main script
    const script = document.createElement("script");
    script.src = "https://cdn.botpress.cloud/webchat/v3.6/shareable.html?configUrl=https://files.bpcontent.cloud/2026/04/18/05/20260418052055-SX9F3WP2.json";
    script.async = true;
    script.id = "botpress-webchat";

    script.onload = () => {
      // 2. Load your bot config AFTER script loads
      const configScript = document.createElement("script");
      configScript.src =
        "https://files.bpcontent.cloud/2026/04/18/05/20260418052055-A31VY1Y7.js";
      configScript.async = true;

      document.body.appendChild(configScript);
    };

    document.body.appendChild(script);
  }, []);
};

export default useBotpress;