/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable max-len */
/* eslint-disable no-redeclare */
/**
 * @description Post API
 * @author Matthew P. Burruss
 * @date 12/24/2020
 */
import utils from 'api/utils';
import { mediaType } from 'api/S3';
import { CommentType } from 'api/comments';
import * as T from 'io-ts';

/**
 * @desc The product post information
 */
export const ProductPostInfoType = T.type({
  _id: T.string,
  approved: T.boolean,
  visible: T.boolean,
  tags: T.array(T.string),
  sizes: T.array(T.string),
  additional_media: T.array(mediaType),
  name: T.string,
  url: T.string,
  organization: T.string,
  product_collection: T.string,
  price: T.number,
  media: mediaType,
  description: T.string,
  available: T.boolean,
  meta: T.UnknownRecord,
  last_scraped: T.string,
  locker_product: T.union([T.undefined, T.string]),
  createdAt: T.string,
  updatedAt: T.string,
});
export type ProductPostInfoType = T.TypeOf<typeof ProductPostInfoType>;

/**
 * @desc Reaction type
 */
export const ReactionsType = T.type({
  selected: T.union([T.boolean, T.string]),
  like: T.number,
  love: T.number,
  laugh: T.number,
  surprise: T.number,
  mad: T.number,
  sad: T.number,
});
export type ReactionsType = T.TypeOf<typeof ReactionsType>;

/**
 * @desc Post
*/
export const PostType = T.type({
  caption: T.string,
  tags: T.array(T.record(T.string, T.string)),
  _id: T.string,
  contentType: T.string,
  content: ProductPostInfoType,
  postedBy: T.string,
  postedByType: T.string,
  createdAt: T.string,
  updatedAt: T.string,
});
export type PostType = T.TypeOf<typeof PostType>;

export const PostListType = T.array(T.type({
  _id: T.string,
  createdAt: T.string,
}));
export type PostListType = T.TypeOf<typeof PostListType>;

/**
 * @desc List all posts
 * @param {Record<string, string> | undefined} query Optional query parameters
 * @return {Promise<PostListType>} A list of posts
*/
const GetAll = async (query?: Record<string, string>): Promise<PostListType> => {
  const res = await utils.getRequest('/api/posts', query);
  return await res.json() as PostListType;
};

/**
 * @desc Get a specific post. The 'content' field is populated depending on the type of the post
 * @param {string} postId The ID of the post.
 * @param {Record<string, string> | undefined} query Optional query parameters
 * @return {Promise<PostType>} The post information
*/
const GetByID = async (postId: string, query?: Record<string, string>): Promise<PostType> => {
  const res = await utils.getRequest(`/api/posts/${postId}`, query);
  return await res.json() as PostType;
};

/**
 * @desc Get a specific post by the product ID.
 * @param {string} productId The ID of the product.
 * @return {Promise<PostType>} The post information
*/
const GetByProductID = async (productId: string): Promise<PostType> => {
  const res = await utils.getRequest('/api/posts', { product: productId });
  return await res.json() as PostType;
};

/**
 * @desc List post comments
 * @param {string} postId The ID of the post.
 * @return {Promise<[CommentType]>} List of comments for a post.
*/
const ListComments = async (postId: string): Promise<[CommentType]> => {
  const res = await utils.getRequest(`/api/${postId}/comments`);
  return await res.json() as [CommentType];
};

/**
 * @desc React to a post.
 * @param {string} postId The ID of the post.
 * @param {string} reaction The reaction to the post. Must be one of the following: "like", "love", "laugh", "surprise", "mad", or "sad"
 * @return {Promise<{_id: string}>} The ID of the post
 * @success
  ```
  {
    "_id": 5f400fb18b012a65ef46044b
  }
  ```
*/
const AddReaction = async (postId: string, reaction: string): Promise<{_id: string}> => {
  const res = await utils.putRequest(`/api/posts/${postId}/reaction`, { reaction });
  return await res.json() as {_id: string};
};

/**
 * @desc Remove reaction to post.
 * @param {string} postId The ID of the post.
 * @return {Promise<{_id: string}>} The deleted reaction.
*/
const DeleteReaction = async (postId: string): Promise<{_id: string}> => {
  const res = await utils.deleteRequest(`/api/posts/${postId}/reaction`);
  return await res.json() as {_id: string};
};

/**
 * @desc Get a summary of a post reactions.
 * @param {string} postId The ID of the post.
 * @return {Promise<ReactionsType>} The reaction summary.
*/
const GetReactions = async (postId: string): Promise<ReactionsType> => {
  const res = await utils.getRequest(`/api/posts/${postId}/reaction`);
  return await res.json() as ReactionsType;
};

export default {
  GetAll,
  GetByID,
  GetByProductID,
  // Edit,
  // Delete,
  ListComments,
  AddReaction,
  DeleteReaction,
  GetReactions,
};

// type PostUpdate = {
//   caption: string;
//   tags: string;
// };

// /**
//  * @desc Edit a post
//  * @param postId : string : the post ID
//  * @return a promise that resolves if the API went through otherwise the error
//  * @success
//  ```
// {
//    "_id" : "5f4142d3df64933395456de1"
// }
//   ```
// */
// const Edit = async (
//   postId: string,
//   postUpdate: PostUpdate
// ): Promise<{_id: string} | Error> => {
//   const id_and_token = utils.getIDAndAccessToken();
//   if (!id_and_token) {
//     throw 'Unable to retrieve userId and/or access_token from redux store';
//   }
//   const data = {
//     caption: postUpdate.caption,
//     tags: postUpdate.tags,
//   };
//   const res = await global.fetch(
//     `${config.server}/api/posts/${postId}?access_token=${id_and_token.access_token}`,
//     {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(data),
//     }
//   );
//   if (res.ok) {
//     return await res.json();
//   } else {
//     throw await utils.handleError(res);
//   }
// };

// /**
//  * @desc Deletes a post (user must be owner)
//  * @param postId : string : the postId to retrieve
//  * @return a promise that resolves if the API went through otherwise the error
//  * @success
//  ```
//   {
//     "_id": "5f41ea00c025ae611618988c",
//   }
//   ```
// */
// const Delete = async (postId: string): Promise<{_id: string} | Error> => {
//   const id_and_token = utils.getIDAndAccessToken();
//   if (!id_and_token) {
//     throw 'Unable to retrieve userId and/or access_token from redux store';
//   }
//   const res = await global.fetch(
//     `${config.server}/api/posts/${postId}/comments?access_token=${id_and_token.access_token}`,
//     {
//       method: 'DELETE',
//     }
//   );
//   if (res.ok) {
//     return await res.json();
//   } else {
//     throw await utils.handleError(res);
//   }
// };
