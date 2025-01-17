import React, { useState } from "react";
import MyButton from './UI/button/MyButton';
import MyInput from './UI/input/MyInput';


const PostForm = ({ create }) => {

   const [post, setPost] = useState({ title: '', body: '' });


   const addPost = (e) => {
      e.preventDefault();
      const newPost = {
         id: Date.now(),
         ...post
      }
      create(newPost);
      setPost({ title: '', body: '' });
   }



   return (
      <form>
         {/* Управляемый компонент */}
         <MyInput
            value={post.title}
            onChange={e => setPost({ ...post, title: e.target.value })}
            type='text'
            placeholder='name post'
         ></MyInput>
         {/* Неуправляемый или неконтролируемый */}
         <MyInput
            value={post.body}
            onChange={e => setPost({ ...post, body: e.target.value })}
            type='text'
            placeholder='description of post'
         ></MyInput>
         <MyButton onClick={addPost}>create post</MyButton>
      </form>
   );
}

export default PostForm