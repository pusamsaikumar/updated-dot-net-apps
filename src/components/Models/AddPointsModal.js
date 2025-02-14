import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faBars, faCog, faCaretDown, faCaretUp, faSort, faAngleLeft, faAngleRight, faUser, faEdit, faEye,faWarning, faRightLong, faCheck } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import AddBasketModalPoints from './AddBasketModalPoints';
import { saveUserPointsAPI } from '../redux/API';

const AddPointsModal = (
    {
        show,
        handleClose ,
        setShow ,
        member,
        successMsg,
        clientName,
        setShowNotificationError,
        searchValue
    }
) => {
  const dispatch = useDispatch();
  const [basketOpen,setBasketOpen] = useState(false);
  const handleBasketOpen =() => {
    setBasketOpen(true);
  }
  const handleBasketClose =() => {
    setBasketOpen(false);
  }

 
  const [value,setValue] = useState({
    rewardType: "1",
    memberNumber:"",
    upc1:"",
    upc2:"",
    qty1:"",
    qty2:"",
    transactionAmount:"",
    rewardTypeId:"1"
  });

  useEffect(()=>{
    if(member && Object?.keys(member)?.length > 0){
      // setValue({
      //   ...value,
      //   ["memberNumber"]:member?.barCodeValue
      // })
      setValue({
        rewardType: "1",
        memberNumber:member?.barCodeValue,
        upc1:"",
        upc2:"",
        qty1:"",
        qty2:"",
        transactionAmount:"",
        rewardTypeId:"1"
      })
    }
  },[member])


  const handleInput =(e,name) => {
    setValue((prev) => {
      return {
        ...prev,
        [name]:e.target.value
      }
    })
  };
 
  const handleSelect =(e,name) => {
   
    setValue((prev) => {
      return {
        ...prev,
        [name]:e.target.value === "2" ? "Basket Reward" :"Buy X Get Y",
        rewardTypeId : e.target.value === "2" ? "2":"1"
      }
    })
  }
 
  

  const submitPoints =(e) => {
    e.preventDefault();
    dispatch(saveUserPointsAPI(clientName,value,searchValue))
    setValue({
      rewardType: "1",
      memberNumber:"",
      upc1:"",
      upc2:"",
      qty1:"",
      qty2:"",
      transactionAmount:"",
      rewardTypeId:"1"
    })
    successMsg("Saved add points successfully");
    setShowNotificationError(true);
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
          width: "550px",
          // top: 20,
          borderRadius: "0px",
          background:"red"
        
     
     
          // transform: "translate(-50%, -50%)",

          // padding: "20px",
          // borderRadius: "8px"
        }}

      >
        <div className="modal-content" style={{ width: "550px" ,height:"100vh",background:"#f3f3f3" ,overflowY:"scroll"}}>
          <div style={{width:"550px"}} >
          <div className="modal-header padding-heading" style={{ padding: "15px", minHeight: "16.43px", height:"65px", width: "520px", position: "relative",border:"none" }}>

<h2 style={{fontWeight:"400",fontSize:"16px",display:"flex",alignItems:"center",margin:"10px 0px",height:"35px"}}>
  <FontAwesomeIcon icon={faUser} style={{color:"#505458",marginRight:"5px"}} ></FontAwesomeIcon>
  <span style={{color:"#505458"}}>{"Shopper"}</span>
  <strong style={{color:"#505458"}}> &nbsp;Points</strong>
</h2>
<button type="button" className='close' onClick={() => {
  handleClose();
  setValue(
    {
    rewardType: "1",
    memberNumber:"",
    upc1:"",
    upc2:"",
    qty1:"",
    qty2:"",
    transactionAmount:"",
    rewardTypeId:"1"
  }
  );
}  }
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
<div className="modal-body" style={{  position: "relative",width:"490px",paddingLeft:"30px",height:"100vh",background:"#f3f3f3"}}>
{/* <div className="md-content" style={{width:"490px"}}>
   

</div> */}
<div className='col-sm-12' style={{background:"#fff",width:"470px",padding:"15px 15px"}} >


