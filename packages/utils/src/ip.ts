export const getIpAddress = async (): Promise<string | undefined> => {
  try {
    const res = await fetch('http://api.ipify.org').then(async (response) => response.text());
    return res;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return undefined;
  }
};
