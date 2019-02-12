import Layout from '../components/Layout';
import React from 'react';
import { Field, Formik } from 'formik';
import { InputField } from '../components/Fields/InputField';
import { LoginComponent, MeQuery } from '../generated/apolloComponents';
import Router from 'next/router';
import { meQuery } from '../graphql/User/queries/me';

export default () => {
  return (
    <Layout title="Login Page">
      <LoginComponent>
        {login => (
          <Formik
            validateOnBlur={false}
            validateOnChange={false}
            onSubmit={async (data, { setErrors }) => {
              const response = await login({
                // tslint:disable
                variables: data,
                update: (cache, { data }) => {
                  if (!data || !data.login) {
                    return;
                  }

                  cache.writeQuery<MeQuery>({
                    query: meQuery,
                    data: {
                      me: data.login
                    }
                  });
                }
              });

              if (response && response.data && !response.data.login) {
                setErrors({ email: 'invalid login' });
                return;
              }
              console.log(response);
              Router.push('/hello');
            }}
            initialValues={{
              email: '',
              firstName: '',
              lastName: '',
              password: ''
            }}
          >
            {({ handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <Field
                  name="email"
                  placeholder="email"
                  component={InputField}
                />
                <Field
                  name="password"
                  placeholder="password"
                  type="password"
                  component={InputField}
                />
                <button type="submit">submit</button>
              </form>
            )}
          </Formik>
        )}
      </LoginComponent>
    </Layout>
  );
};