<div className='col-sm-6' style={{marginLeft:"104px",background:"#fff"}}>
     <div className='form-group' style={{marginBottom:"15px",display:"flex",flexDirection:"column",alignContent:"flex-start",alignItems:"flex-start"}} >
         <label >Reward Type</label>
         
         <select className='form-control' name="rewardType"  value={value?.rewardType} onChange={(e) => {
          
           handleInput(e,"rewardType");
           //handleSelect(e,"rewardType");
           if(value.rewardType === "2" || e.target.value === "2"){
            setBasketOpen(true);
            setShow(false);
          
          }

          
         }}>
             <option value={"1"}  >Buy X Get Y</option>
             <option value={"2"} >Basket Reward</option>
         </select>
     </div>
     <div className='form-group' style={{marginBottom:"15px",display:"flex",flexDirection:"column",alignContent:"flex-start",alignItems:"flex-start"}} >
     <label style={{textAlign:"start"}}>Member Number</label>
     
         <input className='form-control' type='text' id="memberNumber" name="memberNumber" placeholder='Member Number' value={value?.memberNumber || member?.barCodeValue}
          onChange={(e) => {
            handleInput(e,"memberNumber")
          }}
         />
     </div>
     <div>
     <div className='form-group' style={{marginBottom:"15px",display:"flex",flexDirection:"column",alignContent:"flex-start",alignItems:"flex-start"}} >
     <label style={{display:"inline-block",textAlign:"start"}}>UPC1</label>
      
          <input className='form-control' type='text' id="upc1" name="upc1" placeholder='UPC1' value={value?.upc1}
           onChange={(e) => {
            handleInput(e,"upc1")
          }}
          />
      </div>
      <div className='form-group' style={{marginBottom:"15px",display:"flex",flexDirection:"column",alignContent:"flex-start",alignItems:"flex-start"}} >
      <label style={{display:"inline-block",textAlign:"start"}}>Qty</label>
         
          <input className='form-control' type='text' id="qty1" name="qty1" placeholder='Quantity' value={value?.qty1}
           onChange={(e) => {
            handleInput(e,"qty1")
          }}
          />
      </div>
      <div className='form-group' style={{marginBottom:"15px",display:"flex",flexDirection:"column",alignContent:"flex-start",alignItems:"flex-start"}} >
      <label style={{display:"inline-block",textAlign:"start"}}>UPC2</label>
       
          <input className='form-control' type='text' id="upc2" name="upc2" placeholder='UPC2' value={value?.upc2}
           onChange={(e) => {
            handleInput(e,"upc2")
          }}
          />
      </div>
      <div className='form-group' style={{marginBottom:"15px",display:"flex",flexDirection:"column",alignContent:"flex-start",alignItems:"flex-start"}} >
      <label style={{display:"inline-block",textAlign:"start"}}>Qty</label>
      
          <input className='form-control' type='text' id="qty2" name="qty2" placeholder='Quantity' value={value?.qty2}  
           onChange={(e) => {
            handleInput(e,"qty2")
          }}
          />
      </div>
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
     <input type='submit' style={{width:"57px",padding:"6px 12px"}} onClick={(e) =>{submitPoints(e);} } className='form-control btn btn-success ' value="Save" />
  </div>
   </div>
  </div>
</div>

</div>
          </div>
        </div>
      </div>
    </div>
    <AddBasketModalPoints 
    show={basketOpen} 
    handleClosePoints={handleClose} 
    handleBasketClose = {handleBasketClose} 
    setShow={setShow} 
    value={value} 
    setValue={setValue} 
    member={member}  
    successMsg={successMsg}
    clientName = {clientName}
    setShowNotificationError  = { setShowNotificationError}
    searchValue={searchValue}
    />
  </>
  )
}

export default AddPointsModal