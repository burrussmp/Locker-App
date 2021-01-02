/**
 * @description S3 API
 * @author Matthew P. Burruss
 * @date 12/28/2020
 */
import utils from 'api/utils';

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
  return await res.json() as string;
};

export default {
  getMedia,
};
