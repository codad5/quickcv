"use client";

import { APPToRemember, isRemembered, updateRememberMe } from "@/helpers/commons/client";
import { useState, useEffect } from "react";

function RememberMe({
  app_name,
}: {
  app_name: keyof APPToRemember;
}) {
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    if (isRemembered(app_name)) {
      setRememberMe(true);
    }
  }, []);

  useEffect(() => {
    updateRememberMe({ [app_name]: rememberMe });
  }, [rememberMe]);


  return (
    <div className="flex items-center justify-center">
      <input
        type="checkbox"
        checked={rememberMe}
        onChange={(e) => setRememberMe(e.target.checked)}
      />
      <label className="ml-2">Remember me</label>
    </div>
  );
}


export default RememberMe;