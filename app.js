const form = document.querySelector('#task-form')
const taskList = document.querySelector('.collection')
const clearBtn = document.querySelector('.clear-tasks')
const filter = document.querySelector('#filter')
const taskInput = document.querySelector('#task')


// load all Event Listeners

loadEventListeners()

// load all Event Listeners

function loadEventListeners(){
    // DOM Load Event
    document.addEventListener('DOMContentLoaded',getTasks);  
    // Add Task
    form.addEventListener('submit',addTask);
    //Remove Task
    taskList.addEventListener('click',removeTask);
    // Clear Tasks
    clearBtn.addEventListener('click',clearTasks);  
    //filter tasks
    filter.addEventListener('keyup',filterTasks);
}

function getTasks(){
 let tasks;
 if(localStorage.getItem('tasks')===null){
     tasks = [];
 }
 else{
     tasks = JSON.parse(localStorage.getItem('tasks'))
 }
 tasks.forEach(function(task){
    const li = document.createElement('li'); 
   li.className = 'collection-item';
   li.appendChild(document.createTextNode(task));
    // create new link element
    const link = document.createElement('a');
    //add class
    link.className = 'delete-item secondary-content';
    // add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';    
    //append the link to li
    li.appendChild(link);

    taskList.appendChild(li);  
 });
}

// Add Task
function addTask(e){
   if(taskInput.value === '')
   {
       alert('Add a Task');
   }
   // create li element
   const li = document.createElement('li'); 
   li.className = 'collection-item';
   li.appendChild(document.createTextNode(taskInput.value));
    // create new link element
    const link = document.createElement('a');
    //add class
    link.className = 'delete-item secondary-content';
    // add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';    
    //append the link to li
    li.appendChild(link);

    taskList.appendChild(li);   
    
     // store task in Local storage
    storeTask(taskInput.value);

    //clear Input 
    taskInput.value = '';
    e.preventDefault();
}

 function storeTask(task){
    let tasks;
    if(localStorage.getItem('tasks') === null)
    tasks=[];
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);
    localStorage.setItem('tasks',JSON.stringify(tasks))
 }

 function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item'))
    {
        if(confirm('Are you sure to delete task?')){
            e.target.parentElement.parentElement.remove();
            removetaskFromLocalStorage(e.target.parentElement.parentElement);
        }
        
        
    }
 }

 function removetaskFromLocalStorage(taskItem)
 {
    let tasks;
    if(localStorage.getItem('tasks') === null)
    tasks=[];
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task,index){
        if(taskItem.textContent===task){
            tasks.splice(index,1);
        }

    });
    localStorage.setItem('tasks',JSON.stringify(tasks));
 }

 function clearTasks(e)
 {
     while(taskList.firstChild)
     {
         taskList.removeChild(taskList.firstChild);
     }

     clearTasksFromLocalStorage();
 }

 function clearTasksFromLocalStorage()
 {
     localStorage.clear();
 }


function filterTasks(e){
      const text = e.target.value.toLowerCase();
      document.querySelectorAll('.collection-item').forEach
      (function(task){
          const item = task.firstChild.textContent;
          if(item.toLowerCase().indexOf(text) != -1){
              task.style.display = 'block';
          }
          else{
              task.style.display = 'none';
          }
      });
  }