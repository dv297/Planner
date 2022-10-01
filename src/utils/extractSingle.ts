const extractSingle = (value: string | string[] | undefined) => {
  if (!value) {
    return value;
  }

  return Array.isArray(value) ? value[0] : value;
};

export default extractSingle;
