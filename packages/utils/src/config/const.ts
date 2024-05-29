const accountJson = process.env.GOOGLE_SERVICE_ACCOUNT!;

export const getGoogleServiceAccount = () => {
  try {
    const acc = JSON.parse(accountJson);
    const private_key = acc.private_key.split(String.raw`\n`).join('\n');
    return { ...acc, private_key: private_key };
  } catch (e) {
    console.error(e);
    return undefined;
  }
};
