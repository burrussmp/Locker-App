'use strict';
import config from 'config';
import apiHelper from 'api/helper';
import {ContentPostType} from './content_post';
import {CommentType} from './comments';

export type PostType = {
  caption: string;
  tags: Array<Record<string, string>>;
  _id: string;
  type: string;
  content: ContentPostType;
  postedBy: string;
  createdAt: string;
  updatedAt: string;
  __v: number | undefined;
};

type ReactionsType = {
  selected: boolean;
  like: number;
  love: number;
  laugh: number;
  surprise: number;
  mad: number;
  sad: number;
};

/**
 * @desc List all posts
 * @return a promise that resolves if the API went through otherwise the error
 * @success
 ```
[
    {
        "_id": "5f4142d2df64933395456dde",
        "createdAt": "2020-08-22T16:07:46.915Z"
    },
    {
        "_id": "5f4142d3df64933395456de1",
        "createdAt": "2020-08-22T16:07:47.174Z"
    }
]
  ```
*/
const GetAll = async (): Promise<{_id: string} | Error> => {
  const id_and_token = apiHelper.get_id_and_token_redux();
  if (!id_and_token) {
    throw 'Unable to retrieve userID and/or access_token from redux store';
  }
  const res = await global.fetch(
    `${config.server}/api/posts?access_token=${id_and_token.access_token}`
  );
  if (res.ok) {
    return await res.json();
  } else {
    throw await apiHelper.handleError(res);
  }
};

/**
 * @desc Get a specific post. The 'content' field is populated depending on the type of the post
 * @param postId : string : the postID
 * @return a promise that resolves if the API went through otherwise the error
 * @success
 ```
{
    "caption": "Check out the new shoe!",
    "tags": [
        "shoe",
        "designer"
    ],
    "_id": "5f4155c1284bd74c053c2ffe",
    "type": "ContentPost",
    "content": // depends on the type of post (see /api/content_post.tsx for example),
    "postedBy": "5f4155c0284bd74c053c2ff9",
    "createdAt": "2020-08-22T17:28:33.161Z",
    "updatedAt": "2020-08-22T17:28:33.161Z"
}
  ```
*/
const GetByID = async (postId: string): Promise<PostType | Error> => {
  const id_and_token = apiHelper.get_id_and_token_redux();
  if (!id_and_token) {
    throw 'Unable to retrieve userID and/or access_token from redux store';
  }
  const res = await global.fetch(
    `${config.server}/api/posts/${postId}?access_token=${id_and_token.access_token}`
  );
  if (res.ok) {
    return await res.json();
  } else {
    throw await apiHelper.handleError(res);
  }
};

type PostUpdate = {
  caption: string;
  tags: string;
};

