/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateTODO = /* GraphQL */ `subscription OnCreateTODO(
  $filter: ModelSubscriptionTODOFilterInput
  $owner: String
) {
  onCreateTODO(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnCreateTODOSubscriptionVariables,
  APITypes.OnCreateTODOSubscription
>;
export const onUpdateTODO = /* GraphQL */ `subscription OnUpdateTODO(
  $filter: ModelSubscriptionTODOFilterInput
  $owner: String
) {
  onUpdateTODO(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateTODOSubscriptionVariables,
  APITypes.OnUpdateTODOSubscription
>;
export const onDeleteTODO = /* GraphQL */ `subscription OnDeleteTODO(
  $filter: ModelSubscriptionTODOFilterInput
  $owner: String
) {
  onDeleteTODO(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteTODOSubscriptionVariables,
  APITypes.OnDeleteTODOSubscription
>;
