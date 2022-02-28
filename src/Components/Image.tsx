import { IconButton, ImageListItem } from "@mui/material";
import React, { useState } from "react";
import { useAppDispatch } from "../Hooks/ReduxHook";
import { DeleteImage } from "../Redux/imageReducer";
import { image } from "../Types/imageType";
import ModalImage from "./ModalImag";

interface PImage {
    image: image
}

const Image = ({ image }: PImage) => {
    const [isPointed, setIsPointed] = useState(false);
    const [isOpen, setIsOpen] = useState(false)
    const dispatch = useAppDispatch()
    const handleOpenModal = (): void => {
        setIsOpen(!isOpen)
    }
    const handleImageOver = () => {
        setIsPointed(!isPointed)
    }
    const handleDeleteImage = (e:React.MouseEvent) => {
        e.stopPropagation()
        dispatch(DeleteImage(image.id))
    }
    return (
        <>
            <ImageListItem onClick={handleOpenModal} className="imageWrapper" onMouseOver={handleImageOver} onMouseLeave={handleImageOver} key={image.id}>
                <img className={isPointed ? 'image onMouse' : 'image'} key={image.id} 
                    src={`${image.thumbnailUrl}?w=164&h=164&fit=crop&auto=format`}
                    alt={image.title}
                    loading="lazy"
                />
                <IconButton onClick={(e) => handleDeleteImage(e)} className="deleteIcon" aria-label="delete">
                    <img width={20} src="https://cdn-icons-png.flaticon.com/512/1214/1214428.png" />
                </IconButton>
            </ImageListItem>
            <ModalImage open={isOpen} handleClose={handleOpenModal} url={image.url} />
        </>
    )
}
export default Image