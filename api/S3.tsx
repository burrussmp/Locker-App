'use strict';
import config from 'config';
import apiHelper from 'api/helper';

/**
 * @desc Get media from S3
 * @param key : string : The key of the image to retrieve
 * @return a promise that resolves if the API went through otherwise the error
 * @success
  ```
  let img_src = await getAvatar(userID);
  <img src={URL.createObjectURL(img_src)} />
  ```
 */
const getMediaFromS3 = async (key: string): Promise<string | Error> => {
  const id_and_token = apiHelper.get_id_and_token_redux();
  if (!id_and_token) {
    throw 'Unable to retrieve userID and/or access_token from redux store';
  }
  const res = await global.fetch(
    `${config.server}/api/media/${key}?access_token=${id_and_token.access_token}`
  );
  if (res.ok) {
    const blob = res.blob();
    return URL.createObjectURL(blob);
  } else {
    throw await apiHelper.handleError(res);
  }
};

export default {
  getMediaFromS3,
};
