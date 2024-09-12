async function CreditUsage({ remains, max }: { remains: number; max: number }) {
  return (
    <div className="p-2 px-4">
      Credit Count : {remains}/{max}
    </div>
  );
}


export default CreditUsage;