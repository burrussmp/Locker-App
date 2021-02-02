/* eslint-disable no-redeclare */
/**
 * @description Replies API
 * @author Matthew P. Burruss
 * @date 1/2/2021
 */

import utils from 'api/utils';
import * as T from 'io-ts';

export const ReplyType = T.type({
  _id: T.string,
  text: T.string,
  postedBy: T.string,
  createdAt: T.string,
  likes: T.number,
  liked: T.boolean,
});
export type ReplyType = T.TypeOf<typeof ReplyType>;

/**
 * @desc Creates a new reply (returns the ID of the newly created reply)
 * @param {string} commentId The ID of the comment
 * @param {string} text The text of the reply.
 * @return {Promise<{_id: string}>} The ID of the newly created reply
*/
const Create = async (commentId: string, text: string): Promise<{_id: string}> => {
  const res = await utils.postRequest(`/api/comments/${commentId}/replies`, { text });
  return await res.json() as {_id: string};
};

/**
 * @desc Get a reply by ID and return the reply information.
 * @param {string} commentId The ID of the comment
 * @param {string} replyId The ID of the reply
 * @return {Promise<ReplyType>} The reply promise.
*/
const GetByID = async (commentId: string, replyId: string): Promise<ReplyType> => {
  const res = await utils.getRequest(`/api/comments/${commentId}/replies/${replyId}`);
  return await res.json() as ReplyType;
};

/**
 * @desc Delete a reply and return its ID
 * @param {string} commentId The ID of the comment
 * @param {string} replyId The ID of the reply
 * @return {Promise<{_id: string}>} The ID of the deleted reply.
*/
const Delete = async (commentId: string, replyId: string): Promise<{_id: string}> => {
  const res = await utils.deleteRequest(`/api/comments/${commentId}/replies/${replyId}`);
  return await res.json() as {_id: string};
};

/**
 * @desc Like a reply and return its ID
 * @param {string} commentId The ID of the comment
 * @param {string} replyId The ID of the reply
 * @return {Promise<{_id: string}>} The ID of the liked reply.
 * @success
 ```
  {
      "_id": "5f400fb18b012a65ef46044b",
  }
  ```
*/
const Like = async (commentId: string, replyId: string): Promise<{_id: string}> => {
  const res = await utils.putRequest(`/api/comments/${commentId}/replies/${replyId}/likes`);
  return await res.json() as {_id: string};
};

/**
 * @desc Unlike a reply and return its ID
 * @param {string} commentId The ID of the comment
 * @param {string} replyId The ID of the reply
 * @return {Promise<{_id: string}>} The ID of the unliked reply.
*/
const Unlike = async (commentId: string, replyId: string): Promise<{_id: string}> => {
  const res = await utils.deleteRequest(`/api/comments/${commentId}/replies/${replyId}/likes`);
  return await res.json() as {_id: string};
};

export default {
  Create,
  Like,
  Unlike,
  GetByID,
  Delete,
};
