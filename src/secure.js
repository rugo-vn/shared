import CryptoJS from 'crypto-js';
import Bcrypt from 'bcryptjs';

const SALT = 10;

export const encrypt = function (plainText, key) {
  return CryptoJS.AES.encrypt(plainText, key).toString();
};

export const decrypt = function (cipherText, key) {
  return CryptoJS.AES.decrypt(cipherText, key).toString(CryptoJS.enc.Utf8);
};

export const hash = function (payload) {
  return CryptoJS.SHA256(payload);
};

export const hashPassword = function (pass) {
  return Bcrypt.hashSync(pass, SALT);
};

export const comparePassword = function (password, hash) {
  return Bcrypt.compareSync(password, hash);
};

export function Secure(globalKey) {
  this.globalKey = globalKey;
}

Secure.prototype.encrypt = encrypt;
Secure.prototype.decrypt = decrypt;
Secure.prototype.hash = hash;
Secure.prototype.hashPassword = hashPassword;
Secure.prototype.comparePassword = comparePassword;

Secure.encrypt = encrypt;
Secure.decrypt = decrypt;
Secure.hash = hash;
Secure.hashPassword = hashPassword;
Secure.comparePassword = comparePassword;
