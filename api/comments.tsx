/* eslint-disable no-redeclare */
/**
 * @description Comments API
 * @author Matthew P. Burruss
 * @date 12/24/2020
 */
import utils from 'api/utils';
import { ReplyType } from 'api/replies';
import * as T from 'io-ts';

export const CommentType = T.type({
  _id: T.string,
  text: T.string,
  postedBy: T.string,
  createdAt: T.string,
  likes: T.number,
  liked: T.boolean,
});
export type CommentType = T.TypeOf<typeof CommentType>;

/**
 * @desc Create a comment for a post and returns the id of the newly created comment
 * @param {string} postId The ID of the post
 * @param {string} text The text of the comment
 * @return {Promise<{'_id': string}>} The ID of the created comment.
*/
const Create = async (postId: string, text: string): Promise<{'_id': string}> => {
  const res = await utils.postRequest(`/api/${postId}/comments`, { text });
  return await res.json() as {'_id': string};
};

/**
 * @desc Retrieve a comment by ID and return information like who liked it, when it was created, who posted it, etc.
 * @param {string} commentID The ID of the comment.
 * @return {Promise<CommentType>} The comment object.
*/
const GetByID = async (commentID: string): Promise<CommentType> => {
  const res = await utils.getRequest(`/api/comments/${commentID}`);
  return await res.json() as CommentType;
};

/**
 * @desc Like a comment.
 * @param {string} commentID The ID of the comment.
 * @return {Promise<{'message': string}>} A success message.
*/
const Like = async (commentID: string): Promise<{'message': string}> => {
  const res = await utils.putRequest(`/api/comments/${commentID}/likes`);
  return await res.json() as {'message': string};
};

/**
 * @desc Unlike a comment.
 * @param {string} commendID The ID of the comment.
 * @return {Promise<{message: string}>} A success message.
*/
const Unlike = async (commentID: string): Promise<{message: string}> => {
  const res = await utils.deleteRequest(`/api/comments/${commentID}/likes`);
  return await res.json() as {'message': string};
};

/**
 * @desc Delete a comment (returns the deleted comments ID)
 * @param {string} commendID The ID of the comment.
 * @return {Promise<{_id: string}>} a promise that resolves if the API went through otherwise the error
*/
const Delete = async (commentID: string): Promise<{_id: string}> => {
  const res = await utils.deleteRequest(`/api/comments/${commentID}`);
  return await res.json() as {'_id': string};
};

/**
 * @desc List all the replies of a comment
 * @param {string} commendID The ID of the comment.
 * @return {Promise<[ReplyType]>} A list of replies to comments.
*/
const ListReplies = async (commentID: string): Promise<[ReplyType]> => {
  const res = await utils.getRequest(`/api/comments/${commentID}/replies`);
  return await res.json() as [ReplyType];
};

export default {
  Create,
  GetByID,
  Like,
  Unlike,
  Delete,
  ListReplies,
};
