
function getAllData(){
        firebase.database().ref('todo').once('value',function(data){
            a = data.val()
            console.log(a);
            for(key in a ){
                var listCreate = document.createElement('li');
                listCreate.setAttribute('key',key)
                var liText = document.createTextNode(a[key].getInput);
                var adding = document.getElementById('list');
                listCreate.appendChild(liText);
                adding.appendChild(listCreate);
                var createBtn = document.createElement('button');
        var createBtnText = document.createTextNode('Delete');
        createBtn.appendChild(createBtnText);
        listCreate.appendChild(createBtn);
        createBtn.setAttribute('onclick','deletee(this)');
                console.log(a[key].getInput);
            }
        
    })
}
// getAllData()

// if(getAllData){
//     // console.log(getAllData);
// }



function add(){
    var getInput = document.getElementById('inp');
    var listCreate = document.createElement('li');
    
    var liText = document.createTextNode(getInput.value)
    var adding = document.getElementById('list');
    listCreate.appendChild(liText);
    adding.appendChild(listCreate);

    //obj db create
    let key = firebase.database().ref('todo').push().key
    listCreate.setAttribute('key',key)
    let todoList = {
        getInput:getInput.value,
        key:key,
    }

    var createBtn = document.createElement('button');
    var createBtnText = document.createTextNode('Delete');
    createBtn.appendChild(createBtnText);
    listCreate.appendChild(createBtn);
    createBtn.setAttribute('onclick','deletee(this)');
    getInput.value = ""

    var createEdit = document.createElement('Button');
    var editText = document.createTextNode('Edit');
    createEdit.appendChild(editText);
    createEdit.setAttribute('onclick','editBtn(this)')
    listCreate.appendChild(createEdit);

    //firebase add
    
    firebase.database().ref('todo/'+key).set(todoList)
    // firebase.database().ref('todo/'+key).once('value',function(data){
    //     a = data.val()})
    //     console.log(a.getInput);
    // getAllData(key)  
}
function deletee(e){
    key = e.parentNode.getAttribute('key');
    firebase.database().ref('todo/'+key).remove(); 
    e.parentNode.remove()
    

}

function delAll(){
    var getList = document.getElementById('list')
    firebase.database().ref('todo').remove();
    getList.innerHTML ="";
}

function editBtn(e){
    var getBtn = e.parentNode.firstChild.nodeValue
    var setBtn = prompt('Enter the changes',getBtn)
    e.parentNode.firstChild.nodeValue = setBtn
    key = e.parentNode.getAttribute('key');
    let todoList = {
        getInput:setBtn,
        key:key,
    }
    firebase.database().ref('todo/'+key).set(todoList)
}
