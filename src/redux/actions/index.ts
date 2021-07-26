import { Message } from "../config/state";

export const updateHost = (payload: string) => ({
  type: 'UPDATE_HOST',
  payload
}) as const;

export const updateUser = (payload: string) => ({
  type: 'UPDATE_USER',
  payload
}) as const;

export const updatePassword = (payload: string) => ({
  type: 'UPDATE_PASSWORD',
  payload
}) as const;

export const clearMessages = () => ({
  type: 'CLEAR_MESSAGES'
}) as const;

export const showRowDetails = (payload: Message) => ({
  type: 'SHOW_ROW_DETAILS',
  payload
}) as const;

export const messageReceived = (payload: Message) => ({
  type: 'MESSAGE_RECEIVED',
  payload
}) as const

export const actions = {
  updateHost,
  updateUser,
  updatePassword,
  clearMessages,
  showRowDetails,
  messageReceived
};

export type Action = ReturnType<typeof actions[keyof typeof actions]>