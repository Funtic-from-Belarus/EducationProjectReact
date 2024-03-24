import React, { useEffect, useMemo, useRef, useState } from 'react'
// import Counter from './components/Counter'
// import ClassCounter from './components/ClassCounter';
import '../styles/App.css'
// import PostItem from './components/PostItem';
import PostList from '../components/PostList';
import PostForm from '../components/PostForm';
import PostFilter from '../components/PostFilter';
import MyModal from '../components/UI/MyModal/MyModal';
import MyButton from '../components/UI/button/MyButton';
import { usePosts } from '../hooks/usePosts';
import axios from 'axios';
import PostService from '../API/PostService';
import Loader from '../components/UI/Loader/Loader';
import { useFetching } from '../hooks/useFetching';
import { getPageCount, getPagesArray } from '../utils/pages';
import Pagination from '../components/UI/pagination/Pagination';
import { useObserver } from '../hooks/useObserver';
import MySelect from '../components/UI/select/MySelect';

function Posts() {

   const [posts, setPosts] = useState([])
   const [filter, setFilter] = useState({ sort: '', query: '' })
   const [modal, setModal] = useState(false);
   const [limit, setLimit] = useState(10);
   const [page, setPage] = useState(1);
   const [totalPages, setTotalPages] = useState(0);
   let lastElement = useRef()

   const [fetchPosts, isPostsLoading, errorMessage] = useFetching(async () => {
      const response = await PostService.getAll(limit, page);
      setPosts([...posts, ...response.data]);
      const totalCount = response.headers['x-total-count']
      setTotalPages(getPageCount(totalCount, limit))
   })

   useObserver(lastElement, page < totalPages, isPostsLoading, () => {
      setPage(page + 1);
   })


   useEffect(() => {
      fetchPosts();
   }, [page, limit])

   const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)

   const create = (newPost) => {
      setPosts([...posts, newPost])
      setModal(false)
   }

   const remove = (post) => {
      setPosts(posts.filter(p => p.id !== post.id))
   }

   const changePage = (page) => {
      setPage(page);
   }



   return (
      <div className="App">
         <MyButton style={{ marginTop: 30 }} onClick={() => setModal(true)}>Create a post</MyButton>
         <MyModal
            visible={modal}
            setVisible={setModal}
         >
            <PostForm create={create} />
         </MyModal>
         <hr style={{ margin: '15px 0' }} />
         <PostFilter filter={filter} setFilter={setFilter} />
         {errorMessage &&
            <h1>The error is ${errorMessage}</h1>
         }
         <MySelect
            value={limit}
            onChange={value => setLimit(value)}
            defaultValue='Amount of element on the page'
            options={[
               { value: 5, name: '5' },
               { value: 10, name: '10' },
               { value: 25, name: '25' },
               { value: -1, name: 'show all element' },
            ]}
         />
         <PostList remove={remove} posts={sortedAndSearchedPosts} title='The javascript list' />
         <div ref={lastElement} style={{ height: 20 }} />
         {isPostsLoading &&
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 50 }}><Loader /></div>
         }
         <Pagination
            totalPages={totalPages}
            changePage={changePage}
            page={page}
         />
      </div>
   );
}

export default Posts;

