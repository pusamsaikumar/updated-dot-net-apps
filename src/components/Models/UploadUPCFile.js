
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faBars, faCog, faCaretDown, faCaretUp, faSort, faAngleLeft, faAngleRight, faUser, faEdit, faEye, faWarning, faRightLong, faCheck, faUpload, faTimes, faSave } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import AddPointsModal from './AddPointsModal';
import { DownloadUPCTemplateAPI, saveUserPointsAPI } from '../redux/API';
import * as XLSX from "xlsx";

const UploadUPCFile = ({
  show, handleclose, data, setData

}) => {
  //const [data, setData] = useState([]);

  const dispatch = useDispatch();

  const downLoadUpcTemplate = () => {
    dispatch(DownloadUPCTemplateAPI())
  }

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const binaryStr = e.target.result;
        const workbook = XLSX.read(binaryStr, { type: "binary" });

        // Assuming the first sheet
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        // Convert sheet to JSON
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        setData(jsonData);
      };
      reader.readAsBinaryString(file);
    }
  };
  console.log("data", data)
  return (
    <>
      <div className={`modal ${show === true ? "show" : ""}`} style={{ display: show ? "block" : "none", outline: "none" }}>
        <div
          className="modal-backdrop"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            // width: "100vw",
            maxWidth: "50vw !important",
            width: "100%",

            background: "#000",
            zIndex: 1040,
            opacity: 0.2,


          }}
        />

        <div className="modal-dialog" role="document"
          style={{
            zIndex: 1050,
            // boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
            width: "550px",
            top: -10,
            borderRadius: "0px",




            // transform: "translate(-50%, -50%)",

            // padding: "20px",
            // borderRadius: "8px"
          }}

        >
          <div className="modal-content" style={{ width: "550px", background: "#fff" }}>
            <div style={{ width: "550px", height: "auto" }} >
              <div className="modal-header padding-heading" style={{ padding: "15px", minHeight: "16.43px", height: "65px", width: "520px", position: "relative", border: "none" }}>

                <h2 style={{ fontWeight: "400", fontSize: "16px", display: "flex", alignItems: "center", margin: "10px 0px", height: "35px" }}>
                  <FontAwesomeIcon icon={faUpload} style={{ color: "#505458", marginRight: "5px" }} ></FontAwesomeIcon>
                  <span style={{ color: "#505458" }}>{"Import"}</span>
                  <strong style={{ color: "#505458" }}> &nbsp;Products</strong>
                </h2>





              </div>
              <div className="modal-body" style={{ position: "relative", width: "490px", paddingLeft: "30px", paddingBottom: "30px", background: "#fff" }}>

                <div className='row'>
                  <div className='col-sm-12' style={{ width: "470px", marginTop: "10px", marginBottom: "15px" }} >
                    <div>
                      {"Click "}
                      <a className=''><strong  onClick={() => downLoadUpcTemplate()} >here</strong></a>
                      {"  for sample excel to upload product list."}
                    </div>

                  </div>
                </div>

                <div className='row'>
                  <div className='col-sm-12'  >
                    <div className='row'>
                      <div className='col-sm-6' style={{ marginTop: "15px" }}>
                        <div className="form-group">

                          <a
                            style={{ background: "#ABB7B7", color: "#fff", padding: "10px", width: "100%", marginTop: "15px" }}
                            onClick={(e) => {
                              e.preventDefault();
                              document.getElementById("fileInput").click();
                            }}
                          >
                            {"Select file"}

                          </a>
                          <input id="fileInput" title='Select File' style={{ display: "none" }} name="file" type='file' onChange={(e) => {
                            handleFileUpload(e)
                          }} />
                        </div>


                      </div>
                    </div>

                  </div>
                </div>
                <div className='' style={{ textAlign: "right" }}>
                  <button type='button' className='btncancel' style={{ marginRight: "5px" }}
                    onClick={() => {
                      handleclose()
                    }}
                  >
                    <FontAwesomeIcon icon={faTimes} />
                    {" Cancel"}
                  </button>
                  <button type='button' className='btn btn-success'
                    onClick={() => {
                      handleclose()
                    }}
                  >
                    <FontAwesomeIcon icon={faSave} />
                    {" Upload File"}
                  </button>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default UploadUPCFile