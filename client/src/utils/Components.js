import { useContext } from 'react';
import { MessagesContext } from 'utils/Context';

export function Messages() {
  const { message } = useContext(MessagesContext);

  if (message) {
    return (
      <Error message={message} className="message">{message}</Error>
    );
  }
}

export function Error({ message, className = 'error' }) {
  if (message) {
    return (
      <div className={className}>{message}</div>
    );
  }
}
