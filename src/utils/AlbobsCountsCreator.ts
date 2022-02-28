import { SetStateAction } from 'react';
import { image } from './../Types/imageType';

interface IalmobCountsCreater{
    albumIds:number[],
    allImage:image[],
    setAlmunIds:SetStateAction<any>
}

export const almobCountsCreater = ({albumIds,allImage,setAlmunIds}:IalmobCountsCreater) =>{
    const arr = []
    for(let i = 0;i<allImage.length;i++){
        if(!albumIds.includes(allImage[i].albumId)){
            arr.push(allImage[i].albumId)
            i+=49
            setAlmunIds(arr)
        }
    }
}