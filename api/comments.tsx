/**
 * @description Comments API
 * @author Matthew P. Burruss
 * @date 12/24/2020
 */
import utils from 'api/utils';
import { ReplyType } from 'api/replies';

export type CommentType = {
  _id: string;
  text: string;
  postedBy: string;
  createdAt: string;
  likes: number;
  liked: boolean;
};

/**
 * @desc Create a comment for a post and returns the id of the newly created comment
 * @param {string} postId The ID of the post
 * @param {string} text The text of the comment
 * @return {Promise<{'_id': string}>} The ID of the created comment.
 * @success
 ```
  {
      "_id": "5f400fb18b012a65ef46044b",
  }
  ```
*/
const Create = async (postId: string, text: string): Promise<{'_id': string}> => {
  const res = await utils.postRequest(`/api/${postId}/comments`, { text });
  return await res.json() as {'_id': string};
};

/**
 * @desc Retrieve a comment by ID and return information like who liked it, when it was created, who posted it, etc.
 * @param {string} commentID The ID of the comment.
 * @return {Promise<CommentType>} The comment object.
 * @success
 ```
  {
      _id: string;
      text: string;
      postedBy: string;
      createdAt: string;
      likes: number;
      liked: boolean;
  }
  ```
*/
const GetByID = async (commentID: string): Promise<CommentType> => {
  const res = await utils.getRequest(`/api/comments/${commentID}`);
  return await res.json() as CommentType;
};

/**
 * @desc Like a comment.
 * @param {string} commentID The ID of the comment.
 * @return {Promise<{'message': string}>} A success message.
 * @success
 ```
{
  "message" : "Successfully liked a comment"
}
  ```
*/
const Like = async (commentID: string): Promise<{'message': string}> => {
  const res = await utils.putRequest(`/api/${commentID}/likes`);
  return await res.json() as {'message': string};
};

/**
 * @desc Unlike a comment.
 * @param {string} commendID The ID of the comment.
 * @return {Promise<{message: string}>} A success message.
 * @success
 ```
{
  "message" : "Successfully unliked a comment"
}
  ```
*/
const Unlike = async (commentID: string): Promise<{message: string}> => {
  const res = await utils.deleteRequest(`/api/${commentID}/likes`);
  return await res.json() as {'message': string};
};

/**
 * @desc Delete a comment (returns the deleted comments ID)
 * @param {string} commendID The ID of the comment.
 * @return {Promise<{_id: string}>} a promise that resolves if the API went through otherwise the error
 * @success
 ```
  {
    "_id": "5f41f6056bb02a7b13f269e9"
  }
  ```
*/
const Delete = async (commentID: string): Promise<{_id: string}> => {
  const res = await utils.deleteRequest(`/api/${commentID}`);
  return await res.json() as {'_id': string};
};

/**
 * @desc List all the replies of a comment
 * @param {string} commendID The ID of the comment.
 * @return {Promise<[ReplyType]>} A list of replies to comments.
 * @success
 ```
[
  {
    text: 'new text',
    postedBy: '5f65880f1c64cf1cd2a91610',
    createdAt: '2020-09-19T04:24:50.244Z',
    _id: '5f6588121c64cf1cd2a91619',
    likes: 0,
    liked: false
  },
  {
    text: 'new text',
    postedBy: '5f6588101c64cf1cd2a91611',
    createdAt: '2020-09-19T04:24:50.247Z',
    _id: '5f6588121c64cf1cd2a9161a',
    likes: 6,
    liked: true
  }
]
  ```
*/
const ListReplies = async (commentID: string): Promise<[ReplyType]> => {
  const res = await utils.getRequest(`/api/${commentID}/replies`);
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
