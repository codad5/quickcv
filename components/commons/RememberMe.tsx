"use client";

import { APPToRemember, isRemembered, updateRememberMe } from "@/helpers/commons/client";
import { ToggleOffCircle, ToggleOnCircle } from "iconsax-react";
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
      <button onClick={() => setRememberMe(!rememberMe)}>
        {rememberMe ? (
          <ToggleOnCircle color="green" size="32" />
        ) : (
          <ToggleOffCircle color="red" size="32" />
        )}
      </button>
      <label className="ml-2">Remember me</label>
    </div>
  );
}


export default RememberMe;