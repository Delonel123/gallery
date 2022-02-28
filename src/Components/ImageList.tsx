import { Button, IconButton, ImageList, ImageListItem, Pagination } from "@mui/material"
import React, { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../Hooks/ReduxHook"
import { fetchImage, setCurrentPage } from "../Redux/imageReducer"

import '../global.css'
import Image from "./Image"
import Filters from "./Filters"
import { almobCountsCreater } from "../utils/AlbobsCountsCreator"
import { image } from "../Types/imageType"

const ImagesList = () => {
    const { image } = useAppSelector((state) => state.images)
    const { isLoad } = useAppSelector((state) => state.images)
    const { currentPage } = useAppSelector((state) => state.images)
    const { totalCount } = useAppSelector((state) => state.images)
    const { perPage } = useAppSelector((state) => state.images)
    const [albumIds,setAlmunIds] = useState([])
    const dispatch = useAppDispatch()
    const [allImage,setAllImage] = useState<image[]>([])
    const pageCount = Math.ceil(totalCount / perPage)
    const pages: number[] = [];

    const handleCurrentPage = (e: React.ChangeEvent<any>, item: number) => {
        dispatch(setCurrentPage(item))
    }
   
    useEffect(() =>{
        // Need all Image for filter by albumID
        const fetchAllData = async () =>{
            const url = `http://jsonplaceholder.typicode.com/photos`
            const response = await fetch(url, {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                }
            })
            if (!response.ok) {
                console.log('Error fetching data from API')
            }
            const allImage:image[] = await response.json()
            almobCountsCreater({albumIds,allImage,setAlmunIds})
            setAllImage([])
        }
        fetchAllData()
    },[])
    console.log(albumIds)
    useEffect(() => {
        dispatch(fetchImage({ _page: currentPage, limit: perPage }))
    }, [currentPage])
    return (
        <div>
            <Filters albumIds={albumIds} currentPage={currentPage} limit={perPage}/>
            <ImageList sx={{ width: "100%", height: 'auto' }} cols={8} rowHeight={150} variant="quilted">
                {!isLoad ? image.map((item) => (
                    <Image key={item.id} image={item}/>
                )) : <>Loading...</>}
            </ImageList>
            <Pagination count={pageCount} variant="outlined" shape="rounded" hidePrevButton hideNextButton onChange={handleCurrentPage} />
        </div>
    )
}

export default ImagesList