import React, {useState} from 'react';
import JobBar from "../../components/job-bar";
import {useGetJobQuery} from "../../store/jobApi";
import Pagination from "../../components/pagination";
import {IJob} from "../../models";
const JobBoard = () => {


    const {data, isLoading} =  useGetJobQuery('all')

    const [currentPage, setCurrentPage] = useState<number>(1)
    const [jobsPerPage] = useState<number>(6)
    const lastJobIndex:number = currentPage * jobsPerPage
    const firstJobIndex:number = lastJobIndex - jobsPerPage

    if(isLoading) return <div>loading...</div>

    const currentJobs = data.slice(firstJobIndex, lastJobIndex)

    const defineCurrentPage = (value: number) => () => setCurrentPage(value)

    const renderJobList = (data:IJob[]) =>{
        return data.map( (i:IJob) => <JobBar key={i.id}  id={i.id} name={i.name} createdAt={i.createdAt} title={i.title} address={i.address}  pictures={i.pictures} />)
    }
    return (
        <div className="container mx-auto">
            <div className="flex flex-col gap-2">
                {!isLoading && renderJobList(currentJobs)}
            </div>
            <Pagination jobsPerPage={jobsPerPage} totalJobs={data.length} currentPage={currentPage} setCurrentPage={defineCurrentPage}/>
        </div>
    );
};

export default JobBoard;




//
//
//
//
// import React, {useState} from 'react';
// import JobBar from "../../components/job-bar";
// import {useGetJobQuery} from "../../store/jobApi";
// import Pagination from "../../components/pagination";
// import {IJob} from "../../models";
// interface JobProps  {
//     job: IJob
// }
//
// const JobBoard = () => {
//
//
//     const {data, isLoading} =  useGetJobQuery('all')
//
//     const [currentPage, setCurrentPage] = useState<number>(1)
//     const [jobsPerPage] = useState<number>(6)
//     const lastJobIndex:number = currentPage * jobsPerPage
//     const firstJobIndex:number = lastJobIndex - jobsPerPage
//
//     if(isLoading) return <div>loading...</div>
//
//     const currentJobs:JobProps = data.slices(firstJobIndex, lastJobIndex)
//
//     const defineCurrentPage = (value: number) => () => setCurrentPage(value)
//
//     const renderJobList = (data:any) =>{
//         return data.map( (i:{id:string; name:string; title: string; createdAt: any; address: string; pictures:[string]}) => <JobBar key={i.id}  id={i.id} name={i.name} date={i.createdAt} title={i.title} address={i.address}  pictures={i.pictures} />)
//     }
//     return (
//         <div className="container mx-auto">
//             <div className="flex flex-col gap-2">
//                 {!isLoading && renderJobList(currentJobs)}
//             </div>
//             <Pagination jobsPerPage={jobsPerPage} totalJobs={data.length} currentPage={currentPage} setCurrentPage={defineCurrentPage}/>
//         </div>
//     );
// };
//
// export default JobBoard;