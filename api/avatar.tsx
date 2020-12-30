/**
 * @description Avatar API
 * @author Matthew P. Burruss
 * @date 12/24/2020
 */

import fetch from 'node-fetch';
import FormData from 'form-data';

import config from 'config';
import apiHelper from 'api/helper';

/**
 * @desc Get the avatar of a specific user
 * @param {string | undefined} userId The user ID of the person who's information you want to retrieve. If undefined, retrieve
 * the current user's profile.
 * @param {string undefined} size An optional query parameter to resize the user avatar.
 * @return {Promise<string | Error>}
 * @success
  ```
  let img_src = await getAvatar(userID);
  <img src={URL.createObjectURL(img_src)} />
  ```
 */
const Get = async (userId?: string, size?: string): Promise<string | Error> => {
  const idAndAccessToken = apiHelper.getIDAndAccessToken();
  if (size && !apiHelper.validateSizeParam(size)) {
    throw Error('Size parameter invalid');
  }
  if (!idAndAccessToken) {
    throw Error('Unable to retrieve userID and/or access_token from redux store');
  }
  const sizeQuery = size ? `&size=${size}` : '';
  const url = `${config.server}/api/users/${userId || idAndAccessToken.id}/avatar`;
  const res = await fetch(`${url}?access_token=${idAndAccessToken.access_token}${sizeQuery}`);
  if (res.ok) {
    return apiHelper.createURI(res);
  }
  throw await apiHelper.handleError(res);
};

type media = {
  name: string;
  type: string;
  uri: string;
};

/**
 * @desc Update the user's avatar.
 * @param {media} media An object with a name, type, and uri attribute (see react-native-image-picker)
 * @return {Promise<{message: string} | Error>}
 * @success
 ```
    {
        "message" :  "Successfully uploaded user profile photo"
    }
  ```
 */

const Update = async (avatar: media): Promise<{message: string} | Error> => {
  if (avatar.type !== 'image/jpeg' && avatar.type !== 'image/png') {
    throw Error('Cannot upload anything besides an image to a profile');
  }
  const idAndAccessToken = apiHelper.getIDAndAccessToken();
  if (!idAndAccessToken) {
    throw Error('Unable to retrieve userID and/or access_token from redux store');
  }
  const form = new FormData();
  form.append('media', avatar);
  const res = await fetch(`${config.server}/api/users/${idAndAccessToken.id}/avatar?access_token=${idAndAccessToken.access_token}`,
    {
      method: 'POST',
      body: form,
    });
  if (res.ok) {
    return res.json() as Promise<{message: string}>;
  }
  throw await apiHelper.handleError(res);
};

/**
 * @desc Delete user's avatar
 * @return {Promise<{message: string} | Error>} A success message
 * @success
 ```
{
    "message" :  "Successfully removed profile photo"
}
  ```
 */
const Delete = async (): Promise<{message: string} | Error> => {
  const idAndAccessToken = apiHelper.getIDAndAccessToken();
  if (!idAndAccessToken) {
    throw Error('Unable to retrieve userID and/or access_token from redux store');
  }
  const url = `${config.server}/api/users/${idAndAccessToken.id}/avatar`;
  const res = await fetch(`${url}?access_token=${idAndAccessToken.access_token}`, { method: 'DELETE' });
  if (res.ok) {
    return res.json() as Promise<{message: string}>;
  }
  throw await apiHelper.handleError(res);
};

export default {
  Update,
  Get,
  Delete,
};
