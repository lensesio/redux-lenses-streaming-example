import { createTypes } from 'reduxsauce';

export const Type = createTypes(`
  UPDATE_HOST
  UPDATE_USER
  UPDATE_PASSWORD
  CLEAR_MESSAGES
  SHOW_ROW_DETAILS
`);

const updateHost = (payload) => ({ type: Type.UPDATE_HOST, payload });
const updateUser = (payload) => ({ type: Type.UPDATE_USER, payload });
const updatePassword = (payload) => ({ type: Type.UPDATE_PASSWORD, payload });
const clearMessages = () => ({ type: Type.CLEAR_MESSAGES });
const showRowDetails = (payload) => ({ type: Type.SHOW_ROW_DETAILS, payload });

export const Action = {
  updateHost,
  updateUser,
  updatePassword,
  clearMessages,
  showRowDetails
}
