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
import { ReplyType } from 'api/replies';
import * as T from 'io-ts';

describe('API Tests', () => {
  describe('Organization Tests', () => {
    let user = {} as any;
    let commentID = '';
    let replyID = '';
    beforeAll(async () => {
      user = helper.getFakeUser();
      await api.Auth.SignUp(user.email, user.phone_number, user.username,
        user.password, user.first_name, user.last_name);
      const postID = (await api.Post.GetAll())[0]._id;
      commentID = (await api.Comments.Create(postID, 'test'))._id;
    });
    it('Create - Successfully make a reply to a comment', async () => {
      replyID = (await api.Replies.Create(commentID, 'my reply'))._id;
      expect(typeof replyID).toEqual('string');
      const allReplies = await api.Comments.ListReplies(commentID);
      validators.validateType(T.array(ReplyType), allReplies);
      expect(allReplies.length).toEqual(1);
    });
    it('Create - Empty reply not successful', async () => {
      await expect(api.Replies.Create(commentID, '')).rejects.toBeTruthy();
    });
    it('GetByID - Retrieve a reply and validate type', async () => {
      const reply = await api.Replies.GetByID(commentID, replyID);
      validators.validateType(ReplyType, reply);
    });
    it('Like - Successfully like a reply', async () => {
      await api.Replies.Like(commentID, replyID);
      const comment = await api.Replies.GetByID(commentID, replyID);
      expect(comment.liked).toBeTruthy();
    });
    it('Unlike - Successfully unlike a reply', async () => {
      await api.Replies.Unlike(commentID, replyID);
      const comment = await api.Replies.GetByID(commentID, replyID);
      expect(comment.liked).toBeFalsy();
    });
    it('Delete reply - Should succeed and next GET should fail', async () => {
      await api.Replies.Delete(commentID, replyID);
      await expect(api.Replies.GetByID(commentID, replyID)).rejects.toBeTruthy();
    });
  });
});
