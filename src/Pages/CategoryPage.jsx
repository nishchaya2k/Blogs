import React from 'react'
import Header from '../components/Header'
import { useLocation, useNavigate } from 'react-router-dom';
import Pagination from '../components/Pagination';
import Blogs from '../components/Blogs';
import Back from '../components/Back';

const CategoryPage = () => {

    const navigation = useNavigate();
    const location = useLocation();
    //getting the category value, from the location pathname, at the end in the path we get the tag
    const category = location.pathname.split("/").at(-1);

  return (
    <div className="">
      <Header/>
      <div className='mt-28 -mb-10 ml-12 flex gap-16'>
        <Back/>
        <h2 className='text-[16px] font-normal'> 
            Blogs on <span className='text-gray-600 font-semibold underline text-[18px]'>{category}</span>
        </h2>
      </div>
      <Blogs/>
      <Pagination/>
    </div>
  )
}

export default CategoryPage
