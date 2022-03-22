// CODE EXPLAINED channel

// Select the Elements
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");
const add = document.getElementById("add");
const modal = document.getElementById("modal");
const date = document.getElementById("date");
let todoID = 0;
// Classes names
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

add.addEventListener('click', addTodo);
clear.addEventListener('click', clearTodo);
// date.innerHTML= new Date().getDate().getFullYear();

function addTodo() {
    let todos = localStorage.getItem('TODOS') ? JSON.parse(localStorage.getItem('TODOS')) : [];
    if (input.value == "") {
        alert("please add todo");
    }else{
        let todo = {
        val:input.value,
        id:todoID,
        completed: false,
        checked:UNCHECK,
        lineThrough:"",
        }
        todos.push(todo);
        localStorage.setItem('TODOS', JSON.stringify(todos));
        todoID++;
        input.value="";
        updateUI ()
    }
}

function removeTodo(id, that) {
    let todos = JSON.parse(localStorage.getItem('TODOS'));
    if (todos) {
        let removeId = todos.findIndex((todo) => todo.id === id);
        todos.splice(removeId, 1)
        localStorage.setItem('TODOS', JSON.stringify(todos));
        let ele = that.parentElement;
        ele.classList.add("fade-out")
        ele.addEventListener("transitionend", function(){
            updateUI ()
        })
    }
}
function editTodo(id) {
    let todos = JSON.parse(localStorage.getItem('TODOS'));
    let modal = document.querySelector("#modal");
    let edit = document.querySelector("#edit");
    let editId = todos.findIndex((todo) => todo.id === id);
    modal.value=  todos[editId].val;
    edit.innerHTML= `<button type="button" class="btn btn-success" data-bs-dismiss="modal" onClick="submiEdit(${id})">Edit</button>`;
}

function submiEdit(id){
    let todos = JSON.parse(localStorage.getItem('TODOS'));
    let modal = document.querySelector("#modal");
    let editId = todos.findIndex((todo) => todo.id === id);
    todos[editId].val= modal.value;
    localStorage.setItem('TODOS', JSON.stringify(todos));
    updateUI ();
    modal.value="";
}

function completeTodo (id) {
    let todos = JSON.parse(localStorage.getItem('TODOS'));
    if (todos) {
        let completeId = todos.findIndex((todo) => todo.id === id);
        if (todos[completeId].completed === true){
            todos[completeId].completed= false;
            todos[completeId].checked= UNCHECK;
            todos[completeId].lineThrough= "";
        }else if (todos[completeId].completed === false){
            todos[completeId].completed= true;
            todos[completeId].checked= CHECK;
            todos[completeId].lineThrough= LINE_THROUGH;
        }
        localStorage.setItem('TODOS', JSON.stringify(todos));
    }
    updateUI ()
}

function filterTodo(status) {
    let todos = JSON.parse(localStorage.getItem('TODOS'));
    let complete = todos.filter((item) => item.completed.toString() == status);
    list.innerHTML = '';
    if (status == "true" || status == "false") {
        complete.forEach(item => {
            list.innerHTML += `
            <li class="item">
                <i class="fa ${item.checked} co" onClick="completeTodo(${item.id})"></i>
                <p class="text ${item.lineThrough}">${item.val}</p>
                <i class="fa fa-edit de edit" onClick="editTodo(${item.id})" data-bs-toggle="modal" data-bs-target="#edit-modal"></i> 
                <i class="fa fa-trash-o de" onClick="removeTodo(${item.id}, this)"></i> 
            </li>
            ` ;
        })
    }else{
       updateUI();
    }
}

function clearTodo() {
    let todos = JSON.parse(localStorage.getItem('TODOS'));
    if (todos) {
        todos.splice(0, todos.length);
        localStorage.setItem('TODOS', JSON.stringify(todos));
        updateUI ()
    }
}

function updateUI () {
    let todos = JSON.parse(localStorage.getItem('TODOS'));
    list.innerHTML = '';
    if (todos.length >= 1) {
        todos.forEach(item => {
            list.innerHTML += `
            <li class="item">
                <i class="fa ${item.checked} co" onClick="completeTodo(${item.id})"></i>
                <p class="text ${item.lineThrough}">${item.val}</p>
                <i class="fa fa-edit de edit" onClick="editTodo(${item.id})" data-bs-toggle="modal" data-bs-target="#edit-modal"></i>
                <i class="fa fa-trash-o de" onClick="removeTodo(${item.id}, this)"></i> 
            </li>
            ` ;
        })
    }else{
        list.innerHTML = '<li class="item">ADD your TODO</li>';
    }

}
updateUI ();


// Show todays date
const options = {weekday : "long", month:"short", day:"numeric"};
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("en-US", options);

