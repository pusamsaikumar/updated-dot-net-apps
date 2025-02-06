import react, { useState } from 'react';

export default (props) => {
    // const closePopUp = () => {    
    // $('.popupCloseButton').click(function(){
    //         $('.hover_bkgr_fricc').hide();
    //     });
    // }
    const [hidden, setHidden] = useState(false);
    const display = hidden ? 'none' : 'block'
    return (
    <div style={{display: display}} className="hover_bkgr_fricc">
    <span className="helper"></span>
    <div className='popup-wrapper'>
        <div onClick={() => setHidden(!hidden)} className="popupCloseButton">&times;</div>
        <p style={{textAlign: 'center'}} className='popup-title'>
        <span style={{color: '#000'}}>
            <span style={{textAlign: 'center'}}><strong>Install APP</strong></span>
        </span>
        </p>
        <p style={{textAlign: 'center'}} className='popup-desc'>
        <span style={{color: '#000'}}>
            <span style={{color: '#000'}}><span style={{textAlign: 'center'}}>{props.text}</span><span style={{textAlign: 'center'}}></span></span>
        </span>
        </p>
        {/* <p style={{textAlign: 'center'}}>
        <span style={{color: '#000'}}>
            <span style={{color: '#000'}}><span style={{textAlign: 'center'}}>access&nbsp;</span><span style={{textAlign: 'center'}}>when you're on the go.</span></span>
        </span>
        </p> */}
        <hr></hr>
        <p style={{textAlign: 'center'}} className='popup-info'>
        <span style={{color: '#000'}}>
            <span style={{color: '#000'}}>
            <span style={{color: '#00ff00'}}>
                <span style={{textAlign: 'center'}}>
                <strong>
                    <span style={{color: '#000',fontWeight:"500"}}>Just tap&nbsp;<img className="download-img" src={props.Image} alt="Share" width={30} height={30} />&nbsp;{props.text2}</span>
                </strong>
                </span>
            </span>
            </span>
        </span>
        </p>
    </div>
</div>
        );
}