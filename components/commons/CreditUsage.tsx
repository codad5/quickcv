"use client";

import { useState, useEffect } from "react";

function CreditUsage({ remains, max }: { remains: number; max: number }) {

  const [_remains, setRemains] = useState(remains);

  useEffect(() => {
    // Listen for credit usage updates
    const handleCreditUpdate = () => {
     return setRemains((prev) => prev - 1);
    };

    window.addEventListener("quickcv:decrementCredit" as any, handleCreditUpdate);

    return () => {
      window.removeEventListener("quickcv:decrementCredit" as any, handleCreditUpdate);
    };
  }, []);

  return (
    <div className="p-2 px-4">
      Credit Count : {_remains}/{max}
    </div>
  );
}


export default CreditUsage;