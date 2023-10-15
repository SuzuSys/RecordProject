/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const createTODO = /* GraphQL */ `mutation CreateTODO(
  $input: CreateTODOInput!
  $condition: ModelTODOConditionInput
) {
  createTODO(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateTODOMutationVariables,
  APITypes.CreateTODOMutation
>;
export const updateTODO = /* GraphQL */ `mutation UpdateTODO(
  $input: UpdateTODOInput!
  $condition: ModelTODOConditionInput
) {
  updateTODO(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateTODOMutationVariables,
  APITypes.UpdateTODOMutation
>;
export const deleteTODO = /* GraphQL */ `mutation DeleteTODO(
  $input: DeleteTODOInput!
  $condition: ModelTODOConditionInput
) {
  deleteTODO(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteTODOMutationVariables,
  APITypes.DeleteTODOMutation
>;
