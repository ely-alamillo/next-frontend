import * as React from "react";
import Link from "next/link";
import Layout from "../components/Layout";
import { LoginComponent } from "../generated/apolloComponents";

const IndexPage: React.FunctionComponent = () => {
  return (
    <Layout title="Home | Next.js + TypeScript Example">
      <h1>Hello Next.js 👋</h1>
      <p>
        <Link href="/about">
          <a>About</a>
        </Link>
      </p>
      <LoginComponent>
        {mutate => (
          <button
            onClick={async () => {
              const res = await mutate({
                variables: { email: "john@me.com", password: "password" }
              });

              if (res && res.data) {
                // do stuff
              }
              console.log({ res });
            }}
          >
            Login
          </button>
        )}
      </LoginComponent>
    </Layout>
  );
};

export default IndexPage;
