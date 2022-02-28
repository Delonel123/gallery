export interface image{
    albumId:number,
    id:number,
    title:string,
    url:string,
    thumbnailUrl:string
}
export interface requestImage{
    data: image[],
    totalCount:number
}

export interface intitialImageState{
    image: image[],
    isLoad:boolean,
    currentPage:number,
    totalCount:number,
    perPage:number
}
export interface DataQueryParams{
    _page:number,
    limit:number
}

