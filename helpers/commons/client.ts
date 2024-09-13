import { BasicResumeInfo } from "@/app/actions";

export const updateCreditUsage = (remainingCredits: number) => {
  const event = new CustomEvent('quickcv:creditUpdate', { detail: { remains: remainingCredits } });
  window.dispatchEvent(event);
};

export const decrementCreditEvent = () => {
  const event = new CustomEvent('quickcv:decrementCredit');
  window.dispatchEvent(event);
}

export type APPToRemember = {
  resumeInfo?: boolean;
}
// event to update remember me
export const updateRememberMe = (data: APPToRemember) => {
  const event = new CustomEvent('quickcv:rememberMe', { detail: data });
  window.dispatchEvent(event);
};

export const RememberInfo = <T>(key: keyof APPToRemember, data: T) => {
  localStorage.setItem(`quickcv:${key}`, JSON.stringify(data));
}