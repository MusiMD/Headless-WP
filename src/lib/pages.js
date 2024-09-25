import { graphqlRequest } from "./graphqlRequest";

// logo image

const getLogo = async () => {
  const query = {
    query : `query getLogo {
        mediaItems(where: {name: "logo"}) {
          nodes {
            sourceUrl
            mediaDetails {
              width
              height
            }
          }
        }
    }`
  };

  const resJson = await graphqlRequest(query);
  const logoImage = resJson.data.mediaItems.nodes;
  return logoImage;
}

export { getLogo }



// all page slugs

const getPageSlugs = async () => {
  const query = {
    query : `query getPageSlugs {
        pages {
          nodes {
            slug
          }
        }
      }`
  };

  const resJson = await graphqlRequest(query);
  const pageSlugs = resJson.data.pages?.nodes;
  return pageSlugs;
}

export { getPageSlugs }


// dynamic page

const getDynamicPage = async (slug) => {
  const query = {
    query : `query getDynamicPage {
        pages(where: {name: "${slug}"}) {
          nodes {
              content(format: RENDERED)
              date
              modified
              slug
              title
              pageId
              blocks(attributes: true)
          }
        }
      }`
  };

  const resJson = await graphqlRequest(query);
  const dynamicPage = resJson.data.pages.nodes[0];
  return dynamicPage;
}

export { getDynamicPage }


// single page

// const getSinglePage = async (slug) => {
//   const query = {
//     query : `query getSinglePage {
//         page(id: "${slug}", idType: URI) {
//           content(format: RENDERED)
//           date
//           id
//           slug
//           title
//           modified
//         }
//       }`
//   };

//   const resJson = await graphqlRequest(query);
//   const singlePage = resJson.data.page;
//   return singlePage;
// }

// export { getSinglePage }
