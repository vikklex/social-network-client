export const Alert_Types = {
  ALERT: 'ALERT_ALERT',
};

export const DeleteData = (data, id) => {
  const newData = data.filter((item) => item.id !== id);
  return newData;
};
