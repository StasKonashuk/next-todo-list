import bcrypt from 'bcryptjs';
import jwt, { JwtPayload, Secret, SignOptions } from 'jsonwebtoken';
import { TOKEN_SECURITY_EXPIRES_IN } from 'shared/constants';

const JWT_SECRET = process.env.NEXT_API_JWT_SECRET || 'test';

const getHash = (text: string) => bcrypt.hash(text, 10);

/**
 * @desc Compares if text and hash are equal
 *
 * @param text {string} - a text to compare with hash
 * @param hash {string} - a hash to compare with text
 * @return {Promise} - are hash and text equal
 */
const compareTextWithHash = (text: string, hash: string) => bcrypt.compare(text, hash);

/**
 * @desc Generates a JWT token with a secret
 *
 * @param payload {object} - Payload to include in the token
 * @param [options] {SignOptions} - JWT sign options
 * @return {string} - JWT token
 */

const generateJwtToken = async <T extends object>(payload: T, options?: SignOptions) => {
  const secret: Secret = JWT_SECRET;
  const expiresIn = TOKEN_SECURITY_EXPIRES_IN;

  return jwt.sign(payload, secret, { expiresIn, ...options });
};

/**
 * @desc Verifies a JWT token and returns the payload
 *
 * @param token {string} - JWT token to verify
 * @return {object | null} - Decoded payload or null if verification fails
 */
const verifyJwtToken = async <T extends JwtPayload>(token: string): Promise<(T & JwtPayload) | null> => {
  try {
    const secret = JWT_SECRET;

    return jwt.verify(token, secret) as T;
  } catch {
    return null;
  }
};

const securityUtils = {
  getHash,
  compareTextWithHash,
  generateJwtToken,
  verifyJwtToken,
};

export default securityUtils;
