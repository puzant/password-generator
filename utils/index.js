export const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const generatePronouncablePassword = (length) => {
  const consonants = "bcdfghjklmnpqrstvwxyz";
  const vowels = "aeiou";

  let password = "";
  let useVowel = getRandomInt(0, 1) === 1;

  for (let i = 0; i < length; i++) {
    if (useVowel) {
      password += vowels.charAt(getRandomInt(0, 4));
    } else {
      password += consonants.charAt(getRandomInt(0, 20));
    }
    useVowel = !useVowel;
  }

  return password;
};
