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

describe('API Tests', () => {
  describe('Comment Tests', () => {
    let user = {} as any;
    let postID = '';
    let commentID = '';
    beforeAll(async () => {
      user = helper.getFakeUser();
      await api.Auth.SignUp(user.email, user.phone_number, user.username,
        user.password, user.first_name, user.last_name);
      postID = (await api.Post.GetAll())[0]._id;
    });
    it('Create - Successfully make a comment', async () => {
      const { _id } = await api.Comments.Create(postID, 'my comment');
      expect(typeof _id).toEqual('string');
      commentID = _id;
    });
    it('Create - Empty comment not successful', async () => {
      await expect(api.Comments.Create(postID, '')).rejects.toBeTruthy();
    });
    it('GetByID - Retrieve a comment and validate type', async () => {
      const comment = await api.Comments.GetByID(commentID);
      validators.validateType(CommentType, comment);
    });
    it('Like - Successfully like a comment', async () => {
      await api.Comments.Like(commentID);
      const comment = await api.Comments.GetByID(commentID);
      expect(comment.liked).toBeTruthy();
    });
    it('Unlike - Successfully unlike a comment', async () => {
      await api.Comments.Unlike(commentID);
      const comment = await api.Comments.GetByID(commentID);
      expect(comment.liked).toBeFalsy();
    });
    it('List replies - Should be empty', async () => {
      const replies = await api.Comments.ListReplies(commentID);
      expect(replies.length).toEqual(0);
    });
    it('Delete comment - Should succeed and next GET should fail', async () => {
      await api.Comments.Delete(commentID);
      await expect(api.Comments.GetByID(commentID)).rejects.toBeTruthy();
    });
  });
});
