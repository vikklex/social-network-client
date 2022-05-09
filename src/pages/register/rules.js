export const validate_messages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
};

export const name_rules = [
  {
    min: 3,
    max: 12,
    whitespace: false,
    required: true,
    message: 'Name should be at least 3 characters',
  },
];

export const surname_rules = [
  {
    min: 3,
    max: 18,
    whitespace: false,
    required: true,
    message: 'Surname should be at least 3 characters',
  },
];

export const email_rules = [
  {
    required: true,
    type: 'email',
    message: 'The input is not valid E-mail!',
  },
  {
    required: true,
    message: 'Please input your E-mail!',
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

export const password_confirm_rules = [
  {
    required: true,
    message: 'Please confirm your password!',
  },
  ({ getFieldValue }) => ({
    validator(_, value) {
      if (!value || getFieldValue('password_hash') === value) {
        return Promise.resolve();
      }

      return Promise.reject(
        new Error('The two passwords that you entered do not match!'),
      );
    },
  }),
];
