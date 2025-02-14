import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faBars, faCog, faCaretDown, faCaretUp, faSort, faAngleLeft, faAngleRight, faUser, faEdit, faEye,faWarning, faRightLong, faCheck } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import AddBasketModalPoints from './AddBasketModalPoints';
import { deleteUserAPI, saveUserPointsAPI } from '../redux/API';

const DeleteModal = (
    {
        show,
        handleClose,
        selectedDelete,
        successMsg,
        clientName,
        setShowNotificationError,
        searchValue                                                                       
    }
) => {
  const dispatch = useDispatch();
  

 
  const [value,setValue] = useState({
    userDetailId: "",
    memberNumber:"",
    
  });

 

  useEffect(()=>{
    if(selectedDelete && Object?.keys(selectedDelete)?.length > 0){
     
      setValue({
        userDetailId: selectedDelete?.userDetailId,
        memberNumber:selectedDelete?.barCodeValue,
      
      })
    }
  },[selectedDelete])

  
 
  

  const handleSubmit =(e) =>{
    e.preventDefault();
    dispatch(deleteUserAPI(clientName,value,searchValue));
    setShowNotificationError(true);
    successMsg("Shopper deleted successfully.")
    handleClose();
   
  }
 
  return (
  <>
   <div className={`modal ${(show === true ) ? "show" : ""}`} style={{ display: show ? "block" : "none", outline: "none" }}>
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
          width: "600px",
          // top: 20,
          borderRadius: "0px",
       
     
     
          // transform: "translate(-50%, -50%)",

          // padding: "20px",
          // borderRadius: "8px"
        }}

      >
        <div className="modal-content" style={{ width: "600px" ,height:"125px",background:"#f3f3f3" }}>
          <div style={{width:"600px",height:"282px"}} >
         
<div className="modal-body" style={{  position: "relative",width:"600px",padding:"15px",height:"50px",background:"#f3f3f3"}}>

<button type="button" className="bootbox-close-button close" data-dismiss="modal" aria-hidden="true"
 style={{marginTop:"-10px",border:"none",background:"#f3f3f3",color:"#ccc"}}
    onClick={() => {
        handleClose();
        setValue(
          {
          userDetailId: "",
          memberNumber:"",
       
        }
        );
      }  }
    >×</button>
    <div class="bootbox-body" style={{color:"#333333"}}>Are you sure you want to delete this shopper?</div>

</div>
<div className='modal-footer'>
  <button  type='button' style={{background:"#ABB7B7",border:"1px solid #ABB7B7",outline:"1px solid #ABB7B7",height:"33.6px",width:"69.19px",color:"#fff"}}
    onClick={() => {
      handleClose();
      setValue(
        {
        userDetailId: "",
        memberNumber:"",
     
      }
      );
    }  }
  
  >Cancel</button>
  <button  type="button" style={{background:"#424a55",height:"33.6px",width:"43.5px",color:"#fff",outline:"none",border:"none"}}
  onClick={(e) => handleSubmit(e)}
  >Ok</button>
</div>
          </div>
        </div>
      </div>
    </div>
  
  </>
  )
}

export default DeleteModal