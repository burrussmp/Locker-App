'use strict';
import config from 'config';
import apiHelper from 'api/helper';
import {ReplyType} from 'api/replies';

export type CommentType = {
  _id: string;
  text: string;
  postedBy: string;
  createdAt: string;
  likes: number;
  liked: boolean;
};

/**
 * @desc Adds a comment to a post and returns the id of the newly created comment
 * @param postId : string : the post ID
 * @param text : string : the text of the comment
 * @return a promise that resolves if the API went through otherwise the error
 * @success
 ```
  {
      "_id": "5f400fb18b012a65ef46044b",
  }
  ```
*/
const Create = async (
  postId: string,
  text: string
): Promise<[{_id: string}] | Error> => {
  const id_and_token = apiHelper.get_id_and_token_redux();
  if (!id_and_token) {
    throw 'Unable to retrieve userID and/or access_token from redux store';
  }
  const data = {
    text: text,
  };
  const res = await global.fetch(
    `${config.server}/api/${postId}/comments?access_token=${id_and_token.access_token}`,
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
    throw await apiHelper.handleError(res);
  }
};

/**
 * @desc Retrieve a comment by ID and return information like who liked it, when it was created, who posted it, etc.
 * @param commentID : string : the comment ID
 * @return a promise that resolves if the API went through otherwise the error
 * @success
 ```
  {
      "_id": "5f400fb18b012a65ef46044b",
  }
  ```
*/
const GetByID = async (commentID: string): Promise<CommentType | Error> => {
  const id_and_token = apiHelper.get_id_and_token_redux();
  if (!id_and_token) {
    throw 'Unable to retrieve userID and/or access_token from redux store';
  }
  const res = await global.fetch(
    `${config.server}/api/comments/${commentID}?access_token=${id_and_token.access_token}`
  );
  if (res.ok) {
    return await res.json();
  } else {
    throw await apiHelper.handleError(res);
  }
};

/**
 * @desc Like a comment
 * @param commentID : string : the comment ID
 * @return a promise that resolves if the API went through otherwise the error
 * @success
 ```
{
  "message" : "Successfully liked a comment"
}
  ```
*/
const Like = async (commentID: string): Promise<{message: string} | Error> => {
  const id_and_token = apiHelper.get_id_and_token_redux();
  if (!id_and_token) {
    throw 'Unable to retrieve userID and/or access_token from redux store';
  }
  const res = await global.fetch(
    `${config.server}/api/${commentID}/likes?access_token=${id_and_token.access_token}`,
    {
      method: 'PUT',
    }
  );
  if (res.ok) {
    return await res.json();
  } else {
    throw await apiHelper.handleError(res);
  }
};

/**
 * @desc Unlike a comment
 * @param commentID : string : the comment ID
 * @return a promise that resolves if the API went through otherwise the error
 * @success
 ```
{
  "message" : "Successfully unliked a comment"
}
  ```
*/
const Unlike = async (
  commentID: string
): Promise<{message: string} | Error> => {
  const id_and_token = apiHelper.get_id_and_token_redux();
  if (!id_and_token) {
    throw 'Unable to retrieve userID and/or access_token from redux store';
  }
  const res = await global.fetch(
    `${config.server}/api/${commentID}/likes?access_token=${id_and_token.access_token}`,
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
 * @desc Delete a comment (returns the deleted comments ID)
 * @param commentID : string : the comment ID
 * @return a promise that resolves if the API went through otherwise the error
 * @success
 ```
  {
    "_id": "5f41f6056bb02a7b13f269e9"
  }
  ```
*/
const Delete = async (commentID: string): Promise<{_id: string} | Error> => {
  const id_and_token = apiHelper.get_id_and_token_redux();
  if (!id_and_token) {
    throw 'Unable to retrieve userID and/or access_token from redux store';
  }
  const res = await global.fetch(
    `${config.server}/api/comments/${commentID}?access_token=${id_and_token.access_token}`,
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
 * @desc List all the replies of a comment
 * @param commentID : string : the comment ID
 * @return a promise that resolves if the API went through otherwise the error
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
const ListReplies = async (commentID: string): Promise<[ReplyType] | Error> => {
  const id_and_token = apiHelper.get_id_and_token_redux();
  if (!id_and_token) {
    throw 'Unable to retrieve userID and/or access_token from redux store';
  }
  const res = await global.fetch(
    `${config.server}/api/${commentID}/replies?access_token=${id_and_token.access_token}`
  );
  if (res.ok) {
    return await res.json();
  } else {
    throw await apiHelper.handleError(res);
  }
};

export default {
  Create,
  GetByID,
  Like,
  Unlike,
  Delete,
  ListReplies,
};
