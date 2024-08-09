import { graphqlRequest } from "./graphqlRequest";

const getSeo = async (type , slug) => {
    const query = {
      query : `query getSeo {
        ${type}(id: "${slug}", idType: URI) {
            seo {
            title
            metaDesc
            schema {
                raw
            }
            opengraphTitle
            opengraphDescription
            opengraphUrl
            opengraphImage {
                mediaItemUrl
            }
            opengraphType
            opengraphSiteName
            }
        }
        }`
    };
  
    const getSeo = await graphqlRequest(query);
    const seoData = getSeo.data[type]?.seo;
    return seoData;
}
  
export { getSeo }


// pages seo data

// const getPageSeo = async (slug) => {
//     const query = {
//       query : `query getPageSeo {
//         pages(where: {name: "${slug}"}) {
//             nodes {
//                 seo {
//                     title
//                     metaDesc
//                     schema {
//                     raw
//                     }
//                     opengraphTitle
//                     opengraphDescription
//                     opengraphType
//                     opengraphUrl
//                     opengraphSiteName
//                     opengraphImage {
//                     mediaItemUrl
//                     }
//                 }
//             }
//         }
//         }`
//     };
  
//     const getPageSeo = await graphqlRequest(query);
//     const pageSeoData = getPageSeo.data.pages.nodes[0]?.seo;
//     return pageSeoData;
// }
  
// export { getPageSeo }