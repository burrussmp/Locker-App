/**
 * @description A wrapper of all of the API calls into a single callable object
 * @author Matthew P. Burruss
 * @date 12/24/2020
 * @version 1.0.0
 */

import auth from 'api/auth';
import session from 'api/session';
import user from 'api/user';
import avatar from 'api/avatar';
import s3 from 'api/S3';
import organization from 'api/organization';
import post from 'api/post';
import comments from 'api/comments';
import replies from 'api/replies';
import search from 'api/search';
import collection from 'api/collection';
import locker from 'api/locker';
import lockerCollection from 'api/lockercollection';

// type PostAPIType = {
//   Basic: typeof post;
// };

type APIType = {
  Session: typeof session;
  Auth: typeof auth;
  User: typeof user;
  Avatar: typeof avatar;
  S3: typeof s3;
  Post: typeof post;
  Comments: typeof comments;
  Replies: typeof replies;
  Search: typeof search;
  Organization: typeof organization;
  Collection: typeof collection;
  Locker: typeof locker;
  LockerCollection: typeof lockerCollection;
};

// const postAPI: PostAPIType = {
//   Basic: post,
//   ProductPost: productPost,
// };

const api: APIType = {
  Session: session,
  Auth: auth,
  User: user,
  Avatar: avatar,
  S3: s3,
  Post: post,
  Comments: comments,
  Replies: replies,
  Search: search,
  Organization: organization,
  Collection: collection,
  Locker: locker,
  LockerCollection: lockerCollection,
};

export default api;
