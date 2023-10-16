import React from 'react'
import { NavLink } from 'react-router-dom'

const BlogDetails = ({post}) => {
  return (
    <div className='mt-[50px]'>
      <NavLink to={`/blog/${post.id}`} >                  {/* we need title to be clickable link*/}
        <span className='font-bold '>{post.title}</span>    
      </NavLink>
      <p className="text-slate-500 italic sm:text-[13px] text-[12px]">
        By
        <span> {post.author}</span>
        on {" "}
        <NavLink to={`/categories/${post.category.replaceAll(" ","-")}`}> {/* we need category to be clickable link*/}
            <span className="font-semibold underline text-[14px]">{post.category}</span>
        </NavLink>
      </p>
      <p className="text-slate-500 italic sm:text-[13px] text-[12px] mb-2"> Posted on {post.date} </p>
      <p className='font-normal'> {post.content}</p>
      <div className='mt-1'>
        {post.tags.map( (tag, index) => (
            <NavLink key={index} to={`/tags/${tag.replaceAll(" ","-")}`}> {/* we need tag to be clickable link*/}
                <span className='text-blue-600 hover:text-blue-500 mr-1 underline text-[14px]'>{`#${tag.replaceAll(" ","")}`} </span>
            </NavLink>
        ) )}
      </div>
    </div>
  )
}

export default BlogDetails
