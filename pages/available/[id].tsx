import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import AvailableResourceDetail from "../../src/components/AvailableResourceDetail";
import { DiscussionEmbed } from "disqus-react";
import AppBar from "../../src/components/AppBar";
import Layout from "../../src/components/Layout";
import { AvailableResource } from "../../src/interfaces/interface";
import { GetServerSideProps } from "next";
import ResourceService from "../../src/services/ResourceService";
import Error from "next/error";
import Head from "next/head";

const AvailableResourcePage = ({
  id,
  resource,
}: {
  id: string;
  resource: AvailableResource;
}): JSX.Element => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>{resource.name ? resource.name : "Available resource"}</title>
      </Head>
      <AppBar label="Available resource" />
      <Layout selectedKey={0}>
        {id ? (
          resource ? (
            <>
              <AvailableResourceDetail resource={resource} />
              <div className="px-4">
                <DiscussionEmbed
                  shortname={process.env.NEXT_PUBLIC_DISCUSS_SHORT_NAME}
                  config={{
                    url: `${process.env.NEXT_PUBLIC_BASE_URL}${router.asPath}`,
                    identifier: `${id}`,
                    title: resource.name,
                    language: "en",
                  }}
                />
              </div>
            </>
          ) : (
            <Error statusCode={404} />
          )
        ) : (
          <Error statusCode={400} />
        )}
      </Layout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  params,
  res,
}) => {
  const id: string = Array.isArray(params?.id) ? params?.id[0] : params?.id;
  try {
    const response = await ResourceService.fetchAvailableResourceById(id);
    return {
      props: { id, resource: response },
    };
  } catch {
    res.statusCode = 404;
    return { props: { id } };
  }
};

export default AvailableResourcePage;
