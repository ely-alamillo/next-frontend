import Layout from "../components/Layout";
import React from "react";
import { Field, Formik } from "formik";
import { InputField } from "../components/Fields/InputField";
import { RegisterComponent } from "../generated/apolloComponents";
import Router from "next/router";

export default () => {
  return (
    <Layout title="Register page">
      <RegisterComponent>
        {register => (
          <Formik
            validateOnBlur={false}
            validateOnChange={false}
            onSubmit={async (data, { setErrors }) => {
              try {
                const response = await register({
                  variables: {
                    data
                  }
                });
                console.log(response);
                Router.push('/check-email')
              } catch (e) {
                const errors: { [key: string]: string } = {};
                e.graphQLErrors[0].validationErrors.forEach((x: any) => {
                  Object.values(x.constraints).forEach((msg: any) => {
                    errors[x.property] = msg;
                  });
                });
                console.log(errors);
                setErrors(errors);
              }
            }}
            initialValues={{
              email: "",
              firstName: "",
              lastName: "",
              password: ""
            }}
          >
            {({ handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <Field
                  name="firstName"
                  placeholder="firstName"
                  component={InputField}
                />
                <Field
                  name="lastName"
                  placeholder="lastName"
                  component={InputField}
                />
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
      </RegisterComponent>
    </Layout>
  );
};
