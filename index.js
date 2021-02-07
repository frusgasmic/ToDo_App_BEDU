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

//preload tunes
var completedTaskTune = document.createElement('audio');
var addedTaskTune = document.createElement('audio');
var deletedTaskTune = document.createElement('audio');
var priorityTune = document.createElement('audio');

function addAudioFileSource(audio,fileName, type) {
  var tune = document.createElement('source');
  tune.src = 'media/' + fileName + '.' + type;
  tune.type = 'audio/' + type;
  audio.append(tune);
}

addAudioFileSource(completedTaskTune,'achievement','ogg');
addAudioFileSource(completedTaskTune,'achievement','mp3');

addAudioFileSource(addedTaskTune,'add','ogg');
addAudioFileSource(addedTaskTune,'add','mp3');

addAudioFileSource(deletedTaskTune,'delete','ogg');
addAudioFileSource(deletedTaskTune,'delete','mp3');

addAudioFileSource(priorityTune,'priority','ogg');
addAudioFileSource(priorityTune,'priority','mp3');

function playAudio(audio) {
  audio.play();
}

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
  taskEditor.className = 'd-flex justify-content-between align-self-middle align-items-center w-25'
    //delete task
  var taskDelete = document.createElement('button');
  taskDelete.className = 'd-flex align-items-center btn btn-danger bi bi-trash p-2';
    // select task priority
  var taskPriority = document.createElement('div');
  taskPriority.className = 'd-flex justify-content-between align-self-middle align-items-center w-50'
  
  var prioritySelector = document.createElement('div');
  prioritySelector.className = 'd-flex align-items-center border border-secondary rounded p-0';

  var priorityLevel = 1;
  var priorityColors = ['text-success','text-warning','text-danger'];

  
  
  function raisePriority(container, level) {
    container.innerHTML = '';
    for(var i = 0; i < level; i++){
      var element = document.createElement('div');
      element.className = 'btn bi bi-exclamation-circle-fill align-self-top p-1 ' + priorityColors[level-1];
      console.log(element.className);
      container.append(element);
    }
  }
  
  function restartPriority(container) {
    container.innerHTML = '';
    raisePriority(container, 1);
  }

  //initiate  level 1 priority 
  raisePriority(prioritySelector,1);

  prioritySelector.addEventListener('click', function() {
    priorityLevel++;
    if(priorityLevel < 4)
      raisePriority(prioritySelector,priorityLevel);
    else {
      restartPriority(prioritySelector);
      priorityLevel = 1;
    }
    playAudio(priorityTune);
  })

  
  taskPriority.append(document.createElement('span').textContent = 'Priority:',prioritySelector);

  taskEditor.append(taskPriority,taskDelete);

  

  //sort tasks
  function sortTasks(container) {
    var checkboxItems = document.getElementsByClassName('form-check-input');
    if(checkboxItems.length-1 >= 1) {
      for(var i = 0; i < checkboxItems.length-1; i++) {
        if(checkboxItems[i].checked === true)
          container.append(checkboxItems[i].parentNode);
      }
    }
  }

  //check task
  taskCheckbox.addEventListener('click', function(){
    if(taskCheckbox.checked === true){
      taskTitle.style.textDecoration = "line-through";
      
      //send checked task to botton
      sortTasks(tasksContainer);

      //reproduce sound
      playAudio(completedTaskTune);
    }else {
      taskTitle.style.textDecoration = "none"
    }
  })
  
  

  //click event to delete task
  taskDelete.addEventListener('click', function(){
    task.remove();
    playAudio(deletedTaskTune);
  })

  task.append(taskCheckbox, taskTitle, taskEditor);
  tasksContainer.append(task);
  playAudio(addedTaskTune);
  //clean input
  input.value = '';

  //sort tasks
  sortTasks(tasksContainer);
  taskCheckbox.addEventListener('mouseup', sortTasks(tasksContainer));
})
