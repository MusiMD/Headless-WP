import { gql, useQuery } from '@apollo/client';
import client from '../lib/apolloClient';

const GET_LOGO = gql`
  query GetLogo {
    media(where: { usedAs: "Logo" }) {
      nodes {
        id
        fileName
        url
        fileType
        fileSize
        dimensions {
          width
          height
        }
        uploadedOn
        uploadedBy
      }
    }
  }
`;

const Logo = () => {
  const { loading, error, data } = useQuery(GET_LOGO, { client });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const logo = data.media.nodes[0]; 

  return (
    <div>
      <img src={logo.url} alt={logo.fileName} width={logo.dimensions.width} height={logo.dimensions.height} />
      <p>Uploaded on: {logo.uploadedOn}</p>
      <p>Uploaded by: {logo.uploadedBy}</p>
      <p>File type: {logo.fileType}</p>
      <p>File size: {logo.fileSize}</p>
    </div>
  );
};

export default Logo;
