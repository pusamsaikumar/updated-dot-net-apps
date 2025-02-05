
export const FormatUtcString =(date) => {
 
   if(date){
    const yyyy = date.getUTCFullYear();
    const MM = String(date.getUTCMonth()+1).padStart(2,"0");
    const dd = String(date.getUTCDate()).padStart(2,"0");
    const HH = String(date.getUTCHours()).padStart(2,"0");
    const mm =String(date.getUTCMinutes()).padStart(2,"0");
    const ss = String(date.getUTCSeconds()).padStart(2,"0")
    return `${yyyy}${MM}${dd}${HH}${mm}${ss}`
   }
}


