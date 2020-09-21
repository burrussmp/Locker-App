'use strict';
import config from 'config';
import apiHelper from 'api/helper';
import FormData from 'form-data';
import api from './api';

/*
ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {}
      else if (response.error) {}
      else if (response.customButton) {}
      else {
        const photo = { // leads to handleAddPhoto()
          fileName: response.fileName,
          path: response.path,
          type: response.type,
          uri: response.uri,
          width: response.width,
          height: response.height,
        };
        await api.avatar.updateAvatar(photo);
      }
    });
*/

/**
 * @desc Get the avatar of a specific user
 * @param userID : string : The user ID of the person who's information you want to retrieve. If undefined, retrieve user profile.
 * @param size : string : either small, medium, large, or xlarge
 * @return a promise that resolves if the API went through otherwise the error
 * @success
  ```
  let img_src = await getAvatar(userID);
  <img src={URL.createObjectURL(img_src)} />
  ```
 */
const Get = async (userId?: string, size?: string): Promise<string | Error> => {
  const id_and_token = apiHelper.get_id_and_token_redux();
  if (size && !apiHelper.validateSizeParam(size)) {
    throw 'Size parameter invalid';
  }
  if (!id_and_token) {
    throw 'Unable to retrieve userID and/or access_token from redux store';
  }
  if (!userId) {
    userId = id_and_token.id;
  }
  const res = await global.fetch(
    `${config.server}/api/users/${userId}/avatar?access_token=${
      id_and_token.access_token
    }${size ? `&size=${size}` : ''}`
  );
  if (res.ok) {
    return await apiHelper.createURI(res);
  } else {
    throw await apiHelper.handleError(res);
  }
};

type media = {
  name: string;
  type: string;
  uri: string;
};

/**
 * @desc Update our avatar
 * @param photo : photo : An object with a name, type, and uri attribute (see react-native-image-picker)
 * @return a promise that resolves if the API went through otherwise the error
 * @success
 ```
    {
        "message" :  "Successfully uploaded user profile photo"
    }
  ```
 */

const Update = async (media: media): Promise<{message: string} | Error> => {
  if (media.type !== 'image/jpeg' && media.type !== 'image/png') {
    throw 'Cannot upload anything besides an image to a profile';
  }
  const id_and_token = apiHelper.get_id_and_token_redux();
  if (!id_and_token) {
    throw 'Unable to retrieve userID and/or access_token from redux store';
  }
  const form = new FormData();
  form.append('media', media);
  const res = await global.fetch(
    `${config.server}/api/users/${id_and_token.id}/avatar?access_token=${id_and_token.access_token}`,
    {
      method: 'POST',
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      body: form,
    }
  );
  if (res.ok) {
    return await res.json();
  } else {
    throw await apiHelper.handleError(res);
  }
};

/**
 * @desc Delete our profile photo
 * @return a promise that resolves if the API went through otherwise the error
 * @success
 ```
{
    "message" :  "Successfully removed profile photo"
}
  ```
 */
const Delete = async (): Promise<{message: string} | Error> => {
  const id_and_token = apiHelper.get_id_and_token_redux();
  if (!id_and_token) {
    throw 'Unable to retrieve userID and/or access_token from redux store';
  }
  const res = await global.fetch(
    `${config.server}/api/users/${id_and_token.id}/avatar?access_token=${id_and_token.access_token}`,
    {
      method: 'DELETE',
    }
  );
  if (res.ok) {
    return await res.json();
  } else {
    throw await apiHelper.handleError(res);
  }
};

export default {
  Update,
  Get,
  Delete,
};
