"use client";

import { useState, useEffect } from "react";

function CreditUsage({ remains, max }: { remains: number; max: number }) {

  const [_remains, setRemains] = useState(remains);

  useEffect(() => {
    // Listen for credit usage updates
    const handleCreditUpdate = () => {
     return setRemains((prev) => prev > 0 ? prev - 1 : 0);
    };

    window.addEventListener("quickcv:decrementCredit" as any, handleCreditUpdate);

    return () => {
      window.removeEventListener("quickcv:decrementCredit" as any, handleCreditUpdate);
    };
  }, []);

  return (
    <div className="">
      {_remains}/{max}
    </div>
  );
}


export default CreditUsage;