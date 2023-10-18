import React, { useContext } from 'react'
import { useNavigate, useNavigation } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import BlogDetails from '../components/BlogDetails';
import { baseUrl } from '../baseUrl';
import Back from '../components/Back';
import Spinner from '../components/Spinner';
import '../components/components.css'
import '../components/Like.css'

const BlogPage = () => {
    const newBaseUrl = "https://codehelp-apis.vercel.app/api/";
    const [blog, setBlog] = useState(null);
    const[relatedblogs, setRelatedBlogs] = useState([]);
    const location = useLocation();
    const {setLoading, loading} = useContext(AppContext);

    const blogId = location.pathname.split("/").at(-1);

    //fetch data for particular blogid, which we have not done in app.js
    async function fetchRelatedBlogs() {
        setLoading(true);

        //this url give data in blog and related
        let url = `${newBaseUrl}get-blog?blogId=${blogId}`;

        console.log("URL is: ");
        console.log(url);
        try {
            const res = await fetch(url);
            const data = await res.json();
            
            setBlog(data.blog);
            setRelatedBlogs(data.relatedBlogs);
        }
        catch(error) {
            console.log("Error aagya in blog id wali call");
            setBlog(null);
            setRelatedBlogs([]);
        }
        setLoading(false);
    }

    useEffect( () => {
        if(blogId) {
            fetchRelatedBlogs();
        }
    }, [location.pathname] )


  return (
    <div className='' >
      <Header/>
      <div className='mt-28 pl-10'>
        <Back/>
      </div>
      {
        loading ?
        (<Spinner/>) :
        blog ?
        (<div className="flex flex-col p-10 pt-0 pb-16">

            <div className=' selectedBlog Blog p-12 pt-0 shadow-xl hover:bg-zinc-300 hover:drop-shadow-2xl transition-all duration-500 rounded-lg bg-zinc-200 mt-8 relative'>
                <BlogDetails post={blog}/>
            </div>
            <h2 className='mt-20 -mb-6 text-red-400 font-extrabold text-[24px]'> Related Blogs </h2>
            {
                relatedblogs.map((post) => (
                    <div key = {post.id}>
                        <BlogDetails post={post} />
                    </div>
                ) )
            }

        </div>) :
        (<div>
            <p>No Blog Found</p>
        </div>)
       
      }


    </div>
  )
}

export default BlogPage
