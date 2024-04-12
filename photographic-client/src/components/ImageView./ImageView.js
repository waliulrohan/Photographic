import React, { useCallback, useState } from 'react'
import {  Close, Download } from '@mui/icons-material';
import './imageView.css'
import { IconButton } from '@mui/material';
const ImageView = ({ url ,  setIsZoom }) => {
  const downloadImage = async () => {
    const imageURL = url;

    try {
        const response = await fetch(imageURL);
        const blob = await response.blob();
        const blobURL = URL.createObjectURL(blob);

        const downloadLink = document.createElement('a');
        downloadLink.href = blobURL;
        downloadLink.download = 'image{forever}.jpg';

        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);

        URL.revokeObjectURL(blobURL); 
    } catch (error) {
        console.error('Error downloading image:', error);
    }
};
  return (
    <div className="imageView">
        <div className="imageView-header">
                     <IconButton onClick={()=>{
                       setIsZoom(false)
                    console.log(typeof setIsZoom)
                    }}>
                        <Close sx={{fontSize:'25px',color:'black'}} />
                     </IconButton>                  
                     <IconButton onClick={()=> downloadImage()}>
                        <Download  sx={{fontSize:'25px',color:'black'}} />
                     </IconButton>
                    
        </div>
        <div className='imageView-frame'>
          <img src={url} alt="" />
        </div>

    </div>
  );
};

export default ImageView;
