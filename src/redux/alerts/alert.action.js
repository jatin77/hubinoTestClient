import { alertActionTypes } from "./alert.actionType";

export const showAlert = (alert) => {
  return {
    type: alertActionTypes.SHOW_ALERT,
    payload: alert,
  };
};
