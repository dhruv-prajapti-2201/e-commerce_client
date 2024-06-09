export const getLocaleDate = (date: string) => {
  let local = new Date(date);
  const localeDate = `${local.getDate()}/${
    local.getMonth() + 1
  }/${local.getFullYear()}  ${getTime(local)}`;
  return localeDate;
};

const getTime=(date:Date)=> {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? 'pm' : 'am';
   
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}

export const getRs=(price:number)=>{

let rupees = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(price);

  return rupees.split('.')[0];
}
