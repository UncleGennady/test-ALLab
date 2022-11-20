export interface IJob {
    id: string,
    name: string,
    email: string,
    phone: string,
    title: string,
    salary: string,
    address: string,
    benefits: string[],
    location: {
        lat: number,
        long: number
    },
    pictures: string[],
    createdAt: any,
    updatedAt: string,
    description: string,
    employment_type: string[]
}

export interface IJobBar {

    id:string,
    name:string,
    title:string,
    createdAt:string,
    address:string,
    pictures:string[]
}

export interface IPagination {
    jobsPerPage:number,
    totalJobs:number,
    currentPage:number,
    setCurrentPage: any,
}