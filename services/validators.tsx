/* eslint-disable no-useless-escape */
/* eslint-disable @typescript-eslint/prefer-regexp-exec */
/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * @desc Validators
 * @author Matthew P. Burruss
 * @date 1/3/2021
 */
import * as T from 'io-ts';
import { pipe } from 'fp-ts/function';
import { fold } from 'fp-ts/Either';

const validateType: (decoder: T.Decoder<any, any>, value: any) => string = (decoder: T.Decoder<any, any>, value: any) => {
  const handleError = (errors: T.Errors) => {
    throw new Error(JSON.stringify(errors));
  };
  return pipe(
    decoder.decode(value),
    fold(
      // failure handler
      handleError,
      // success handler
      () => 'success',
    ),
  );
};

/**
 * @desc Performs the same validation as the server and cognito (really don't change this)
 * @param String password  - A potential password
 * @param Bool   isNew     - Whether or not this is a new model or an update
 * @return error message if error else undefined
 */
const isValidPassword = (password: string): string => {
  if (!password.match(/[a-z]/)) {
    return 'Must container a lowercase letter';
  } if (!password.match(/[A-Z]/)) {
    return 'Must contain an uppercase character';
  } if (!password.match(/[0-9]/i)) {
    return 'Must contain a number';
  } if (
    !password.match(
      /\^|\$|\*|\.|\[|\]|\{|\}|\(|\)|\?|\"|\!|\@|\#|\%|\&|\/|\\|\,|\>|\<|\'|\:|\;|\||\_|\~|\`/i,
    )
  ) {
    return 'Must contain a special character';
  } if (password.length < 8) {
    return 'Must be greater than 8 characters';
  }
  return '';
};

export default {
  isValidPassword,
  validateType,
};
