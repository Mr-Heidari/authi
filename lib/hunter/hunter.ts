export async function emailVerificator(email: string) {
  try {
    const emailIsValid = await fetch(
      `https://api.hunter.io/v2/email-verifier?email=${email}&api_key=66d51c716af190b6b57ea04fc81c3db8a3983b04`
    )
      .then((data) => data.json())
      .then((json) => {
        return json;
      });
    return emailIsValid;
  } catch (error){
    return error;
  }
}
