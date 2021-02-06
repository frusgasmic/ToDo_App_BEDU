// STRUCTURE
var container = document.querySelector('#app');
container.className = 'container text-center my-5';

//create title
var title = document.createElement('h1');
title.textContent = 'ToDo App';
//create input
var input = document.createElement('input');
input.placeholder = 'New Task...';
input.className = 'form-control';
//create button submit
var buttonSubmit = document.createElement('button');
buttonSubmit.className = 'd-flex align-items-center btn btn-outline-primary bi bi-plus-circle text-primary';
buttonSubmit.onmouseout = function() {
  buttonSubmit.className = 'd-flex align-items-center btn btn-outline-primary bi bi-plus-circle text-primary';
}
buttonSubmit.onmouseover = function() {
  buttonSubmit.className = 'd-flex align-items-center btn btn-outline-primary bi bi-plus-circle text-light';
}
//create form to input and buttonsubmit
var taskForm = document.createElement('div');
taskForm.className = 'input-group mt-4';
taskForm.append(input,buttonSubmit);
//create tasks container
var tasksContainer = document.createElement('div');
tasksContainer.className = 'mt-4';

container.append(title, taskForm, tasksContainer);

// FUNCTIONALITY
buttonSubmit.addEventListener('click', function() {
  var taskContainer = document.createElement('div');
  taskContainer.className = 'd-flex justify-content-between align-items-center mt-3 bg-success';
  //create all task elements
  var taskCheckbox = document.createElement('input');
  taskCheckbox.type = 'checkbox';
  taskCheckbox.className = 'form-check-input';
  var taskTitle = document.createElement('span');
  taskTitle.textContent = input.value;
  var taskDelete = document.createElement('button');
  taskDelete.className = 'd-flex align-items-center btn btn-danger bi bi-trash';

  //click event to checkbox
  taskCheckbox.addEventListener('click', function(){
    if(taskCheckbox.checked === true){
      taskTitle.style.textDecoration = "line-through";
      //var taskElement = taskTitle.parentNode;
      //taskElement.parentNode.append(taskElement);
    }else {
      taskTitle.style.textDecoration = "none"
    }
  })

  //click event to delete task
  taskDelete.addEventListener('click', function(){
    taskContainer.remove();
  })

  taskContainer.append(taskCheckbox, taskTitle, taskDelete);
  tasksContainer.append(taskContainer)
  //clean input
  input.value = ''
})