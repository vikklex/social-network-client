const extractError = (err) => {
  return err?.response?.data?.error || err?.msg || err;
};

export default extractError;
