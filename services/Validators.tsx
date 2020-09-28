/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */

/**
 * @author Matthew P. Burruss
 * @date Aug 2020
 * @desc Useful Validators
 */

/**
 * @desc Performs the same validation as the server and cognito (really don't change this)
 * @param String password  - A potential password
 * @param Bool   isNew     - Whether or not this is a new model or an update
 * @return error message if error else undefined
 */
const isValidPassword = (password: string): string => {
  if (!password.match(/[a-z]/)) {
    return 'Must container a lowercase letter';
  } else if (!password.match(/[A-Z]/)) {
    return 'Must contain an uppercase character';
  } else if (!password.match(/[0-9]/i)) {
    return 'Must contain a number';
  } else if (
    !password.match(
      // eslint-disable-next-line no-useless-escape
      /\^|\$|\*|\.|\[|\]|\{|\}|\(|\)|\?|\"|\!|\@|\#|\%|\&|\/|\\|\,|\>|\<|\'|\:|\;|\||\_|\~|\`/i
    )
  ) {
    return 'Must contain a special character';
  } else if (password.length < 8) {
    return 'Must be greater than 8 characters';
  }
  return '';
};

export default {
  isValidPassword,
};
