import Head from "next/head";

const HeadComponent = () => {
  return (
    <Head>
      <title>Novacontact</title>
      <meta
        name="description"
        content="Bienvenido a mi aplicación con Next.js"
      />
      <link rel="icon" href="/NovaContactLogo.svg" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
  );
};

export default HeadComponent;
