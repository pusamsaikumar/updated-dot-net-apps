import { format, min } from "date-fns";
import moment from "moment";
import { forwardRef } from "react";


export  const formateDates = (dateVal) => {
//   if(!dateVal) return;
//    const date = new Date(dateVal);
//    const formatval = format(date,"yyyy-MM-dd h:mm a");
//    return formatval;

// local formats:
      // dateval= 'Tue Dec 31 2024 05:30:00 GMT+0530'
  // const d = new Date(dateVal)
//  d.toISOString();            2024-12-30T23:00:00.000Z"
// d.toLocalString();      "12/31/2024, 5:30:00 AM"


  if(dateVal && !isNaN(new Date(dateVal))){
    let d = new Date(dateVal)
    //return format(d, "MM/dd/yyyy h:mm a");
    return format(d,"yyyy-MM-dd h:mm a");
  }
  return null;
 }

export const CustomDatePicker = forwardRef(({value,placeholder,onClick},ref) => (
  <input
   type='text'
   ref={ref}
   value={value}
   onClick={onClick}
   placeholder={placeholder}
   readOnly
   style={{width:"100%"}}
   className='form-control'
  
  />
));

// Date format adding with moment js with 7 days:
export const MomentDateAddOneWeek = (startDateStr) => {
  if(startDateStr){
    let startDate = moment(startDateStr,"YYYY/MM/DD hh:mm:ss A");
    startDate.add(7,"days");
    return startDate.format("YYYY/MM/DD hh:mm:ss A")

  }
  return null;
}

const convertToDate = (dateStr) => {
    // Match the input format MM/DD/YYYY h:mm A
    let match = dateStr.match(/(\d{4})\/(\d{2})\/(\d{2}) (\d{2}):(\d{2}):(\d{2}) (AM|PM)/);
    if (match) {
        let [_, year, month, day, hour, minute,second, period] = match;
       
        // Convert to 24-hour format
             year = parseInt(year);
             month = parseInt(month) -1;
             day = parseInt(day);
             hour = parseInt(hour);
             minute=parseInt(minute);
             second = parseFloat(second);
           
        if (period === "PM" && hour !==12) {
            hour += 12;
        } else if (period === "AM" && hour === 12) {
            hour = 0;
        }

         return new Date(year, month, day, hour, minute, second );
        //return `${year}-${month}-${day}T${hour}:${minute}:${second}`;
    }
    return null;
};

export const AddToDays = (dateStr, days) => {
    let startDate = convertToDate(dateStr);

    console.log("Parsed Date:", startDate);

    if (startDate instanceof Date && !isNaN(startDate)) {
        // Add the specified number of days
       startDate.setDate(startDate.getDate() + days);
       
        return startDate;
    }
    return null;
};
// format: 2019/11/21 07:20:00 AM  to 21/11/2019 07:20:00 AM

 
export const dateFormateTimeAndDate = (dateStr) => {
    if(!dateStr) return;
     const  sliceString = dateStr?.slice(0,10);
      const split = sliceString?.split("/");
      const year = split[0];
      const mm = split[1];
      const dd = split[2];
        const convertDate = `${dd}/${mm}/${year} ${dateStr?.slice(12)}`;
        return convertDate;
}

// export const  DateFormatToYYYYMMddTime =(dateStr) => {
//   if(!dateStr) return;
//   const sliceDate = dateStr?.slice(0,10);
//   const split = sliceDate?.split("/");
//   const year = split[0];
//   const mm = split[1];
//   const dd = split[2];
//   if(split){
//     const convertDate = `${year}-${mm}-${dd} ${dateStr?.slice(11)}`;
//     return convertDate;
//   }
// }

export const  DateFormatToYYYYMMddTime =(dateStr) => {
  if(!dateStr) return;
    return  new Date(dateStr).toISOString();
}

//  const CustomDatePicker = forwardRef(({value,placeholder,onClick},ref) => (
//   <input
//    type='text'
//    ref={ref}
//    value={value}
//    onClick={onClick}
//    placeholder={placeholder}
//    readOnly
//    style={{width:"400px"}}
//    className='form-control'
  
//   />
// ))

//  const formateDates = (dateVal) => {
// //   if(!dateVal) return;
// //    const date = new Date(dateVal);
// //    const formatval = format(date,"yyyy-MM-dd h:mm a");
// //    return formatval;

// // local formats:
//       // dateval= 'Tue Dec 31 2024 05:30:00 GMT+0530'
//   // const d = new Date(dateVal)
// //  d.toISOString();            2024-12-30T23:00:00.000Z"
// // d.toLocalString();      "12/31/2024, 5:30:00 AM"


//   if(dateVal && !isNaN(new Date(dateVal))){
//     let d = new Date(dateVal)
//     //return format(d, "MM/dd/yyyy h:mm a");
//     return format(d,"yyyy-MM-dd h:mm a");
//   }
//   return null;
//  }


//  useEffect(() => {
//   let startDateStr = "2019/11/21 07:20:00 AM";

//   // Using moment.js to parse and manipulate the date
//   let startDate = moment(startDateStr, "YYYY/MM/DD hh:mm:ss A");
  
//   // Add one week (7 days)
//   startDate.add(7, 'days');
  
//   // Format the date to the desired format
//   let formattedDate = startDate.format("YYYY/MM/DD hh:mm:ss A");
  
//   console.log("moment",formattedDate);

//  },[]);