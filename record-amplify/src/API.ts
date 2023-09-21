/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateTODOInput = {
  id?: string | null,
  label: string,
  priority: number,
  deadline?: string | null,
  description?: string | null,
};

export type ModelTODOConditionInput = {
  label?: ModelStringInput | null,
  priority?: ModelIntInput | null,
  deadline?: ModelStringInput | null,
  description?: ModelStringInput | null,
  and?: Array< ModelTODOConditionInput | null > | null,
  or?: Array< ModelTODOConditionInput | null > | null,
  not?: ModelTODOConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type TODO = {
  __typename: "TODO",
  id: string,
  label: string,
  priority: number,
  deadline?: string | null,
  description?: string | null,
  createdAt: string,
  updatedAt: string,
  owner?: string | null,
};

export type UpdateTODOInput = {
  id: string,
  label?: string | null,
  priority?: number | null,
  deadline?: string | null,
  description?: string | null,
};

export type DeleteTODOInput = {
  id: string,
};

export type ModelTODOFilterInput = {
  id?: ModelIDInput | null,
  label?: ModelStringInput | null,
  priority?: ModelIntInput | null,
  deadline?: ModelStringInput | null,
  description?: ModelStringInput | null,
  and?: Array< ModelTODOFilterInput | null > | null,
  or?: Array< ModelTODOFilterInput | null > | null,
  not?: ModelTODOFilterInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelTODOConnection = {
  __typename: "ModelTODOConnection",
  items:  Array<TODO | null >,
  nextToken?: string | null,
};

export type ModelSubscriptionTODOFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  label?: ModelSubscriptionStringInput | null,
  priority?: ModelSubscriptionIntInput | null,
  deadline?: ModelSubscriptionStringInput | null,
  description?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionTODOFilterInput | null > | null,
  or?: Array< ModelSubscriptionTODOFilterInput | null > | null,
};

export type ModelSubscriptionIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  in?: Array< number | null > | null,
  notIn?: Array< number | null > | null,
};

export type CreateTODOMutationVariables = {
  input: CreateTODOInput,
  condition?: ModelTODOConditionInput | null,
};

export type CreateTODOMutation = {
  createTODO?:  {
    __typename: "TODO",
    id: string,
    label: string,
    priority: number,
    deadline?: string | null,
    description?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type UpdateTODOMutationVariables = {
  input: UpdateTODOInput,
  condition?: ModelTODOConditionInput | null,
};

export type UpdateTODOMutation = {
  updateTODO?:  {
    __typename: "TODO",
    id: string,
    label: string,
    priority: number,
    deadline?: string | null,
    description?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type DeleteTODOMutationVariables = {
  input: DeleteTODOInput,
  condition?: ModelTODOConditionInput | null,
};

export type DeleteTODOMutation = {
  deleteTODO?:  {
    __typename: "TODO",
    id: string,
    label: string,
    priority: number,
    deadline?: string | null,
    description?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type GetTODOQueryVariables = {
  id: string,
};

export type GetTODOQuery = {
  getTODO?:  {
    __typename: "TODO",
    id: string,
    label: string,
    priority: number,
    deadline?: string | null,
    description?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type ListTODOSQueryVariables = {
  filter?: ModelTODOFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListTODOSQuery = {
  listTODOS?:  {
    __typename: "ModelTODOConnection",
    items:  Array< {
      __typename: "TODO",
      id: string,
      label: string,
      priority: number,
      deadline?: string | null,
      description?: string | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateTODOSubscriptionVariables = {
  filter?: ModelSubscriptionTODOFilterInput | null,
  owner?: string | null,
};

export type OnCreateTODOSubscription = {
  onCreateTODO?:  {
    __typename: "TODO",
    id: string,
    label: string,
    priority: number,
    deadline?: string | null,
    description?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnUpdateTODOSubscriptionVariables = {
  filter?: ModelSubscriptionTODOFilterInput | null,
  owner?: string | null,
};

export type OnUpdateTODOSubscription = {
  onUpdateTODO?:  {
    __typename: "TODO",
    id: string,
    label: string,
    priority: number,
    deadline?: string | null,
    description?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnDeleteTODOSubscriptionVariables = {
  filter?: ModelSubscriptionTODOFilterInput | null,
  owner?: string | null,
};

export type OnDeleteTODOSubscription = {
  onDeleteTODO?:  {
    __typename: "TODO",
    id: string,
    label: string,
    priority: number,
    deadline?: string | null,
    description?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};
