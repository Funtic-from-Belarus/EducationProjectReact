import React from 'react'
import MySelect from './UI/select/MySelect';
import MyInput from './UI/input/MyInput';

const PostFilter = ({ filter, setFilter }) => {
   return (
      <div>
         <MyInput
            value={filter.query}
            placeholder='Search...'
            onChange={e => setFilter({ ...filter, query: e.target.value })}
         />
         <MySelect
            value={filter.sort}
            onChange={selectedSort => setFilter({ ...filter, sort: selectedSort })}
            defaultValue='Sort'
            options={[
               { value: 'title', name: 'Sort by title' },
               { value: 'body', name: 'Sort by description' },
            ]}
         />
      </div>
   )
}

export default PostFilter
