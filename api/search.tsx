'use strict';
import config from 'config';
import apiHelper from 'api/helper';

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
const GetUsers = async (searchText: string): Promise<any> => {
  const id_and_token = apiHelper.getIDAndAccessToken();
  if (!id_and_token) {
    throw 'Unable to retrieve userID and/or access_token from redux store';
  }
  const res = await global.fetch(
    `${config.server}/api/search/users?access_token=${id_and_token.access_token}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        search: searchText,
      }),
    }
  );
  if (res.ok) {
    return await res.json();
  } else {
    throw await apiHelper.handleError(res);
  }
};

export default {
  GetUsers,
};
