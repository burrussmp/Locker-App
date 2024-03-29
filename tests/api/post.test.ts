/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/unbound-method */

// Import the dependencies for testing
import helper from 'tests/helper';
import api from 'api/api';
import validators from 'services/validators';
import { CommentType } from 'api/comments';
import { PostListType, PostType, ReactionsType } from 'api/post';
import * as T from 'io-ts';

describe('API Tests', () => {
  describe('Post Tests', () => {
    let user = {} as any;
    let postId = '';
    beforeAll(async () => {
      user = helper.getFakeUser();
      await api.Auth.SignUp(user.email, user.phone_number, user.username,
        user.password, user.first_name, user.last_name);
    });
    it('GetAll - Success', async () => {
      const postResult = await api.Post.GetAll();
      validators.validateType(PostListType, postResult);
      expect(postResult.length).toBeGreaterThan(0);
      postId = postResult[0]._id;
    });
    it('GetByID - Success', async () => {
      const postResult = await api.Post.GetByID(postId);
      validators.validateType(PostType, postResult);
    });
    it('GetByProductID - Success', async () => {
      const postResult = await api.Post.GetByID(postId);
      validators.validateType(PostType, postResult);
      const postResult2 = await api.Post.GetByProductID(postResult.content._id);
      validators.validateType(PostType, postResult2);
    });
    it('ListComments - Add comment and validate type', async () => {
      await api.Comments.Create(postId, 'A comment');
      const commentList = await api.Post.ListComments(postId);
      validators.validateType(T.array(CommentType), commentList);
      expect(commentList.length).toBeGreaterThanOrEqual(1);
    });
    it('GetReactions - Success (should be no reactions)', async () => {
      const reactions = await api.Post.GetReactions(postId);
      validators.validateType(ReactionsType, reactions);
    });
    it('AddReaction - Success', async () => {
      const { _id } = await api.Post.AddReaction(postId, 'like');
      expect(_id).toEqual(postId);
    });
    it('GetReactions - Success (should be like)', async () => {
      const reactions = await api.Post.GetReactions(postId);
      validators.validateType(ReactionsType, reactions);
      expect(reactions.selected).toEqual('like');
    });
    it('DeleteReaction - Success (should be no reactions after)', async () => {
      const { _id } = await api.Post.DeleteReaction(postId);
      expect(_id).toEqual(postId);
      const reactions = await api.Post.GetReactions(postId);
      expect(reactions.selected).toBeFalsy();
    });
  });
});
