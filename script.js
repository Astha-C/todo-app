const addBtn = document.querySelector(".btn");
const addInput = document.querySelector(".form-todo input[type ='text']");
const addList = document.querySelector(".todo-list");
const container = document.querySelector(".container");
const showmoreBtn = document.querySelector(".showMore");
const showlessBtn = document.querySelector(".showLess");
let todos = JSON.parse(localStorage.getItem("todo")) || [];
// let tempTodos = todos;

function sameContent(todo) {
    // console.log(todo.title, "rshfbsjdbg")
        const li = document.createElement("li");
        liInnerHtml = `
        <span class="text">${todo.title}</span>    
        <div class="todo-buttons">
        <button class="todo-btn done">Done</button>
        <button class="todo-btn remove">Remove</button>
        </div> 
        `
        li.id = todo.id;
        li.innerHTML = liInnerHtml;
        addList.append(li);

        if(todo.done){
            li.querySelector(".text").style.textDecoration = "line-through";
        }

        if(addList.children.length===4){
            // console.log(showmoreBtn)
            showmoreBtn.style.display = "inline";
        }
}

addInput.addEventListener("keyup",(e)=>{
    if (e.keyCode===13) {
        addBtn.click();
    }
})

addBtn.addEventListener("click", (e)=>{
    e.preventDefault();
    if (addInput.value.length===0) {
        alert("Please add task!!")
    }
    else{
        const task = addInput.value;
        // console.log(task)
        const todoObj = {
            title : task,
            done : false,
            id : todos.length
        };
        todos.push(todoObj);
        localStorage.setItem("todo", JSON.stringify(todos));

        sameContent(todoObj);

        // const newLi = document.createElement("li");
        // newLiInnerHTML = `
        // <span class="text">${task}</span>    
        // <div class="todo-buttons">
        //     <button class="todo-btn done">Done</button>
        //     <button class="todo-btn remove">Remove</button>
        // </div> `
        // newLi.innerHTML = newLiInnerHTML;
        // newLi.id = todoObj.id;
        // addList.append(newLi);
        addInput.value="";


    // if(addList.children.length===4){
    //     // console.log(showmoreBtn)
    //     showmoreBtn.style.display = "inline";
    // }

    }
})

showmoreBtn.addEventListener("click",()=>{
    showmoreBtn.style.display = "none"
    addList.style.overflowY = "auto"
    showlessBtn.style.display = "inline"
})

showlessBtn.addEventListener("click",()=>{
    addList.style.overflowY = "hidden"
    showlessBtn.style.display = "none"
    showmoreBtn.style.display = "inline"
})


addList.addEventListener("click",(e)=>{
    if(e.target.classList.contains("done")){
        const taskDone = e.target.parentNode.previousElementSibling;
        // console.log(e.target.parentNode.parentNode);
        // const todotext = taskDone.textContent;
        const liId = e.target.parentElement.parentElement.getAttribute('id');
        taskDone.style.textDecoration = "line-through";

        // console.log(typeof(liId),"bjhsd")
        const modifiedTodos = todos.map((todo) => {
            // console.log(liId,"gyjhfj",typeof(todo.id),"jbfhasb");

            if(liId==todo.id){
                // console.log(todo.done,"jbfhasb");

                todo.done = true;
                // console.log(todo.done,"jbfhasb");
            }
            return todo;
        })
        // console.log(modifiedTodos)

        // const todoDone = todos.find(todo => todo.title === todotext)
        // if(todoDone){
        //     todoDone.done = true;
        // }
        localStorage.setItem("todo",JSON.stringify(modifiedTodos))
    }

    if(e.target.classList.contains("remove")){
        const taskRemove = e.target.parentNode.parentNode;
        // console.log(taskRemove) 
        // const todotext = taskRemove.querySelector(".text").textContent;
        const todoId = taskRemove.id;
        // console.log(todoId, "removed")
        taskRemove.remove();
        // console.log(todos,"todos")
        
        const todoRemove = todos.filter(todo => {
            // console.log(todoId,"***",todo.id,"----",todo.id!=todoId,"+++")
            return todo.id!=todoId;
        })
        // tempTodos = todoRemove;
        todos = todoRemove;
        // console.log(todoRemove,"///")
        
        // const todoRemove = todos.filter(todo => todo.title!==todotext)
        localStorage.setItem("todo", JSON.stringify(todoRemove));

        if(addList.children.length<4){
            showmoreBtn.style.display = "none";
            showlessBtn.style.display = "none";
        }
    }

})

document.addEventListener("DOMContentLoaded",()=>{
    if(todos.length>0){

        // let i = 0;
        todos.forEach((todo) => {
            // const li = document.createElement("li");
            // liInnerHtml = `
            // <span class="text">${todo.title}</span>    
            // <div class="todo-buttons">
            // <button class="todo-btn done">Done</button>
            // <button class="todo-btn remove">Remove</button>
            // </div> 
            // `
            // li.innerHTML = liInnerHtml;
            const newTodoObj = {
                title : todo.title,
                done : todo.done,
                id : todo.id
            }
            sameContent(newTodoObj);
            // i++;
            // li.id = i;

            // if(todo.done){
            //     li.querySelector(".text").style.textDecoration = "line-through";
            // }

            // addList.append(li);

            // if(addList.children.length===4){
            //     // console.log(showmoreBtn)
            //     showmoreBtn.style.display = "inline";
            // }
        });
    }
})


