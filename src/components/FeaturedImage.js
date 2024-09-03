import Link from "next/link"
import Image from "next/image"

const FeaturedImage = ({post}) => {
    let img = '';

    const defaultFeaturedImage = "https://dev-headlessdev.pantheonsite.io/wp-content/uploads/2024/06/banner-image.webp";
    const defaultWidth = "300";
    const defaultHeight = "300";

    if(post.featuredImage && post.featuredImage.node) {
      let size = post.featuredImage.node.mediaDetails;
      let file = post.featuredImage.node

        img = {
            src : file.sourceUrl,
            width : size.width,
            height : size.height
        }
    }

    else{
      img = {
          src : defaultFeaturedImage,
          width : defaultWidth,
          height : defaultHeight
        }
    }

  return (
    <Link href={`/blog/${post.slug}`}>
        <Image src={img.src} alt="blog featured image" width="300" height="300" className=" object-cover rounded-lg"/>
    </Link>
  )
}

export default FeaturedImage