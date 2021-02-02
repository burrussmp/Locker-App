/* eslint-disable no-redeclare */
/**
 * @description S3 API
 * @author Matthew P. Burruss
 * @date 12/28/2020
 */
import utils from 'api/utils';
import * as T from 'io-ts';

/**
 * A media data type. This is what should be sent to server.
 */
export type mediaData = {
  name: string;
  type: string;
  uri: string;
};

/**
 * A media type. this is what is returned by server.
 */
export const mediaType = T.type({
  key: T.string,
  mimetype: T.string,
  blurhash: T.string,
});
export type mediaType = T.TypeOf<typeof mediaType>;

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
const getMedia = async (key: string, size?: string): Promise<string> => {
  const query = size ? { size } : undefined;
  const res = await utils.getRequest(`/api/media/${key}`, query);
  return utils.createURI(res);
};

export default {
  getMedia,
};
