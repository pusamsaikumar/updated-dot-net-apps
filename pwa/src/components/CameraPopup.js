import React from "react";
import Webcam from "react-webcam";

function CameraPopup({ webRef, setCamera, captureImage }) {
  return (
    <>
      <Webcam
        style={{ width: "80%", margin: "10%" }}
        audio={false}
        ref={webRef}
        videoConstraints={{
          facingMode: { exact: "environment" },
        }}
      />
      <div className="text-center px-3 mb-3 mt-1">
        <button
          onClick={() => {
            //console.log(webRef.current.getScreenshot());
            captureImage();
            setCamera(false);
          }}
          type="image"
          className="btn btn-success py-1 w-100"
          data-dismiss="modal"
        >
          Capture
        </button>
      </div>
    </>
  );
}

export default CameraPopup;
