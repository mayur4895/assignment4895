 
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import PostCard from './reusable/postCard';
import { Post } from '@prisma/client';
import { CurrentUser } from '@/hooks/use-current-user';
 




 
const Allposts = () => {
 

 
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const currentUser = CurrentUser();
    useEffect(() => {
        const fetchPosts = async () => {
          try {
            const response = await axios.get('/api/post'); 
            console.log(response.data);
            
            setPosts(response.data);
          } catch (error) {
            console.error("Error fetching posts:", error);
          } finally {
            setLoading(false);
          }
        };
    
        fetchPosts();
      }, []);
    
      if (loading) {
        return <p>Loading posts...</p>;
      }
  return (
    <div> 
    {posts.length === 0 ? (
      <p>No posts found</p>
    ) : (
      <ul>
        {posts.map(post => (
         <PostCard   
           post={post}
           userId={currentUser?.id}
         />
        ))}
      </ul>
    )}
  </div>
  )
}

export default Allposts
