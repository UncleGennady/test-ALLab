
export const getDaysAgo = (createdDate:string) => Math.floor(((+Date.parse(new Date().toISOString()))-(+(Date.parse(createdDate))))/8.64e+7);