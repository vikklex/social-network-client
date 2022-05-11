export const title_rules = [
  {
    min: 2,
    max: 25,
    whitespace: false,
    required: true,
    message: 'Title should be at least 3 characters',
  },
];

export const description_rules = [
  {
    min: 2,
    max: 50,
    whitespace: false,
    required: true,
    message: 'Description should be at least 7 characters',
  },
];

export const choice_rules = [
  {
    required: true,
    message: 'You should make a choice',
  },
];
