import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ResourceDetail from "../../src/components/ResourceDetail";
import { DiscussionEmbed } from "disqus-react";
import AppBar from "../../src/components/AppBar";
import Layout from "../../src/components/Layout";
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import { ResourceRequest } from "../../src/interfaces/interface";
import ResourceService from "../../src/services/ResourceService";
const Resource = ({
  id,
  resource,
}: {
  id: string;
  resource: ResourceRequest;
}): JSX.Element => {
  const router = useRouter();
  return (
    <>
      <AppBar label="Resource Request" />
      <Layout selectedKey={0}>
        <>
          <ResourceDetail />
          <div className="px-4">
            {id !== null && (
              <DiscussionEmbed
                shortname={process.env.NEXT_PUBLIC_DISCUSS_SHORT_NAME}
                config={{
                  url: `${process.env.NEXT_PUBLIC_BASE_URL}${router.asPath}`,
                  identifier: `${id}`,
                  title: "Oxygen",
                  language: "en",
                }}
              />
            )}
          </div>
        </>
      </Layout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id: string = Array.isArray(context.params?.id)
    ? context.params?.id[0]
    : context.params?.id;
  const response = await ResourceService.fetchResourceRequestById(id);
  return {
    props: { id, resource: response },
  };
};

export default Resource;