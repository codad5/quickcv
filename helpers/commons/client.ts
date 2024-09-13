export const updateCreditUsage = (remainingCredits: number) => {
  const event = new CustomEvent('quickcv:creditUpdate', { detail: { remains: remainingCredits } });
  window.dispatchEvent(event);
};

export const decrementCreditEvent = () => {
  const event = new CustomEvent('quickcv:decrementCredit');
  window.dispatchEvent(event);
}