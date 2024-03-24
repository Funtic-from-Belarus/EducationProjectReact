import React from "react";
import PostItem from "./PostItem";
import { TransitionGroup, CSSTransition } from "react-transition-group";

const PostList = ({ posts, title, remove }) => {
   if (!posts.length) {
      return (
         <div><h1 style={{ textAlign: 'center' }}>There is not any posts</h1></div>
      )
   }
   return (
      <div>
         <h1 style={{ textAlign: 'center' }}>{title}</h1>
         <TransitionGroup>
            {posts.map((post, index) =>
               <CSSTransition
                  key={post.id}
                  timeout={500}
                  classNames="post"
               >
                  <PostItem remove={remove} number={index + 1} post={post} key={post.id} />
               </CSSTransition>
            )}
         </TransitionGroup>
      </div>
   )
}

export default PostList;