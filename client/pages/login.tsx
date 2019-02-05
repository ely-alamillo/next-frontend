import Layout from '../components/Layout';
import React from 'react';
import { Field, Formik } from 'formik';
import { InputField } from '../components/Fields/InputField';
import { LoginComponent } from '../generated/apolloComponents';
import Router from 'next/router';

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
                variables: data
              });

              if (response && response.data && !response.data.login) {
                setErrors({ email: 'invalid login' });
                return;
              }
              console.log(response);
              Router.push('/yourpage');
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
