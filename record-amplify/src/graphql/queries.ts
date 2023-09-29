/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "@/API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const verifySetup = /* GraphQL */ `query VerifySetup {
  verifySetup
}
` as GeneratedQuery<
  undefined,
  APITypes.VerifySetupQuery
>;
export const getTODO = /* GraphQL */ `query GetTODO($id: ID!) {
  getTODO(id: $id) {
    id
    label
    predecessor
    successor
    deadline
    description
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedQuery<APITypes.GetTODOQueryVariables, APITypes.GetTODOQuery>;
export const listTODOS = /* GraphQL */ `query ListTODOS(
  $filter: ModelTODOFilterInput
  $limit: Int
  $nextToken: String
) {
  listTODOS(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      label
      predecessor
      successor
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
` as GeneratedQuery<APITypes.ListTODOSQueryVariables, APITypes.ListTODOSQuery>;
