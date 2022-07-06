const addUser = document.querySelector("#addUser")
const dataWrap = document.querySelector("#dataWrap")
const singleUser = document.querySelector("#singleUser")
const edituser = document.querySelector("#editUser")
const readFromStorage = (keyword, dataType="array") =>{
    let data 
    try{
        // data = localStorage.getItem("users") || []
        data = JSON.parse(localStorage.getItem(keyword))
        if(!Array.isArray(data) && dataType=="array") 
            throw new Error("data must be an array")
    }
    catch(e){
        data = []
    }
    return data
}
const writeDataToStorage = (keyword, data) => localStorage.setItem(keyword, JSON.stringify(data))
const createMyOwnElement = (parent, ele, txt, classes,  attribute) =>{
    // element, append in parent, class, textcontent, setattribute
    const myEle = document.createElement(ele)
    parent.appendChild(myEle)
    if(classes) myEle.className= classes
    if(txt) myEle.textContent=txt
    if(attribute) myEle.setAttribute(attribute.name, attribute.val) // {name:"id", val:"1"}
    return myEle
}
const emptyData = (msg, cols) =>{
    const tr = createMyOwnElement(dataWrap, 'tr', null, 'alert alert-danger', null)
    createMyOwnElement(tr, 'td', msg,'text-center', {name:"colspan", val:cols})
}
const deleteUser = (allUsers, ind) =>{
    allUsers.splice(ind, 1)
    writeDataToStorage("users", allUsers)
    drawUsers(allUsers)
}
const editUser = (allUsers, ind) =>{ 
    writeDataToStorage("edit", {index: ind, userData: allUsers[ind]})
    window.location.href="edit.html"
}
const showUser = (allUsers, ind) =>{
    writeDataToStorage("single",  allUsers[ind])
    window.location.href="single.html"
}
const drawTable = (allUsers) => {
    allUsers.forEach((user, ind)=>{
        const tr = createMyOwnElement(dataWrap, 'tr', null, null, null)
        createMyOwnElement(tr, 'td', ind+1, null, null)
        createMyOwnElement(tr, 'td', user.id, null, null)
        createMyOwnElement(tr, 'td', user.name, null, null)
        createMyOwnElement(tr, 'td', user.gender, null, null)
        const td = createMyOwnElement(tr, 'td', null, null, null)
        const delBtn = createMyOwnElement(td, "button", 'delete', 'btn btn-danger mx-2', null)
        delBtn.addEventListener("click", ()=> deleteUser(allUsers, ind))
        const editBtn = createMyOwnElement(td, "button", 'edit', 'btn btn-warning mx-2', null)
        editBtn.addEventListener("click", ()=> editUser(allUsers, ind))
        const showBtn = createMyOwnElement(td, "button", 'show', 'btn btn-primary mx-2', null)
        showBtn.addEventListener("click", ()=> showUser(allUsers, ind))
    })
}
const drawUsers = (allUsers) =>{
    dataWrap.textContent=""
    if(allUsers.length==0) emptyData("No Users Yet", 5)
    else drawTable(allUsers)
}
if(addUser){
    addUser.addEventListener("submit", (e)=>{
        e.preventDefault()
        const user = {
            id: Date.now(),
            name: addUser.elements.name.value,
            gender: addUser.elements.gender.value
        }
        const allUsers = readFromStorage("users")
        allUsers.push(user)
        writeDataToStorage("users", allUsers)
        addUser.reset()
        window.location.href = "index.html"
    })
}
if(dataWrap){
    const allUsers= readFromStorage("users")
    drawUsers(allUsers)
}
if(singleUser){
    
    const singleUserData = readFromStorage("single", "obj")
    console.log(singleUserData)
    if(!singleUserData) {
        const tr = createMyOwnElement(singleUser, 'div', "no users found", 'alert alert-danger', null)
    }
   
    const tr = createMyOwnElement(singleUser, 'div', null, null, null)
    createMyOwnElement(tr, 'h4', singleUserData.id, null, null)
    createMyOwnElement(tr, 'h4', singleUserData.name, null, null)
    createMyOwnElement(tr, 'h4', singleUserData.gender, null, null)
}

if(edituser){
    const editUserData = readFromStorage('edit',"obj") ;
    
    
    const userIndex = editUserData.index
    const userData =editUserData.userData 
     const name = document.querySelector("input");
    name.value=userData.name
    const gender = document.querySelector("select");
    gender.value = userData.gender
    
    edituser.addEventListener("submit", (e)=>{
        e.preventDefault()
        const user = {
            
            name: edituser.elements.name.value,
            gender: edituser.elements.gender.value
        }
        const allUsers = readFromStorage("users")

        console.log(allUsers[userIndex])
       allUsers[userIndex].name = user.name
       
      allUsers[userIndex].gender= user.gender 
      
      // allUsers.splice(allUsers,userIndex,user)
        console.log(allUsers[userIndex])
        writeDataToStorage("users", allUsers)
        
        window.location.href = "index.html"
    })
    
    
   


}
