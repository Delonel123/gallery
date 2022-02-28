import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material"
import React, { useState } from "react"
import { useAppDispatch } from "../Hooks/ReduxHook"
import { AlbomSortImage, fetchImage } from "../Redux/imageReducer"

interface IFilters {
    albumIds: number[],
    currentPage:number,
    limit:number
}

const Filters = ({ albumIds,currentPage,limit }: IFilters) => {
    const [album, setAlbum] = useState<number>(0)
    const dispatch = useAppDispatch()
    const handleChange = (e: SelectChangeEvent<number | null>) => {
        setAlbum(Number(e.target.value))
        if(e.target.value === 0){
            dispatch(fetchImage({ _page: currentPage, limit }))
        }else{
            dispatch(AlbomSortImage(Number(e.target.value)))
        }
        
    }
    return (
        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Filter by albumId</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={album}
                label="filter by albomID"
                onChange={(e) => handleChange(e)}
            >
                {albumIds.map((item, index) => {
                    return (
                        <MenuItem key={index} value={item}>{item}</MenuItem>
                    )
                })}
                <MenuItem value={0}>none</MenuItem>

            </Select>
        </FormControl>
    )
}
export default Filters