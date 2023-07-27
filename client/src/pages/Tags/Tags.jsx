import React from 'react'
import LeftSideBar from '../../components/LeftSidebar/LeftSideBar'
import TagsList from './TagsList'
const Tags = () => {
    const tagsList=[{
        id:1,
        tagName:"python",
        tagDesc:"Python is one of the most easily understanding programing languages"
    },{
        id:2,
        tagName:"css",
        tagDesc:"Python is one of the most easily understanding programing languages"
    },
    {
        id:3,
        tagName:"React",
        tagDesc:"Python is one of the most easily understanding programing languages"
    },
    {
        id:4,
        tagName:"JS",
        tagDesc:"Python is one of the most easily understanding programing languages"
    },
    {
        id:5,
        tagName:"Java",
        tagDesc:"Python is one of the most easily understanding programing languages"
    },
    {
        id:6,
        tagName:"R",
        tagDesc:"Python is one of the most easily understanding programing languages"
    }]
  return (
    <div className='home-container-1'>
     <LeftSideBar/>
    <div className="home-container-2">
        <h1 className='tags-h1'>
            Tags
        </h1>
        <p className='tags-p'>
        A tags a keyword or label that categorizes your question with other similar questions.</p> 
        <p className='tags-p'>Using the night taas makes it easier for others to find and answer your question</p>
        <div className='tags-list-container'>
        {
            tagsList.map((tag)=>(
                <TagsList tag={tag} key={tagsList.id} />
            ))
        }
        </div>
    </div>
    
    </div>
  )
}

export default Tags
