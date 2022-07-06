const boolchecker = (val,cb) =>{
if(typeof val == "boolean") cb("its boolean vlaue",false)
else cb(false,"its not bolean")


}

boolchecker(15,(res,err)=>{
    if(!err){console.log(res)}
    else console.log(err)
})