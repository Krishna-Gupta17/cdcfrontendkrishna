import React from "react";
import { Link } from "react-router-dom";

const BlogCard = ({title, description, images, publishedAt }) => {
    console.log(publishedAt)
    const formattedDate = publishedAt
    ? new Date(publishedAt).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    : 'Not Published';
    return (
        <div className="basis-[30%] md:basis-[30%] space-y-0 overflow-hidden group">
            <img src={images} alt={{title}} className="w-full rounded-md bg-cover bg-center transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:blur-sm"/>
            <div className="inset-0 opacity-0 translate-y-5 group-hover:opacity-100 group-hover:translate-y-[-50%] transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] pointer-events-none">
                <h3 className="text-2xl font-inter font-medium text-white">{title}</h3>
                <p className="text-base font-inter text-gray-500">{description}</p>
                <p className="text-sm font-inter text-white">{formattedDate}</p>
            </div>
        </div>
    );
}

export default BlogCard;