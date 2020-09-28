/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */
/**
 * @author Matthew P. Burruss
 * @date Sep 2020
 * @desc Re-usable types for all things search related
 */

export type SearchResultsType = {
  data: {
    _id: string;
    username: string;
    first_name?: string;
    last_name?: string;
    profile_photo: {
      mimetype: string;
      key: string;
      blurhash: string;
    };
  };
  score: number;
} | null;
