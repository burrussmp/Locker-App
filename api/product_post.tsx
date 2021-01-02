/**
 * @description Product Post API
 * @author Matthew P. Burruss
 * @date 12/24/2020
 */

import utils from 'api/utils';
import FormData from 'form-data';

type media = {
  name: string;
  type: string;
  uri: string;
};

type ProductPostData = {
  price: string;
  caption: string;
  tags: string;
};

/**
 * @desc Create a product post and return the ID
 * @param {ProductPostData} productPostData The product post data
 * @param {media} productPostMedia An object with a name, type, and uri attribute (see react-native-image-picker)
 * @return {Promise<{_id: string}>} The ID of the newly created product post
 * @success
 ```
{
   "_id" : "5f4142d3df64933395456de1"
}
  ```
*/
const Create = async (productPostData: ProductPostData, productPostMedia: media): Promise<{_id: string}> => {
  const data = new FormData();
  data.append('media', productPostMedia);
  data.append('price', productPostData.price);
  data.append('caption', productPostData.caption);
  data.append('tags', productPostData.tags);
  const res = await utils.postRequest('api/posts', data, { type: 'ProductPost' });
  return await res.json() as {_id: string};
};

export type ProductPostType = {
  price: number;
  media: {
    key: string;
    mimetype: string;
    blurhash: string;
  };
};

export default {
  Create,
};
