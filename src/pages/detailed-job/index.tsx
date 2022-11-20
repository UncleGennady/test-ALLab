import React, {useState} from 'react';
import "./style.css"
import {useGetJobQuery} from "../../store/jobApi";
import {useParams, Link } from 'react-router-dom';
import {IJob} from "../../models";
import {getDaysAgo} from "../../utils";
import {changeSave} from "../../store/slices/savedListSlice";
import {useDispatch, useSelector} from "react-redux";
const DetailedJob = () => {
    const {id} = useParams<{ id: string }>()
    const {data, isLoading} = useGetJobQuery('all')
    const savedList = useSelector((state:any) => state.saved.savedList)
    const dispatch = useDispatch()
    const isSaved = !!savedList.find((i:string) => i === id)
    if(isLoading)return(
        <div>
            Loading...
        </div>
    )

    const jobItemData = data.find((i:IJob)=> i.id == id)

    const getP =(start:any, separator:any) =>{
        const arr = jobItemData.description.split(' ')
        const indexStart = start === 0 ? 0 : arr.findIndex((i:string)=> i === start )
        if(!separator) return arr.splice(indexStart).filter((i:string)=> i !== '\nCompensation' && i !=='&' && i !=='Benefits:\n\t' ).join(' ')
        const value = arr.findIndex((i:string)=> i === separator ) - indexStart
        return arr.splice(indexStart, value).filter((i:string)=> i !== 'Responsopilities:\n' && i !== '\nCompensation').join(' ')

    }

    const textDescription ={
        startText : getP(0, "Responsopilities:\n"),
        responsolities : getP("Responsopilities:\n", "\nCompensation"),
        compensation : getP("\nCompensation",null).split('.'),
    }

    const daysAgo = getDaysAgo(jobItemData.createdAt)

    // @ts-ignore
    return (
            <div className="container mx-auto">
                <div className="flex gap-x-32 flex-col lg:flex-row">
                    <div className="details">
                        <div className="title flex justify-between">
                            <h2 className="font-bold" >
                                Job Details
                            </h2>
                            <div className="title_links flex justify-end gap-x-8 font-roboto">
                                <div className="flex gap-x-4 ">
                                    <button className="bookmark"
                                            onClick={()=> dispatch(changeSave(id!))}
                                    >
                                        <svg width="18" height="23" viewBox="0 0 18 23" fill={isSaved ? '#70778B': 'none'} xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M1 4.00016C1 2.5274 2.19391 1.3335 3.66667 1.3335H14.3333C15.8061 1.3335 17 2.5274 17 4.00016V19.9936C17 21.1595 15.609 21.7639 14.7567 20.9682L9.90994 16.4428C9.39761 15.9645 8.60239 15.9645 8.09007 16.4428L3.24327 20.9682C2.39104 21.7639 1 21.1595 1 19.9936V4.00016Z" stroke="#70778B" stroke-width="2"/>
                                        </svg>
                                    </button>
                                    <p >{isSaved ? "Saved" : "Save to my list"}</p>
                                </div>
                                <div className="flex gap-x-4 ">
                                    <div className="share " >
                                        <img src="../../icons/shape.svg" alt="#"/>
                                    </div>
                                    <p>Share</p>
                                </div>
                            </div>
                        </div>
                        <div className="apply hidden md:block">
                            <button type="button"
                                    className="inline-block px-8 py-5 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">APPLY NOW
                            </button>
                        </div>
                        <div className="job-info mb-1.5 flex justify-between gap-x-24 flex-col xl:flex-row">
                            <div className="job-name">
                                <h3 className="mb-2 font-bold">
                                    {jobItemData.title}
                                </h3>
                                <div className="date mb-2 font-roboto">
                                    {` Posted ${daysAgo} days ago`}
                                </div>
                            </div>
                            <div className="job-salaries w-4/5">
                                <h3 className="mb-2 font-bold">{jobItemData.salary}</h3>
                                <p className='font-roboto'>Brutto, per year</p>
                            </div>
                        </div>
                        <div className="description">
                            <p className='font-roboto'>
                                {textDescription.startText}
                            </p>
                            <h3 className="mb-2">
                                Responsopilities
                            </h3>
                            <p className='font-roboto'>
                                {textDescription.responsolities}
                            </p>

                            <div className="compensation-benefits">
                                <h3 className="mb-2">
                                    Compensation & Benefits:
                                </h3>
                                <p className='font-roboto'>
                                    Our physicians enjoy a wide range of benefits, including:
                                </p>
                                <ul className='font-roboto'>
                                    {!isLoading && textDescription.compensation.map((i:string, index:number)=>{
                                        if(!!i.trim()){
                                            return<li key ={index}>{i}</li>
                                        }
                                    })}
                                </ul>
                            </div>
                        </div>
                        <div className="apply">
                            <button type="button"
                                    className="inline-block px-8 py-5 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">APPLY NOW
                            </button>
                        </div>
                        <div className="additional-info">
                            <h2>
                                Additional info
                            </h2>
                            <p className="mb-4 font-roboto">
                                Employment type
                            </p>
                            <div className="tags tags-blue flex gap-x-2">
                                {!isLoading && jobItemData.employment_type.map((i:string,index:number) => <p key={index}>{i}</p>)}
                            </div>
                            <p className="mb-4 font-roboto">
                                Benefits
                            </p>
                            <div className="tags tags-yellow flex gap-x-2">
                                {!isLoading && jobItemData.benefits.map((i:string,index:number) => <p key={index}>{i}</p>)}
                            </div>
                        </div>
                        <div className="images mb-12">
                            <h2>Attached images</h2>
                            <div className="flex gallery gap-3 flex-wrap">
                                {!isLoading && jobItemData.pictures.map((i:string,index:number) =>(
                                    <div key={index} >
                                        <img src={i} alt="#"/>
                                    </div>
                                ))}

                            </div>
                        </div>
                    </div>
                    <div className="map-wrapper mb-5">
                        <div className="map-top">
                           <div className="map-text">
                               <h3 className="text-white">
                                   <p>Department name.</p>
                                   <p>{jobItemData.name}</p>
                               </h3>
                               <p className="map-address text-white font-roboto">
                                   <img className="inline-block" src="../../icons/shape-map.svg" alt="#"/>
                                   {jobItemData.address}
                               </p>
                               <div className="map-contacts text-white font-roboto">
                                   <p>{jobItemData.phone}</p>
                                   <p>{jobItemData.email}</p>
                               </div>
                           </div>
                        </div>
                        <div className="map-bottom h-3/6">
                            {!isLoading && <iframe
                                src={`https://maps.google.com/maps?q=${jobItemData.location.lat},${jobItemData.location.long}&t=&z=15&ie=UTF8&iwloc=&output=embed&zoom=14`}
                            >
                            </iframe>
                            }
                        </div>
                    </div>
                </div>
                <div className="return-home hidden md:block">
                    <Link to={`/`}>
                        <p className="inline-block">RETURN TO JOB BOARD</p>
                    </Link>
                </div>
            </div>

    );
};

export default DetailedJob;