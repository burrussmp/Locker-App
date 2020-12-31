/**
 * @description S3 API
 * @author Matthew P. Burruss
 * @date 12/28/2020
 */
import config from 'config';
import utils from 'api/utils';
import fetch from 'node-fetch';

/**
 * @desc Get media from S3
 * @param {string} key The key of the image to retrieve
 * @param {string | undefined} size Retrieve different sizes of the media (small, medium, large, or xlarge)
 * @return {Promise<string | Error>} A URI that can be used as the image source
 * @success
  ```
  let img_src = await api.S3.getMedia(post.content.media.key);
  <img src={img_src} />
  ```
 */
const getMedia = async (key: string, size?: string): Promise<string | Error> => {
  if (size && !utils.validateSizeParam(size)) {
    throw Error('Size parameter invalid');
  }
  const idAndAccessToken = utils.getIDAndAccessToken();
  if (!idAndAccessToken) {
    throw Error('Unable to retrieve userID and/or access_token from redux store');
  }
  const sizeQuery = size ? `&size=${size}` : '';
  const res = await fetch(`${config.server}/api/media/${key}?access_token=${idAndAccessToken.access_token}${sizeQuery}`);
  if (res.ok) {
    return utils.createURI(res);
  }
  throw await utils.handleError(res);
};

export default {
  getMedia,
};
