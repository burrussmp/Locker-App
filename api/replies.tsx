import config from 'config';
import utils from 'api/utils';

export type ReplyType = {
  _id: string;
  text: string;
  postedBy: string;
  createdAt: string;
  likes: number;
  liked: boolean;
};

/**
 * @desc Creates a new reply (returns the ID of the newly created reply)
 * @param commentId : string : the comment ID
 * @param text : string : the reply text
 * @return a promise that resolves if the API went through otherwise the error
 * @success
 ```
  {
      "_id": "5f400fb18b012a65ef46044b",
  }
  ```
*/
const Create = async (
  commentId: string,
  text: string
): Promise<[{_id: string}] | Error> => {
  const id_and_token = utils.getIDAndAccessToken();
  if (!id_and_token) {
    throw 'Unable to retrieve userID and/or access_token from redux store';
  }
  const data = {
    text: text,
  };
  const res = await global.fetch(
    `${config.server}/api/${commentId}/replies?access_token=${id_and_token.access_token}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }
  );
  if (res.ok) {
    return await res.json();
  } else {
    throw await utils.handleError(res);
  }
};

/**
 * @desc Like a reply and return its ID
 * @param commentId : string : the comment ID
 * @param replyId : string : the reply ID
 * @return a promise that resolves if the API went through otherwise the error
 * @success
 ```
  {
      "_id": "5f400fb18b012a65ef46044b",
  }
  ```
*/
const Like = async (
  commentId: string,
  replyId: string
): Promise<[{_id: string}] | Error> => {
  const id_and_token = utils.getIDAndAccessToken();
  if (!id_and_token) {
    throw 'Unable to retrieve userID and/or access_token from redux store';
  }
  const res = await global.fetch(
    `${config.server}/api/${commentId}/replies/${replyId}/likes?access_token=${id_and_token.access_token}`,
    {
      method: 'PUT',
    }
  );
  if (res.ok) {
    return await res.json();
  } else {
    throw await utils.handleError(res);
  }
};

/**
 * @desc Unlike a reply and return its ID
 * @param commentId : string : the comment ID
 * @param replyId : string : the reply ID
 * @return a promise that resolves if the API went through otherwise the error
 * @success
 ```
  {
      "_id": "5f400fb18b012a65ef46044b",
  }
  ```
*/
const Unlike = async (
  commentId: string,
  replyId: string
): Promise<[{_id: string}] | Error> => {
  const id_and_token = utils.getIDAndAccessToken();
  if (!id_and_token) {
    throw 'Unable to retrieve userID and/or access_token from redux store';
  }
  const res = await global.fetch(
    `${config.server}/api/${commentId}/replies/${replyId}/likes?access_token=${id_and_token.access_token}`,
    {
      method: 'DELETE',
    }
  );
  if (res.ok) {
    return await res.json();
  } else {
    throw await utils.handleError(res);
  }
};

/**
 * @desc Get a reply by ID
 * @param commentId : string : the comment ID
 * @param replyId : string : the reply ID
 * @return a promise that resolves if the API went through otherwise the error
 * @success
 ```
 {
  text: "What a reply!",
  postedBy: "5f400fb18b012a65ef46044b",
  createdAt: "2020-08-21T18:17:21.586Z",
  likes: 0,
  liked: false
}
  ```
*/
const GetById = async (
  commentId: string,
  replyId: string
): Promise<ReplyType | Error> => {
  const id_and_token = utils.getIDAndAccessToken();
  if (!id_and_token) {
    throw 'Unable to retrieve userID and/or access_token from redux store';
  }
  const res = await global.fetch(
    `${config.server}/api/${commentId}/replies/${replyId}?access_token=${id_and_token.access_token}`
  );
  if (res.ok) {
    return await res.json();
  } else {
    throw await utils.handleError(res);
  }
};

/**
 * @desc Delete a reply and return the ID of the deleted comment
 * @param commentId : string : the comment ID
 * @param replyId : string : the reply ID
 * @return a promise that resolves if the API went through otherwise the error
 * @success
 ```
  {
    "_id": "5f400fb18b012a65ef46044b",
  }
  ```
*/
const Delete = async (
  commentId: string,
  replyId: string
): Promise<[{_id: string}] | Error> => {
  const id_and_token = utils.getIDAndAccessToken();
  if (!id_and_token) {
    throw 'Unable to retrieve userID and/or access_token from redux store';
  }
  const res = await global.fetch(
    `${config.server}/api/${commentId}/replies/${replyId}?access_token=${id_and_token.access_token}`,
    {
      method: 'DELETE',
    }
  );
  if (res.ok) {
    return await res.json();
  } else {
    throw await utils.handleError(res);
  }
};

export default {
  Create,
  Like,
  Unlike,
  GetById,
  Delete,
};