/**
 * @desc Edit a post
 * @param postId : string : the post ID
 * @return a promise that resolves if the API went through otherwise the error
 * @success
 ```
{
   "_id" : "5f4142d3df64933395456de1"
}
  ```
*/
const Edit = async (
  postId: string,
  postUpdate: PostUpdate
): Promise<{_id: string} | Error> => {
  const id_and_token = apiHelper.get_id_and_token_redux();
  if (!id_and_token) {
    throw 'Unable to retrieve userID and/or access_token from redux store';
  }
  const data = {
    caption: postUpdate.caption,
    tags: postUpdate.tags,
  };
  const res = await global.fetch(
    `${config.server}/api/posts/${postId}?access_token=${id_and_token.access_token}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }
  );
  if (res.ok) {
    return await res.json();
  } else {
    throw await apiHelper.handleError(res);
  }
};

/**
 * @desc Deletes a post (user must be owner)
 * @param postId : string : the postID to retrieve
 * @return a promise that resolves if the API went through otherwise the error
 * @success
 ```
  {
    "_id": "5f41ea00c025ae611618988c",
  }
  ```
*/
const Delete = async (postId: string): Promise<{_id: string} | Error> => {
  const id_and_token = apiHelper.get_id_and_token_redux();
  if (!id_and_token) {
    throw 'Unable to retrieve userID and/or access_token from redux store';
  }
  const res = await global.fetch(
    `${config.server}/api/posts/${postId}/comments?access_token=${id_and_token.access_token}`,
    {
      method: 'DELETE',
    }
  );
  if (res.ok) {
    return await res.json();
  } else {
    throw await apiHelper.handleError(res);
  }
};

/**
 * @desc List post comments
 * @param postId : string : the post ID
 * @return a promise that resolves if the API went through otherwise the error
 * @success
 ```
  [
    {
      text: 'What the heck @someperson comments',
      postedBy: 5f65925c10264630c624150b,
      createdAt: 2020-09-19T05:08:48.350Z,
      _id: 5f65926010264630c6241516,
      likes: 0,
      liked: false
    },
    {
      text: 'New comment 1',
      postedBy: 5f65925c10264630c624150b,
      createdAt: 2020-09-19T05:08:48.358Z,
      _id: 5f65926010264630c6241517,
      likes: 0,
      liked: false
    }
  ]
  ```
*/
const ListComments = async (postId: string): Promise<[CommentType] | Error> => {
  const id_and_token = apiHelper.get_id_and_token_redux();
  if (!id_and_token) {
    throw 'Unable to retrieve userID and/or access_token from redux store';
  }
  const res = await global.fetch(
    `${config.server}/api/posts/${postId}/comments?access_token=${id_and_token.access_token}`
  );
  if (res.ok) {
    return await res.json();
  } else {
    throw await apiHelper.handleError(res);
  }
};

/**
 * @desc React to a post and returns the id of the post that you reacted to
 * @param postId : string : the post ID
 * @param reaction : string : Must be one of the following: "like", "love", "laugh", "surprise", "mad", or "sad"
 * @return a promise that resolves if the API went through otherwise the error
 * @success
 ```
 [
    {
      text: 'What the heck @someperson comments',
      postedBy: 5f65925c10264630c624150b,
      createdAt: 2020-09-19T05:08:48.350Z,
      _id: 5f65926010264630c6241516,
      likes: 0,
      liked: false
    },
    {
      text: 'New comment 1',
      postedBy: 5f65925c10264630c624150b,
      createdAt: 2020-09-19T05:08:48.358Z,
      _id: 5f65926010264630c6241517,
      likes: 0,
      liked: false
    }
  ]
  ```
*/
const AddReaction = async (
  postId: string,
  reaction: string
): Promise<[{_id: string}] | Error> => {
  const _allowed_reactions_ = [
    'like',
    'love',
    'laugh',
    'surprise',
    'mad',
    'sad',
  ];
  if (!_allowed_reactions_.includes(reaction)) {
    throw `Reaction ${reaction} not supported. The following reactions are ${_allowed_reactions_}`;
  }
  const id_and_token = apiHelper.get_id_and_token_redux();
  if (!id_and_token) {
    throw 'Unable to retrieve userID and/or access_token from redux store';
  }
  const data = {
    reaction: reaction,
  };
  const res = await global.fetch(
    `${config.server}/api/posts/${postId}/reaction?access_token=${id_and_token.access_token}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }
  );
  if (res.ok) {
    return await res.json();
  } else {
    throw await apiHelper.handleError(res);
  }
};

/**
 * @desc Delete reaction from a post and return the ID
 * @param postId : string : the post ID
 * @return a promise that resolves if the API went through otherwise the error
 * @success
 ```
  {
      "_id": "5f400fb18b012a65ef46044b",
  }
  ```
*/
const DeleteReaction = async (
  postId: string
): Promise<[{_id: string}] | Error> => {
  const id_and_token = apiHelper.get_id_and_token_redux();
  if (!id_and_token) {
    throw 'Unable to retrieve userID and/or access_token from redux store';
  }
  const res = await global.fetch(
    `${config.server}/api/posts/${postId}/reaction?access_token=${id_and_token.access_token}`,
    {
      method: 'DELETE',
    }
  );
  if (res.ok) {
    return await res.json();
  } else {
    throw await apiHelper.handleError(res);
  }
};

/**
 * @desc Get a summary of the reactions of a post
 * @param postId : string : the post ID
 * @return a promise that resolves if the API went through otherwise the error
 * @success
 ```
{
    "selected": "like",
    "like": 423,
    "love": 1232,
    "laugh": 903,
    "surprise": 23,
    "mad": 43,
    "sad": 12
}
  ```
*/
const GetReactions = async (postId: string): Promise<ReactionsType | Error> => {
  const id_and_token = apiHelper.get_id_and_token_redux();
  if (!id_and_token) {
    throw 'Unable to retrieve userID and/or access_token from redux store';
  }
  const res = await global.fetch(
    `${config.server}/api/posts/${postId}/reaction?access_token=${id_and_token.access_token}`
  );
  if (res.ok) {
    return await res.json();
  } else {
    throw await apiHelper.handleError(res);
  }
};

export default {
  GetAll,
  GetByID,
  Edit,
  Delete,
  ListComments,
  AddReaction,
  DeleteReaction,
  GetReactions,
};
