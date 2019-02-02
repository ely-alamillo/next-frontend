import React from 'react';
import { MyContext } from '../interfaces/MyContext';
import {
  ConfirmUserMutation,
  ConfirmUserVariables
} from '../generated/apolloComponents';
import { confirmUserMutation } from '../graphql/User/mutations/confirmUser';
import redirect from '../lib/redirect';

export default class Confirm extends React.PureComponent {
  static async getInitialProps({
    query: { token },
    apolloClient,
    ...ctx
  }: MyContext) {
    if (!token) {
      return {};
    }

    await apolloClient.mutate<ConfirmUserMutation, ConfirmUserVariables>({
      mutation: confirmUserMutation,
      variables: {
        token: token as string
      }
    });
    redirect(ctx, '/login');
    return {};
  }

  render() {
    return <div>Oops.. Something went wrong.</div>;
  }
}
