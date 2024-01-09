/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const createChat = /* GraphQL */ `mutation CreateChat(
  $input: CreateChatInput!
  $condition: ModelChatConditionInput
) {
  createChat(input: $input, condition: $condition) {
    id
    text
    email
    members
    sortKey
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateChatMutationVariables,
  APITypes.CreateChatMutation
>;
export const updateChat = /* GraphQL */ `mutation UpdateChat(
  $input: UpdateChatInput!
  $condition: ModelChatConditionInput
) {
  updateChat(input: $input, condition: $condition) {
    id
    text
    email
    members
    sortKey
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateChatMutationVariables,
  APITypes.UpdateChatMutation
>;
export const deleteChat = /* GraphQL */ `mutation DeleteChat(
  $input: DeleteChatInput!
  $condition: ModelChatConditionInput
) {
  deleteChat(input: $input, condition: $condition) {
    id
    text
    email
    members
    sortKey
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteChatMutationVariables,
  APITypes.DeleteChatMutation
>;
