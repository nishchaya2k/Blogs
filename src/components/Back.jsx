import React from 'react'
import {MdArrowBack} from 'react-icons/md'
import {useNavigate } from 'react-router-dom';

const Back = () => {
    const navigation = useNavigate();
  return (
    <div>
        <button onClick={() => navigation(-1)}
          className='flex py-1  border-gray-300 hover:border-gray-500 hover:bg-slate-300 transition-all duration-300 bg-slate-200 px-5 rounded-md'
          >
          <MdArrowBack className='mt-1 mr-1'/>
              Back
        </button>
    </div>
  )
}

export default Back
