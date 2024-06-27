import { db } from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

type ToggleLikeResponse = {
  likeCount: number;
  likedByMe: boolean;
};

export async function POST(req: Request,
    {params}:{params:{postId:string}}
) {


    if (!params.postId) {
        return NextResponse.json("postId not found", { status: 400 });
      }
  
      const { userId } = await req.json();
  
      if (!userId) {
        return NextResponse.json("UserId not provided", { status: 400 });
      }
    

    



      const existingLike = await db.like.findUnique({
        where: {
          postId_userId: {
            postId: params.postId,
            userId,
          },
        },
      });
  

  if (!userId) {
    return NextResponse.json({ error: "UserId not provided" });
  }

  try {
    const existingLike = await db.like.findUnique({
      where: {
        postId_userId: {
          postId:  params.postId,
          userId,
        },
      },
    });

    if (existingLike) {
      // User already liked the post, so remove the like
      await db.like.delete({
        where: {
          postId_userId: {
            postId:  params.postId,
            userId,
          },
        },
      });
    } else {
      // User hasn't liked the post, so create a new like
      await db.like.create({
        data: {
          userId,
          postId: params.postId,
        },
      });
    }

    const updatedPost = await db.post.findUnique({
      where: { id: params.postId },
      include: {
        likes: true,
      },
    });

    if (!updatedPost) {
        return NextResponse.json("not found post", { status: 400 });
    }

    const likedByMe = !!existingLike;

    const response: ToggleLikeResponse = {
      likeCount: updatedPost.likes.length,
      likedByMe,
    };

    return  NextResponse.json(response);
  } catch (error) {
    console.error("Error toggling like:", error);
    return NextResponse.json("Internal Server error", { status: 500 });
  }
    //   if (existingLike) {
 
    //     if (existingLike) {
    //         // User already liked the post, so remove the like
    //         await db.like.delete({
    //           where: {
    //             postId_userId: {
    //               postId:params.postId,
    //               userId,
    //             },
    //           },
    //         });
    //       } else {
    //         // User hasn't liked the post, so create a new like
    //         await db.like.create({
    //           data: {
    //             userId,
    //             postId:params.postId,
    //           },
    //         });
    //       }
    //     }
  
 
    //   const updatedPost = await db.post.findUnique({
    //     where: { id: params.postId },
    //     include: {
    //       likes: true,
    //     },
    //   });
  
    //   if (!updatedPost) {
    //     return NextResponse.json("Post not found", { status: 404 });
    //   }
   
     
    //   const likedByMe = !!existingLike;
  
    //   const response: ToggleLikeResponse = {
    //     likeCount: updatedPost.likes.length,
    //     likedByMe,
    //   };
  
 
    //   return NextResponse.json(response); 
}
