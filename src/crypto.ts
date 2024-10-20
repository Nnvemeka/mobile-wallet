import CryptoJS from "crypto-js";

// Encrypt data
export const encryptData = (value: any) => {
  const encryptedData = CryptoJS.AES.encrypt(
    JSON.stringify(value),
    "secret_key"
  ).toString();

  return encryptedData;
};

// Decrypt data
export const decryptExistingData = (encryptedData: string) => {
  const bytes = CryptoJS.AES.decrypt(encryptedData, "secret_key");
  const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
  return JSON.parse(decryptedData);
};

// Find the matching user
export const findMatchingUser = (
  encryptedUsers: string[],
  formData: {
    phone?: string;
    email?: string;
    username: string;
    password: string;
  }
) => {
  for (let encryptedUser of encryptedUsers) {
    const decryptedUser = decryptExistingData(encryptedUser);

    if (
      decryptedUser.username === formData.username ||
      decryptedUser.email === formData.email ||
      decryptedUser.phone === formData.phone
    ) {
      return decryptedUser;
    }
  }
  return null;
};
