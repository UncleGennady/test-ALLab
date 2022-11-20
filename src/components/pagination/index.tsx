import React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import "./style.css";
import {IPagination} from "../../models";

const Pagination = ({jobsPerPage, totalJobs, currentPage, setCurrentPage}:IPagination) => {
    const pageNumbers: any[] = [];

    for(let i = 1; i <= Math.ceil(totalJobs/ jobsPerPage);i++){
        pageNumbers.push(i)
    }

    const filterPages = (visiblePages:any, totalPages:number) => {
        return visiblePages.filter((page:number) => page <= totalPages);
    };

    const getVisiblePages = (page:number, totalPages:number) => {
        if (totalPages < 7) {
            return filterPages([1, 2, 3, 4, 5, 6], totalPages);
        } else {
            if (page % 5 >= 0 && page > 4 && page + 2 < totalPages) {
                return [1, "..." + (page - 1), page, (page + 1) + "...", totalPages];
            } else if (page % 5 >= 0 && page > 4 && page + 2 >= totalPages) {
                return [1, '...'+(totalPages - 3), totalPages - 2, totalPages - 1, totalPages];
            } else {
                return [1, 2, 3, 4, 5 +"...", totalPages];
            }
        }
    };

    const handleNumberPage = (i:any) => typeof(i) ==="string" ? setCurrentPage(+(i.split('').filter((i:string) => i !=='.').join(''))) : setCurrentPage(i)

    return (
            <div className="wrapper-pages flex justify-center">
                <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm font-bold bg-white" aria-label="Pagination">
                    <button
                        onClick={currentPage > 1 ? setCurrentPage(currentPage-1) : null}
                        className="relative inline-flex items-center rounded-l-md bg-white pl-6 py-3 text-sm text-gray-500 hover:bg-gray-50 focus:z-20"
                    >
                        <div className='hidden sm:inline-block pr-7 border-r-2 border-gray-300'>
                            <span className="sr-only">Previous</span>
                            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                        </div>
                    </button>

                    <div className='px-10 md:px-14 '>
                        {getVisiblePages(currentPage, pageNumbers.length).map((i:any, index:number)=>
                            <button
                                key={index}
                                onClick={handleNumberPage(i) }
                                className={`relative inline-flex items-center ${ i === currentPage ? 'border-b-2 border-indigo-500 bg-indigo-50' : 'bg-white'} px-3 py-3 text-sm text-gray-500 hover:bg-gray-50 focus:z-20`}

                            >
                                {i}
                            </button>
                        )}
                    </div>

                    <button
                        onClick={currentPage < pageNumbers.at(-1) ? setCurrentPage(currentPage+1) : null}
                        className="relative inline-flex items-center rounded-r-md bg-white pr-6 py-3 text-sm text-gray-500 hover:bg-gray-50 focus:z-20"
                    >
                        <div className='hidden sm:inline-block pl-7 border-l-2 border-gray-300'>
                            <span className="sr-only">Next</span>
                            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                        </div>
                    </button>
                </nav>
            </div>
    );
};

export default Pagination;