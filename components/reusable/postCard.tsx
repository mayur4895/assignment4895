// components/Post.tsx

import { useState } from 'react';
import axios from 'axios';
import { FaHeart, FaRegHeart, FaTrash } from 'react-icons/fa';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { DeletePost } from '@/app/actions/post/DeletePost';
import { Button } from '../ui/button';

interface PostProps {
  post: {
    id: string;
    title: string;
    content: string;
    likeCount: number;
    likedByMe: boolean;
  };
  userId: string | undefined;
}

const Post = ({ post, userId }: PostProps) => {
  const [likeCount, setLikeCount] = useState(post.likeCount);
  const [likedByMe, setLikedByMe] = useState(post.likedByMe);

  const handleToggleLike = async () => {
    try {
      if (!userId) return;

      // Make the API call to toggle like
      const response = await axios.post(`/api/posts/${post.id}/toggleLike`, { userId });
      const { likeCount: newLikeCount, likedByMe: newLikedByMe } = response.data;

      // Update local state with new like count and likedByMe status
      setLikeCount(newLikeCount);
      setLikedByMe(newLikedByMe);

    } catch (error) {
      console.error('Error toggling like', error);
    }
  };

   const handleDelete = async () => {
    try {
      await DeletePost(post.id);
      window.location.reload();
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <div>
      <Card>
  <CardHeader>
    <CardTitle className=' flex items-center justify-between'>{post.title}   <Button><FaTrash className='text-red-500' onClick={handleDelete}/> </Button></CardTitle>
    <CardDescription>Card Description</CardDescription>
  </CardHeader>
  <CardContent>
    <p>{post.content}</p>
  </CardContent>
  <CardFooter>
  <button onClick={handleToggleLike} className='flex items-center gap-2'>
        {likedByMe ? (
          <>
           <FaRegHeart />
      
          </>
        ) : (
          <>
           <FaHeart style={{ color: 'red' }} />
             
       
          </>
        )} {likeCount}
      </button>
  </CardFooter>
</Card>

     
    
    </div>
  );
};

export default Post;
