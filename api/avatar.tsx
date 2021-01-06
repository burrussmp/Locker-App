/**
 * @description Avatar API
 * @author Matthew P. Burruss
 * @date 12/24/2020
 */

import utils from 'api/utils';

/**
 * @desc Get the avatar of a specific user
 * @param {string| undefined} userId The user ID of the avatar to retrieve. If this is undefined, retrieve
 * the userID from AsyncStorage.
 * @param {string | undefined} size An optional query parameter to resize the user avatar. Supports small, medium, large, and xlarge
 * @return {Promise<string>}
 * @success
  ```
  let img_src = await getAvatar(userID);
  <img src={URL.createObjectURL(img_src)} />
  ```
 */
const Get = async (userId?: string, size?: string): Promise<string> => {
  const query = size ? { size } : undefined;
  const res = await utils.getRequest(`/api/users/${userId || utils.getIDAndAccessToken()._id}/avatar`, query);
  return utils.createURI(res);
};

type media = {
  name: string;
  type: string;
  uri: string;
};

/**
 * @desc Update the user's avatar.
 * @param {media} media An object with a name, type, and uri attribute (see react-native-image-picker)
 * @return {Promise<Record<string, string>>}
 * @success
 ```
    {
        "message" :  "Successfully uploaded user profile photo"
    }
  ```
 */

const Update = async (avatar: media): Promise<Record<string, string>> => {
  const form = new FormData();
  form.append('media', avatar as unknown as Blob);
  const res = await utils.postRequest(`/api/users/${utils.getIDAndAccessToken()._id}/avatar`, form);
  return await res.json() as Record<string, string>;
};

/**
 * @desc Delete user's avatar
 * @return {Promise<Record<string, string>>} A success message
 * @success
 ```
{
    "message" :  "Successfully removed profile photo"
}
  ```
 */
const Delete = async (): Promise<Record<string, string>> => {
  const res = await utils.deleteRequest(`/api/users/${utils.getIDAndAccessToken()._id}/avatar`);
  return await res.json() as Record<string, string>;
};

export default {
  Update,
  Get,
  Delete,
};
