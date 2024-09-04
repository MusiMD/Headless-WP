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


