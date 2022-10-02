import Head from "next/head";
import { ReactElement, ReactNode } from "react";

interface BaseLayoutProps {
  children?: ReactNode;
}

export default function BaseLayout({
  children,
}: BaseLayoutProps): ReactElement {
  return (
    <div>
      <Head>
        <title>Pol.Lit</title>
        <meta name="description" content="Political Literacy Enhanced" />
        <link rel="icon" href="/gavel.png" />
      </Head>
      {children}
    </div>
  );
}
