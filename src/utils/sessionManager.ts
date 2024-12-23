import { v4 as uuidv4 } from 'uuid';

export const getOrCreateSessionId = () => {
  let sessionId = localStorage.getItem('anonymous_session_id');
  if (!sessionId) {
    sessionId = uuidv4();
    localStorage.setItem('anonymous_session_id', sessionId);
  }
  return sessionId;
};