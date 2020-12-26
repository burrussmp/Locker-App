'use strict';
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
import post from 'api/post';
import product_post from 'api/product_post';
import comments from 'api/comments';
import replies from 'api/replies';
import search from 'api/search';

type PostAPIType = {
  Basic: typeof post;
  ProductPost: typeof product_post;
};

type APIType = {
  Session: typeof session;
  Auth: typeof auth;
  User: typeof user;
  Avatar: typeof avatar;
  S3: typeof s3;
  Post: PostAPIType;
  Comments: typeof comments;
  Replies: typeof replies;
  Search: typeof search;
};

const post_api: PostAPIType = {
  Basic: post,
  ProductPost: product_post,
};

const api: APIType = {
  Session: session,
  Auth: auth,
  User: user,
  Avatar: avatar,
  S3: s3,
  Post: post_api,
  Comments: comments,
  Replies: replies,
  Search: search,
};

export default api;
