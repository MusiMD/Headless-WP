import { getAllPosts } from "@/lib/posts";
import { useState } from "react";

const LoadMore = ({posts, setPosts, taxonomy}) => {

    const [buttonText, setButtonText] = useState("Load More")
    const [buttonDisabled, setButtonDisabled] = useState(false)

    const handleLoadMore = async (event) => {

            setButtonText("Loading...")
            setButtonDisabled(true)
        
        const morePosts = await getAllPosts(posts.pageInfo.endCursor, taxonomy);
    
        let updatedPosts = {
            pageInfo : {
    
            },
            nodes : [],
        }
    
        updatedPosts.pageInfo = morePosts.pageInfo;
    
        posts.nodes.map((node) => (
            updatedPosts.nodes.push(node)
        ));
    
        morePosts.nodes.map((node) => (
            updatedPosts.nodes.push(node)
        ));
    
        setPosts(updatedPosts)
        if(morePosts.pageInfo.hasNextPage){
            setButtonText("Load More")
            setButtonDisabled(false)
        }
        else{
            setButtonText("No more posts to load")
            setButtonDisabled(true)
        }
    }

    return (
        <button onClick={handleLoadMore} disabled={buttonDisabled || !posts.pageInfo.hasNextPage}>
            {posts.pageInfo.hasNextPage ? buttonText : posts.pageInfo.startCursor == null ? "Nothing found" : "No more posts to load"} 
        </button>
    )
}

export default LoadMore