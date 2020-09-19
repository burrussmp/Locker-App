'use strict';

import auth from './auth';
import session from './session';
import user from './user';
import avatar from './avatar';
import s3 from './S3';
import post from './post';
import content_post from './content_post';
import comments from './comments';
import replies from './replies';

type PostAPIType = {
  Basic: typeof post;
  ContentPost: typeof content_post;
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
};

const post_api: PostAPIType = {
  Basic: post,
  ContentPost: content_post,
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
};

export default api;
