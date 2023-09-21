/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateTODO = /* GraphQL */ `
  subscription OnCreateTODO(
    $filter: ModelSubscriptionTODOFilterInput
    $owner: String
  ) {
    onCreateTODO(filter: $filter, owner: $owner) {
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
export const onUpdateTODO = /* GraphQL */ `
  subscription OnUpdateTODO(
    $filter: ModelSubscriptionTODOFilterInput
    $owner: String
  ) {
    onUpdateTODO(filter: $filter, owner: $owner) {
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
export const onDeleteTODO = /* GraphQL */ `
  subscription OnDeleteTODO(
    $filter: ModelSubscriptionTODOFilterInput
    $owner: String
  ) {
    onDeleteTODO(filter: $filter, owner: $owner) {
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
