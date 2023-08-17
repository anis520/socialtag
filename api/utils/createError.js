


export const CreateError=(msg,status)=>{


const error=new Error()
error.message=msg||'Unknow error'
error.status=status||404


return error

}