import gql from 'graphql-tag';

export const forgotPasswordMutation = gql`
  mutation forgotPassword($email: String!) {
    forgotPassword(email: $email)
  }
`;
