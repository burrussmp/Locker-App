'use strict';
import config from 'config';
import apiHelper from 'api/helper';

/**
 * @desc Get media from S3
 * @param {string} key : The key of the image to retrieve
 * @param {string} size : (optional) Retrieve different sizes of the media (small, medium, large, or xlarge)
 * @return a promise that resolves if the API went through otherwise the error
 * @success
  ```
  let img_src = await api.S3.GetMedia(post.content.media.key);
  <img src={img_src} />
  ```
 */
const GetMedia = async (key: string, size?: string): Promise<string> => {
  if (size && !apiHelper.validateSizeParam(size)) {
    throw 'Size parameter invalid';
  }
  const id_and_token = apiHelper.get_id_and_token_redux();
  if (!id_and_token) {
    throw 'Unable to retrieve userID and/or access_token from redux store';
  }
  const res = await global.fetch(
    `${config.server}/api/media/${key}?access_token=${
      id_and_token.access_token
    }${size ? `&size=${size}` : ''}`
  );
  if (res.ok) {
    return await apiHelper.createURI(res);
  } else {
    throw await apiHelper.handleError(res);
  }
};

export default {
  GetMedia,
};
