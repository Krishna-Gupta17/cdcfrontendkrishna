import React from "react";


const ReviewCard = ({name, batch, image, description}) => {
    return (
        <div className="bg-[#1B1B4D] border border-[#5C61F2] w-64 h-72 ml-4 mr-4 mt-2 sm:mt-6 md:mt-8 rounded-lg basis-[31%] space-y-2 shadow-lg border-solid text-white">
            <div className="flex pt-3 pl-8 mb-5">
                    <img src={image} alt={name} className="rounded-full w-16 mt-3" />
                    <div className="flex-1 mt-5 text-left ml-4 font-inter font-semibold leading-tight">
                    <h4 className="justify-center text-lg">{name}</h4>
                    <h5 className="text-base">{batch}</h5>
                    </div>
            </div>
            <p className=" p-2 m-5 font-inter font-bold text-center leading-snug">{description}</p>
        </div>
    );
}

export default ReviewCard;