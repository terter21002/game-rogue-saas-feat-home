export const convertIntoFormData = (data: Record<string, any>): FormData => {
  const formData = new FormData();
  Object.keys(data).forEach((key) => {
    const val = data[key];
    if (val instanceof Object) {
      formData.append(key, JSON.stringify(val));
    } else {
      formData.append(key, val);
    }
  });
  return formData;
};
