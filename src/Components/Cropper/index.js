import React, { useState, useCallback, useEffect } from 'react'
import Cropper from 'react-easy-crop'
import { getCroppedImg } from './CanvasUtils';
import Modal from "react-modal";
import './cropper.css';

const customStyles = {
    content: {
      border: "none",
      background: "rgb(255 255 255 / 0%)",
      overflow: "hidden auto" 
    },
    overlay: {
      backgroundColor: "#2a2a2ac9",
      zIndex:"666666"
    },
  };

function CropImage(props) {

  const [isOpen, setIsOpen] = useState(false); //useState(props.isOpen);
  const [imageSrc, setImageSrc] = React.useState(null)
  const [crop, setCrop] = useState({ x: 192, y: 192})
  const [rotation, setRotation] = useState(0)
  const [zoom, setZoom] = useState(2)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])
  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(
        imageSrc,
        croppedAreaPixels,
        rotation
      )
      setIsOpen(false);
      return props.getCroppedImage(croppedImage);
    } catch (e) {
      console.error(e)
    }
  }, [imageSrc, croppedAreaPixels, rotation])


  const closeModal = (e) => {
     setIsOpen(false);
     return props.getCroppedImage(null);
  }

  useEffect(()=>{ 
    
      async function fetchImageDataUrl(){
        if(props.file !== null){
        let imageDataUrl = await readFile(props.file)
        setImageSrc(imageDataUrl);
    }
    if(props.isOpen) {
       setIsOpen(true);
    }
    
  }
  fetchImageDataUrl() 

  }, [props.file, props.isOpen])

  return (
   <React.Fragment>
     <main id="main" className="main">
      {imageSrc ? (
        <React.Fragment>
        <Modal isOpen={isOpen} style={customStyles} ariaHideApp={false}>
        <div className="modal-dialog modal-dialog-centered cropper-modal">
          <div className="modal-content">
            <div className="modal-body justify-content-center flex-column">
                 <div className="image-cropper">
                    <div className="crop-container">
                      <Cropper
                        image={imageSrc}
                        crop={crop}
                        zoom={zoom}
                        aspect={props.aspectRatio ? props.aspectRatio : 1}
                        onCropChange={setCrop}
                        onCropComplete={onCropComplete}
                        onZoomChange={setZoom}
                        minZoom={1}
                        maxZoom={3}
                      />
                    </div>
                    <div className="controls">
                      <input
                        type="range"
                        value={zoom}
                        min={1}
                        max={3}
                        step={0.1}
                        aria-labelledby="Zoom"
                        onChange={(e) => {
                          setZoom(e.target.value)
                        }}
                        className="zoom-range"
                      />
                    </div>
                    </div>
                 </div>

                  <div className="modal-footer justify-content-center ">
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={(e) => showCroppedImage()}
                    >
                      Save changes
                    </button>

                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={closeModal}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </Modal>

        </React.Fragment>
      ) : null }
    </main>
   </React.Fragment>

  )
}

export default CropImage

function readFile(file) {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.addEventListener('load', () => resolve(reader.result), false)
    reader.readAsDataURL(file)
  })
}