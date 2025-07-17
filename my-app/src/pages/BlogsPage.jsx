import React, { useEffect, useState } from 'react';
import menu from '../assets/blogs/menu.png';
import { useParams } from 'react-router-dom';
import axios from 'axios';
const Blog = () => {

  const { id } = useParams();
  const [blogData, setBlogData] = useState({
    title: '',
    content: '',
    authorName: '',
    images: null,
    description: '',
  });
  useEffect(() => {
    axios.get(`http://127.0.0.1:4200/members/blog/${id}`)
      .then(res => setBlogData(res.data.data))
      .catch(err => console.error(err));
  }, [id]);

  console.log(blogData)
  return (
    <>
      <div className=" text-white mt-6 md:mt-12 ml-8 mr-8 md:ml-24 md:mr-24 ">
        <div
          className="w-full h-[140px] md:h-[240px] bg-cover bg-center relative items-center opacity-70"
        style={{ backgroundImage: `url(${blogData.images?.[0]})` }}>
          <div className="absolute inset-0 bg-black bg-opacity-30 font-sans"></div>
          <div className="relative z-10 max-w-4xl px-6 py-4 md:px-12 font-sans">
            <h2>{`${blogData.title}`}</h2>
           <p className="text-xs md:text-sm mt-2 text-white">BY: <span>{blogData.authorName}</span></p>
<p className="text-sm md:text-base text-white">DATE: {new Date(blogData.publishedAt).toLocaleDateString()}</p>
          </div>
        </div>
        <div className='mt-6'>
          <img src={menu} alt="menu" className="w-6 sm:w-10" />
        </div>
        <div className="h-[2px] w-full bg-yellow-200 mt-5 rounded-full shadow-[0_4px_12px_rgba(250,204,21,0.5)]" />

        <div className=" w-full py-10 space-y-4 text-sm md:text-xl text-gray-200 leading-relaxed" style={{ fontFamily: 'Mina-Regular' }}>
          
           <div dangerouslySetInnerHTML={{ __html: blogData.content }} />
          
        </div>
      </div>
    </>
  );
};

export default Blog;