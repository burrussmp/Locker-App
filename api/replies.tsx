/**
 * @description Replies API
 * @author Matthew P. Burruss
 * @date 1/2/2021
 */

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
 * @param {string} commentID The ID of the comment
 * @param {string} text The text of the reply.
 * @return {Promise<{_id: string}>} The ID of the newly created reply
 * @success
 ```
  {
      "_id": "5f400fb18b012a65ef46044b",
  }
  ```
*/
const Create = async (commentID: string, text: string): Promise<{_id: string}> => {
  const res = await utils.postRequest(`/api/${commentID}/replies`, { text });
  return await res.json() as {_id: string};
};

/**
 * @desc Get a reply by ID and return the reply information.
 * @param {string} commentID The ID of the comment
 * @param {string} replyID The ID of the reply
 * @return {Promise<ReplyType>} The reply promise.
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
const GetById = async (commentID: string, replyID: string): Promise<ReplyType> => {
  const res = await utils.getRequest(`/api/${commentID}/replies/${replyID}`);
  return await res.json() as ReplyType;
};

/**
 * @desc Delete a reply and return its ID
 * @param {string} commentID The ID of the comment
 * @param {string} replyID The ID of the reply
 * @return {Promise<{_id: string}>} The ID of the deleted reply.
 * @success
 ```
  {
    "_id": "5f400fb18b012a65ef46044b",
  }
  ```
*/
const Delete = async (commentID: string, replyID: string): Promise<{_id: string}> => {
  const res = await utils.deleteRequest(`/api/${commentID}/replies/${replyID}`);
  return await res.json() as {_id: string};
};

/**
 * @desc Like a reply and return its ID
 * @param {string} commentID The ID of the comment
 * @param {string} replyID The ID of the reply
 * @return {Promise<{_id: string}>} The ID of the liked reply.
 * @success
 ```
  {
      "_id": "5f400fb18b012a65ef46044b",
  }
  ```
*/
const Like = async (commentID: string, replyID: string): Promise<{_id: string}> => {
  const res = await utils.putRequest(`/api/${commentID}/replies/${replyID}/likes`);
  return await res.json() as {_id: string};
};

/**
 * @desc Unlike a reply and return its ID
 * @param {string} commentID The ID of the comment
 * @param {string} replyID The ID of the reply
 * @return {Promise<{_id: string}>} The ID of the unliked reply.
 * @success
 ```
  {
      "_id": "5f400fb18b012a65ef46044b",
  }
  ```
*/
const Unlike = async (commentID: string, replyID: string): Promise<{_id: string}> => {
  const res = await utils.deleteRequest(`/api/${commentID}/replies/${replyID}/likes`);
  return await res.json() as {_id: string};
};

export default {
  Create,
  Like,
  Unlike,
  GetById,
  Delete,
};
