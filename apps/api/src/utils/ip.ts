export const getIpAddress = async () => {
  try {
    const res = await fetch('http://api.ipify.org').then(async (response) => await response.text());
    return res;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};
