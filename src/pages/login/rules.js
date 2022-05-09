export const email_rules = [
  {
    type: 'email',
    required: true,
    message: 'Please input your email!',
  },
];

export const password_rules = [
  {
    required: true,
    min: 6,
    max: 32,
    whitespace: false,
    message: 'Please input your password!',
  },
];
