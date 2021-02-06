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
  var task = document.createElement('div');
  task.className = 'd-flex justify-content-between align-items-center mt-3';
  
  //create all task elements
  var taskCheckbox = document.createElement('input');
  taskCheckbox.type = 'checkbox';
  taskCheckbox.className = 'form-check-input';
  var taskTitle = document.createElement('span');
  taskTitle.textContent = input.value;

  //task editor
  var taskEditor = document.createElement('div'); 
  taskEditor.className = 'd-flex justify-content-around align-self-middle align-items-center w-25'
    //delete task
  var taskDelete = document.createElement('button');
  taskDelete.className = 'd-flex align-items-center btn btn-danger bi bi-trash';
    // select task priority
  //var taskPriority = document.createElement('div');
  /*
  var prioritySelector = document.createElement('button');
  prioritySelector.className = 'btn border-secondary text-secondary';
  prioritySelector.textContent = 'Priority';
  prioritySelector.addEventListener('click', function(){
    var prioritySelectorClicked = aText.toggle('1');
    if(prioritySelectorClicked)
      console.log('1 click!');
    else
      console.log('2 click!');
  })
  */
  taskEditor.append(taskDelete);

  //preload tunes
  var completeTaskTune = document.createElement('audio');
  var tuneFiles = document.createElement('source');
  tuneFiles.src = 'media/achievement.ogg';
  tuneFiles.type = 'audio/ogg';
  completeTaskTune.append(tuneFiles);
  tuneFiles.src = 'media/achievement.mp3';
  tuneFiles.type = 'audio/mp3';
  completeTaskTune.append(tuneFiles);
  function playAudio() {
    completeTaskTune.play();
  }

  //sort tasks
  function sortTaks(container) {
    var checkboxItems = document.getElementsByClassName('form-check-input');
    if(checkboxItems.length-1 >= 1) {
      for(var i = 0; i < checkboxItems.length-1; i++) {
        if(checkboxItems[i].checked === true)
          container.append(checkboxItems[i].parentNode);
      }
    }
  }

  //click event to checkbox
  taskCheckbox.addEventListener('click', function(){
    if(taskCheckbox.checked === true){
      taskTitle.style.textDecoration = "line-through";
      
      //send checked task to botton
      //var taskElement = taskTitle.parentNode;
      //taskElement.parentNode.append(taskElement);
      
      sortTaks(tasksContainer);

      //reproduce sound
      playAudio();
    }else {
      taskTitle.style.textDecoration = "none"
    }
  })

  //click event to delete task
  taskDelete.addEventListener('click', function(){
    task.remove();
  })

  task.append(taskCheckbox, taskTitle, taskEditor);
  tasksContainer.insertBefore(task, tasksContainer.lastChild)
  //clean input
  input.value = ''
  sortTaks(tasksContainer);
})
