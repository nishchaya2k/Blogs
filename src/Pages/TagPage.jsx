import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Pagination from '../components/Pagination';
import Blogs from '../components/Blogs';
import Back from '../components/Back';


const TagPage = () => {

    const navigation = useNavigate();
    const location = useLocation();
    //getting the tag value, from the location pathname, at the end in the path we get the tag
    const tag = location.pathname.split("/").at(-1);
  return (
    <div>
        <Header/>
        <div className='mt-28 -mb-10 ml-12 flex gap-16'>
            <Back/>
            <h2 className='text-[16px] font-normal'>
                Blogs Tagged <span className='text-blue-600 font-semibold text-[18px]'>#{tag}</span>
            </h2>
        </div>
        <Blogs/>
        <Pagination/>
      
    </div>
  )
}

export default TagPage
