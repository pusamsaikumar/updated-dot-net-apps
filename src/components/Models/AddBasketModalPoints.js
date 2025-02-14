
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faBars, faCog, faCaretDown, faCaretUp, faSort, faAngleLeft, faAngleRight, faUser, faEdit, faEye,faWarning, faRightLong, faCheck } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import AddPointsModal from './AddPointsModal';
import { saveUserPointsAPI } from '../redux/API';

const AddBasketModalPoints = (
    {
        show,
      
        handleClosePoints ,
        handleBasketClose,
        setShow,
        value,
        setValue,
        member,
        successMsg,
        clientName,
        setShowNotificationError,
        searchValue 
    }
) => {

  const dispatch = useDispatch();
    const [basketOpen,setBasketOpen] = useState(false);
  const handleAddPointsOpen =() => {
    setBasketOpen(true);
  }
  const handleAddPointsClose =() => {
    setBasketOpen(false);
  }


  const handleInput =(e,name) => {
    setValue({
      ...value,
      [name]:e.target.value
    })
  }
  const submitPoints =(e) => {
    e.preventDefault();
    
    dispatch(saveUserPointsAPI(clientName,value,searchValue))
    successMsg("Saved add points successfully");
    setShowNotificationError(true);
    handleClosePoints();
    handleBasketClose();
    setValue({
      rewardType: "",
      memberNumber:"",
      upc1:"",
      upc2:"",
      qty1:"",
      qty2:"",
      transactionAmount:"",
      rewardTypeId:"1"
    });
  }
  

 
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
           top: 150,
          borderRadius: "0px",
         
        
     
     
          // transform: "translate(-50%, -50%)",

          // padding: "20px",
          // borderRadius: "8px"
        }}

      >
        <div className="modal-content" style={{ width: "550px" ,background:"#f3f3f3" }}>
          <div style={{width:"550px",height:"auto"}} >
          <div className="modal-header padding-heading" style={{ padding: "15px", minHeight: "16.43px", height:"65px", width: "520px", position: "relative",border:"none" }}>

<h2 style={{fontWeight:"400",fontSize:"16px",display:"flex",alignItems:"center",margin:"10px 0px",height:"35px"}}>
  <FontAwesomeIcon icon={faUser} style={{color:"#505458",marginRight:"5px"}} ></FontAwesomeIcon>
  <span style={{color:"#505458"}}>{"Shopper"}</span>
  <strong style={{color:"#505458"}}> &nbsp;Points</strong>
</h2>
<button type="button" className='close' onClick={() => {
    handleClosePoints();
    handleBasketClose();
    setValue(
      {
        rewardType: "",
        memberNumber:"",
        upc1:"",
        upc2:"",
        qty1:"",
        qty2:"",
        transactionAmount:"",
        rewardTypeId:""
    }
    );
}}
  style={{
    color: "#909090",
    border: "none",
    outline: "none",
    // background: "#fff",
    position:'absolute',
    top:"10px",
    right:"10px"
  }}
>
  <span aria-hidden="true" style={{ color: "#909090", border: "none", outline: "none" }}>×</span>
</button>
        



</div>
<div className="modal-body" style={{  position: "relative",width:"490px",paddingLeft:"30px",paddingBottom:"30px",background:"#f3f3f3"}}>
{/* <div className="md-content" style={{width:"490px"}}>
   

</div> */}
<div className='col-sm-12' style={{background:"#fff",width:"470px",padding:"15px 15px",marginBottom:"50px"}} >


<div className='col-sm-6' style={{marginLeft:"104px",background:"#fff"}}>
     <div className='form-group' style={{marginBottom:"15px",display:"flex",flexDirection:"column",alignContent:"flex-start",alignItems:"flex-start"}} >
         <label >Reward Type</label>
         
         <select className='form-control' id="rewardType" value={value?.rewardType} name={"rewardType"} onChange={(e)=> {
                 handleInput(e,"rewardType");
                 if(value.rewardType === "1" || e.target.value === "1"){
                  setBasketOpen(false);
                  setShow(true);
                handleBasketClose()
                }
               
               
         }}>
             <option value={"1"} >Buy X Get Y</option>
             <option value={"2"}>Basket Reward</option>
         </select>
     </div>
     <div className='form-group' style={{marginBottom:"15px",display:"flex",flexDirection:"column",alignContent:"flex-start",alignItems:"flex-start"}} >
     <label style={{textAlign:"start"}}>Member Number</label>
     
         <input className='form-control' type='text' id="member" name="member" placeholder='Member Number' value={value?.memberNumber || member?.barCodeValue} onChange={(e) => {
            handleInput(e,"memberNumber")
         }} />
     </div>
     <div>
    
      <div className='form-group' style={{marginBottom:"15px",display:"flex",flexDirection:"column",alignContent:"flex-start",alignItems:"flex-start"}} >
      <label style={{display:"inline-block",textAlign:"start"}}>Transaction Amount</label>
      
          <input className='form-control' type='text' id="transactionAmount" placeholder='Transaction Amount' name="transactionAmount" value={value?.transactionAmount}
           onChange={(e) => {
            handleInput(e,"transactionAmount")
           }}
          />
      </div>

      <div className='col-sm-5'> 
     <label>&nbsp;</label>
     <input type='submit' style={{width:"57px",padding:"6px 12px"}} onClick={(e) => {
      submitPoints(e);
       
     }} className='form-control btn btn-success ' value="Save" />
  </div>
   </div>
  </div>
</div>

</div>
          </div>
        </div>
      </div>
    </div>
    
  </>
  )
}

export default AddBasketModalPoints