'use strict';
import config from 'config';
import apiHelper from 'api/helper';
import FormData from 'form-data';

type media = {
  name: string;
  type: string;
  uri: string;
};

type ContentPostData = {
  price: string;
  caption: string;
  tags: string;
};

/**
 * @desc Create a content post and return the ID of the newly created content post
 * @param photo : photo : An object with a name, type, and uri attribute (see react-native-image-picker)
 * @return a promise that resolves if the API went through otherwise the error
 * @success
 ```
{
   "_id" : "5f4142d3df64933395456de1"
}
  ```
*/
const CreateContentPost = async (
  media: media,
  data: ContentPostData
): Promise<{_id: string} | Error> => {
  if (
    media.type !== 'image/jpeg' &&
    media.type !== 'image/png' &&
    media.type !== 'video/mp4'
  ) {
    throw 'Cannot upload anything besides an image or a video';
  }
  const id_and_token = apiHelper.get_id_and_token_redux();
  if (!id_and_token) {
    throw 'Unable to retrieve userID and/or access_token from redux store';
  }
  const form = new FormData();
  form.append('media', media);
  form.append('price', data.price);
  form.append('caption', data.caption);
  form.append('tags', data.tags);
  const res = await global.fetch(
    `${config.server}/api/posts?type=ContentPost&access_token=${id_and_token.access_token}`,
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

export type ContentPostType = {
  price: number;
  media: {
    key: string;
    mimetype: string;
  };
};

export default {
  CreateContentPost,
};
