import React from 'react';
import './style.css';
import {Link} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";

import {IJobBar} from "../../models";
import {getDaysAgo} from "../../utils";
import {changeSave} from "../../store/slices/savedListSlice";

const JobBar = ({id,name,title, createdAt, address, pictures}:IJobBar) => {
    const savedList = useSelector((state:any) => state.saved.savedList)
    const dispatch = useDispatch()
    const isSaved = !!savedList.find((i:string) => i === id)
    const daysAgo = getDaysAgo(createdAt)

    return (
        <div className="job-item rounded flex drop-shadow gap-6 ">
            <div className="icon">
                <img src={pictures[0]} alt="#"/>
            </div>
            <div className="content flex justify-between flex-col-reverse md:flex-row gap-x-5">
                <div className="info flex-col gap-2.5 ">

                    <h3 >
                        <Link className="link" to={`/job/${id}`}>
                            {title}
                        </Link>
                    </h3>
                    <p className="text-gray-300 text-base">{`Department name • ${name}`}</p>
                    <div className="flex gap-x-2.5">
                        <img src="./icons/tag.svg" alt="#"/>
                        <p className="text-gray-300 text-base">{address}</p>
                    </div>
                </div>
                <div className="job-stats flex gap-x-5">
                    <div className="rating my-auto">
                        <img src="./icons/stars.svg" alt="#"/>
                    </div>
                    <div className="flex flex-col justify-between items-end">
                        <button className="bookmark hidden md:block"
                             onClick={()=>dispatch(changeSave(id))}
                        >
                                <svg width="18" height="23" viewBox="0 0 18 23" fill={isSaved ? '#70778B': 'none'} xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M1 4.00016C1 2.5274 2.19391 1.3335 3.66667 1.3335H14.3333C15.8061 1.3335 17 2.5274 17 4.00016V19.9936C17 21.1595 15.609 21.7639 14.7567 20.9682L9.90994 16.4428C9.39761 15.9645 8.60239 15.9645 8.09007 16.4428L3.24327 20.9682C2.39104 21.7639 1 21.1595 1 19.9936V4.00016Z" stroke="#70778B" stroke-width="2"/>
                                </svg>
                        </button>
                        <div className="date text-gray-300 text-base">
                            {`Posted ${daysAgo} days ago`}
                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
};


export default JobBar;
