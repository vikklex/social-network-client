export const editDataChecker = (values, authUser) => {
  const dataChecker = {
    first_name: values.user.first_name || authUser.first_name,
    last_name: values.user.last_name || authUser.last_name,
    email: values.user.email || authUser.email,
    password_hash: values.user.password_hash || authUser.password_hash,
    job: values.user.job || authUser.job || '',
    birthday:
      new Date(values.user.birthday.utc(true).toDate()).toLocaleString([], {
        dateStyle: 'short',
      }) ||
      authUser.birthday ||
      '',
    desc: values.user.desc || authUser.desc || '',
    gender: values.user.gender || authUser.gender || '',
    relationships: values.user.relationships || authUser.relationships || '',
    city: values.user.city || authUser.city || '',
    from: values.user.from || authUser.from || '',
  };

  return dataChecker;
};
