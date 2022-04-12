import { message } from 'antd';

class Messages {
  onSuccess = (msg) => {
    message.success(`Message: You are successfully ${msg}`);
  };
  onError = (msg) => {
    if (msg === 'login') {
      message.error('You are input not correct email or password');
    } else {
      message.error(
        'You should  try another email or try to sign in into you account with the same email ',
      );
    }
  };
}

export default new Messages();
