import { Secret, GetPublicKeyOrSecret } from 'jsonwebtoken';
import crypto from 'crypto';

const algorithm = 'aes-192-cbc';

function encrypt(key: Secret, data: string) {
  const salt = crypto.scryptSync(JSON.stringify(key), 'salt', 24);
  const iv = Buffer.alloc(16, 0);
  const cipher = crypto.createCipheriv(algorithm, salt, iv);
  let crypted = cipher.update(data, 'utf8', 'hex');
  crypted += cipher.final('hex');
  return crypted;
}
function decrypt(key: Secret | GetPublicKeyOrSecret, data: string) {
  const salt = crypto.scryptSync(JSON.stringify(key), 'salt', 24);
  const iv = Buffer.alloc(16, 0);
  const decipher = crypto.createDecipheriv(algorithm, salt, iv);
  let decrypted;
  try {
    decrypted = decipher.update(data, 'hex', 'utf8');
  } catch (e) {
    return data;
  }
  decrypted += decipher.final('utf8');
  return decrypted;
}

export { encrypt, decrypt };
