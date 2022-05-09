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

export const city_rules = [
  {
    min: 3,
    max: 12,
    whitespace: false,
    message: 'City name should be at least 3 characters',
  },
];

export const job_rules = [
  {
    min: 3,
    max: 12,
    whitespace: false,
    message: 'Job description should be at least 3 characters',
  },
];
