const RenderBlock = ({ block }) => {
  switch (block.name) {
    case 'core/paragraph':
      return (
        <p dangerouslySetInnerHTML={{ __html: block.attributes?.content }} />
      );

    case 'core/heading':
      const Tag = `h${block.attributes?.level || 2}`;
      return (
        <Tag dangerouslySetInnerHTML={{ __html: block.attributes?.content }} />
      );

    case 'core/columns':
      return (
        <div className="columns md:flex justify-between">
          {block.innerBlocks.map((innerBlock, index) => (
            <RenderBlock block={innerBlock} key={index} />
          ))}
        </div>
      );

    case 'core/column':
      return (
        <div className="column md:w-[48%]">
          {block.innerBlocks.map((innerBlock, index) => (
            <RenderBlock block={innerBlock} key={index} />
          ))}
        </div>
      );

    case 'core/image':
      return (
        <img
          src={block.attributes.url}
          alt={block.attributes.alt || 'Image'}
        />
      );


    default:
      return null;
  }
};


const RenderBlocks = ({ blocks }) => {
  return blocks.map((block, index) => (
    <RenderBlock block={block} key={index} />
  ));
};

export default RenderBlocks;
