/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getTODO = /* GraphQL */ `
  query GetTODO($id: ID!) {
    getTODO(id: $id) {
      id
      label
      priority
      deadline
      description
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const listTODOS = /* GraphQL */ `
  query ListTODOS(
    $filter: ModelTODOFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTODOS(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        label
        priority
        deadline
        description
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
  }
`;
