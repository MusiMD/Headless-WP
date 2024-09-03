import {graphqlRequest} from "./graphqlRequest"

// all posts

const getAllPosts = async (endCursor = null, taxonomy = null) => {
  let condition =  `after: "${endCursor}", first: 5, where: {orderby: {field: DATE, order: DESC}}`

  if(taxonomy){
    condition = `after: "${endCursor}", first: 5, where: {orderby: {field: DATE, order: DESC}, ${taxonomy.key}: "${taxonomy.value}"}`
  }

  const query = {
    query : `query getAllPosts {
        posts(${condition}) {
          nodes {
            date
            excerpt(format: RENDERED)
            content(format: RENDERED)
            slug
            title
            featuredImage {
              node {
                sourceUrl
                mediaDetails {
                  width
                  height                           
                }
              }
            }
            categories {
              nodes {
                name
                slug
              }
            }
            tags {
              nodes {
                name
                slug
              }
            }
          }
          pageInfo {
            endCursor
            hasNextPage
            hasPreviousPage
            startCursor
          }
        }
      }`
  };

  const resJson = await graphqlRequest(query);
  const allPosts = resJson.data.posts;
  return allPosts;
}

export { getAllPosts }


// all post slugs

const getPostSlugs = async () => {
  const query = {
    query : `query getPostSlugs {
        posts {
          nodes {
            slug
          }
        }
      }`
  };

  const resJson = await graphqlRequest(query);
  const postSlugs = resJson.data.posts.nodes;
  return postSlugs;
}

export { getPostSlugs }


// single post

const getSinglePost = async (slug) => {
  const query = {
    query : `query getSinglePost {
        post(id: "${slug}", idType: SLUG) {
          title
          excerpt(format: RENDERED)
          content(format: RENDERED)
          slug
          date
          modified
          categories {
            nodes {
              name
              slug
            }
          }
          tags {
              nodes {
                name
                slug
              }
          }
          featuredImage {
            node {
              sourceUrl
              mediaDetails {
                width
                height                           
              }
            }
          }
        }
      }`
  };

  const resJson = await graphqlRequest(query);
  const singlePost = resJson.data.post;
  return singlePost;
}

export { getSinglePost }


// all category

const getAllCategory = async () => {
  const query = {
    query : `query getAllCategory {
        categories {
          nodes {
            name
            slug
          }
        }
      }`
  };

  const resJson = await graphqlRequest(query);
  const allCategory = resJson.data.categories.nodes;
  return allCategory;
}

export { getAllCategory }


// single category

const getSingleCategory = async (category) => {
  const query = {
    query : `query getSingleCategory {
        category(id: "${category}", idType: SLUG) {
          count
          name
          slug
        }
      }`
  };

  const resJson = await graphqlRequest(query);
  const singleCategory = resJson.data.category;
  return singleCategory;
}

export { getSingleCategory }


// all tags

const getAllTags = async () => {
  const query = {
    query : `query getAllTags {
        tags {
          nodes {
            name
            slug
          }
        }
      }`
  };

  const resJson = await graphqlRequest(query);
  const allTags = resJson.data.tags.nodes;
  return allTags;
}

export { getAllTags }


// single tag

const getSingleTag = async (tag) => {
  const query = {
    query : `query getSingleTag {
        tag(id: "${tag}", idType: SLUG) {
          count
          name
          slug
        }
      }`
  };

  const resJson = await graphqlRequest(query);
  const singleTag = resJson.data.tag;
  return singleTag;
}

export { getSingleTag }