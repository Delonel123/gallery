import { Modal, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

interface IModalImage{
    open:boolean,
    handleClose:() =>void,
    url:string
}
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    boxShadow: 24,
  };

const ModalImage = ({open,handleClose,url}:IModalImage) => {
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
               <img src={url} />
            </Box>
        </Modal>
    )
}

export default ModalImage