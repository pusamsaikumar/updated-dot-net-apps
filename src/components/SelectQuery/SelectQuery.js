import React, {useState} from 'react'
import { Button, Col, Form, FormControl, Row, Spinner, Table } from 'react-bootstrap';
import './selectQuery.css';
import { useDispatch, useSelector } from 'react-redux';
import { getClientDetails } from '../redux/API';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee,faBars,faDownload ,faFileExport} from '@fortawesome/free-solid-svg-icons';
import LoaderModal from "../Models/LoaderModal";
const SelectQuery = ({clientName,isEnlarged}) => {

    const [selectQuery,setSelectQuery] = useState("");
    const getcleintsdata =  useSelector(state => state.getcleintsdata); 
    const getclientsMessage = useSelector(state => state.getclientsMessage);
    const getclientsLoading = useSelector(state => state.getclientsLoading);
    const dispatch = useDispatch();
  
   
   console.log("getclient",getcleintsdata)
    
    const prohibhtedKeyword = ["DROP","drop","delete","DELETE","UPDATE","update","set","SET","INSERT","insert","*","TRUNCATE","truncate","nolock","NOLOCK","{","}","count(*)","COUNT(*)","/","^","!",":","|","]","[",  '"','"',,"&","@" ];
    const [errorMsg,setErrorMsg] = useState("");
    const handleInput = (e) => {
      const value = e.target.value;
      
      setSelectQuery(value);
    const errorKeyword = prohibhtedKeyword.find(keyword => value.includes(keyword));
    if(errorKeyword){
      setErrorMsg(`The ${errorKeyword?.length> 1 ? "term" :"character"} ${errorKeyword} is not allowed.`)
    }else{
      setErrorMsg("");
    }
       
    }
    const handleSubmit = (e) => {

      e.preventDefault();
      if(selectQuery === ""){
        setErrorMsg("Please write query.")
      }
      if(errorMsg === "" && selectQuery !=""){
        dispatch(getClientDetails(clientName,selectQuery));
        //setSelectQuery("");
      }
 
      
    }
   

    // Download json file:
    const exportData = ()=>{
      const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(JSON.stringify(getcleintsdata))}`;
      const link = document.createElement("a");
      link.href = jsonString;
      link.download = "ClientInfo.json";
      link.click();
    }
    console.log("SQUERY NAEM",clientName);
  return (

    <>
      <div className='right side-menu'>
       
       </div>
       <div className='content-page style-gg'  style={{ height: "100vh", marginLeft:isEnlarged ? "50px" :"240px"}}>
                <div className='content' style={{
                    overflowY: "auto",
                    maxHeight: "100vh",
                    padding: "10px",
                   outline:"none",
                  
                //    marginLeft:isEnlarged ? "0px" :"0px"
                    // background: "#f3f3f3"
                    // backgroundColor: "#f9f9f9"
                }}>
            <> 
        <div className='' style={{marginTop:"60px"}}>
        <Form onSubmit={handleSubmit} className='' style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
        <Form.Group>
            <Form.Label>Enter Query</Form.Label>
            <Form.Control as={"textarea"} rows={10} cols={100} className='form-control' style={{width:"500px",height:"250px"}} placeholder='Please Enter Query .....' onChange={(e) => {
             handleInput(e);
            }} />
            <p style={{color:"red"}}>{errorMsg}</p> 
        </Form.Group>
        
         <Button style={{marginTop:"20px",margin:"auto 225px"}} className='btnSearch btn btn-success' type='submit'>Submit</Button>
         
        </Form>
        </div>
        <>
       
        </>
     {
      getclientsMessage === "Successful" &&  getcleintsdata != null ?
      <>
        <div style={{marginTop:"20px" ,display:"block"}}>
         <div className='gridBtn'>
             <Button type='button' className='btn btn-success' style={{marginBottom:"5px",gap:"2px"}} onClick={exportData}>
              {/* {"Download"} */}
              {"Export"}
              <span >
                {/* <FontAwesomeIcon icon={faDownload} style={{marginLeft:"10px"}} /> */}
                <FontAwesomeIcon icon={faFileExport}  style={{marginLeft:"10px"}} />
              </span>
             </Button>
         </div>
          <table className='table table-bordered table-stripped table-hover'> 
            <thead>
                <tr>
                 {
                  getcleintsdata?.length > 0 && 
                  Object?.keys(getcleintsdata[0]).map((val,i) => {
                    return <th>{val}</th>
                  })
                 }
                 
                </tr>
            </thead>
            <tbody>
               {
                  getcleintsdata?.length > 0  && (

                    getcleintsdata?.map((data,i) => {
                      return <tr key={i}>
                    
                         {
                          Object.values(data).length > 0 ? (

                            Object.values(data).map((item,j) => {
                              return <td key={j}>{item}</td>
                            })
                          ) : (
                          <td style={{textAlign:"center"}}>
                              Records Not Found.
                          </td>)
                         }

                      </tr>
                    })
                  ) 
                }
                 
            </tbody>
          </table>

          {
            getcleintsdata == undefined   && <p style={{textAlign:"center"}}>Records not found.</p>
          }
        </div>
      </>
      : <>
         <div style={{marginTop:"20px" , display:"flex",alignContent:"center",justifyContent:"center"}}>
          {
          getclientsLoading === true && <LoaderModal show={true} />
          }
         
         </div>
      </>
     }
     {
      getcleintsdata === undefined && getclientsMessage === "Successful"  && <p style={{textAlign:"center"}}>No records found...</p>
     }
    </>
<>
     {getclientsMessage !== "Successful"  && getclientsMessage!="" &&
       <div style={{marginTop:"20px"}}>
          <p style={{color:"red",textAlign:"center"}}>{getclientsMessage}</p>
       </div>
     }
</>
            </div>
       </div>
      
    </>
   
  )
}

export default SelectQuery