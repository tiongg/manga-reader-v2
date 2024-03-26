import {
  AuthorAttributes,
  CoverAttributes,
  Relationship,
  TagAttributes,
} from 'mangadex-client';

//Random missing types api is missing
export type AuthorRelation = Relationship & {
  attributes: AuthorAttributes;
};

export type TagRelation = Relationship & {
  attributes: TagAttributes;
};

export type CoverArtRelation = Relationship & {
  attributes: CoverAttributes;
};
