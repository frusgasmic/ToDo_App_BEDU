// STRUCTURE
var favicon = document.createElement('link');
favicon.rel = 'shortcut icon';
favicon.type = 'image/x-icon';
favicon.href = 'media/toDoApp.ico';
document.getElementsByTagName('head')[0].append(favicon);


var container = document.querySelector('#app');
container.className = 'container text-center py-5 d-flex flex-column align-items-center justify-content-center';

//create title
var title = document.createElement('h1');
title.textContent = 'ToDo App';
title.className = 'd-flex align-items-center justify-content-between bi bi-patch-check';
title.style.width = '230px';
//create input
var input = document.createElement('input');
input.placeholder = 'New Task...';
input.className = 'form-control mx-sm-3 shadow rounded';
input.style.width = '100px';
input.style.border = 'none';
input.style.borderBottom = 'thick solid #5bc0de';
//create button submit
var buttonSubmit = document.createElement('button');
buttonSubmit.className = 'd-flex align-items-center bg-transparent bi bi-plus-square-dotted text-info px-2';
buttonSubmit.style.border = 'none';
buttonSubmit.style.fontSize = '2.5rem';
buttonSubmit.onmouseout = function() {
    buttonSubmit.className = 'd-flex align-items-center bg-transparent bi bi-plus-square-dotted text-info px-2';
}
buttonSubmit.onmouseover = function() {
        buttonSubmit.className = 'd-flex align-items-center bg-transparent bi bi-plus-square-fill text-info px-2';
    }
    //create form to input and buttonsubmit
var taskForm = document.createElement('section');
taskForm.className = 'input-group my-4 bg-transparent form-inline';
taskForm.append(input, buttonSubmit);

//create tasks container
var tasksContainer = document.createElement('section');
tasksContainer.className = 'd-flex flex-column align-items-center justify-content-center mt-4 w-75 ';

container.append(title, taskForm, tasksContainer);

// FUNCTIONALITY

//preload tunes
var completedTaskTune = document.createElement('audio');
var addedTaskTune = document.createElement('audio');
var deletedTaskTune = document.createElement('audio');
var priorityTune = document.createElement('audio');

function addAudioFileSource(audio, fileName, type) {
    var tune = document.createElement('source');
    tune.src = 'media/' + fileName + '.' + type;
    tune.type = 'audio/' + type;
    audio.append(tune);
}

addAudioFileSource(completedTaskTune, 'achievement', 'ogg');
addAudioFileSource(completedTaskTune, 'achievement', 'mp3');

addAudioFileSource(addedTaskTune, 'add', 'ogg');
addAudioFileSource(addedTaskTune, 'add', 'mp3');

addAudioFileSource(deletedTaskTune, 'delete', 'ogg');
addAudioFileSource(deletedTaskTune, 'delete', 'mp3');

addAudioFileSource(priorityTune, 'priority', 'ogg');
addAudioFileSource(priorityTune, 'priority', 'mp3');

function playAudio(audio) {
    audio.play();
}

buttonSubmit.addEventListener('click', function() {
    var task = document.createElement('div');
    task.className = 'd-flex justify-content-between align-items-center my-3 w-100 p-2 shadow rounded bg-light';

    //create all task elements
    var taskCheckbox = document.createElement('input');
    taskCheckbox.type = 'checkbox';
    taskCheckbox.className = 'form-check-input';
    var taskTitle = document.createElement('span');
    taskTitle.textContent = input.value;

    //task editor
    var taskEditor = document.createElement('div');
    taskEditor.className = 'd-flex justify-content-between align-self-middle align-items-center'
    taskEditor.style.width = '35%'
        //delete task
    var taskDelete = document.createElement('button');
    taskDelete.className = 'd-flex align-items-center btn btn-danger bi bi-trash p-2';
    // select task priority
    var taskPriority = document.createElement('div');
    taskPriority.className = 'd-flex justify-content-between align-self-middle align-items-center w-50 px-1'

    var prioritySelector = document.createElement('div');
    prioritySelector.className = 'd-flex align-items-center rounded p-0';

    var priorityLevel = 1;
    var priorityColors = ['text-success', 'text-warning', 'text-danger'];

    function raisePriority(container, level) {
        container.innerHTML = '';
        for (var i = 0; i < level; i++) {
            var element = document.createElement('div');
            element.className = 'd-flex align-items-center btn bi bi-exclamation-circle-fill align-self-top p-1 ' + priorityColors[level - 1];
            container.append(element);
        }
    }

    function restartPriority(container) {
        container.innerHTML = '';
        raisePriority(container, 1);
    }

    //initiate  level 1 priority 
    raisePriority(prioritySelector, 1);

    prioritySelector.addEventListener('click', function() {
        priorityLevel++;
        if (priorityLevel < 4)
            raisePriority(prioritySelector, priorityLevel);
        else {
            restartPriority(prioritySelector);
            priorityLevel = 1;
        }
        playAudio(priorityTune);
    })

    var priorityText = document.createElement('span');
    priorityText.textContent = 'Priority:'
    taskPriority.append(priorityText, prioritySelector);

    taskEditor.append(taskPriority, taskDelete);



    //sort tasks
    function sortTasks(container) {
        var checkboxItems = document.getElementsByClassName('form-check-input');
        if (checkboxItems.length - 1 >= 1) {
            for (var i = 0; i < checkboxItems.length - 1; i++) {
                if (checkboxItems[i].checked === true)
                    container.append(checkboxItems[i].parentNode);
            }
        }
    }

    //check task
    taskCheckbox.addEventListener('click', function() {
        if (taskCheckbox.checked === true) {
            taskTitle.style.textDecoration = "line-through";

            //send checked task to botton
            sortTasks(tasksContainer);

            //reproduce sound
            playAudio(completedTaskTune);
            doToast(taskTitle, "success");
        } else {

            doToast(taskTitle, "uncheck");
            taskTitle.style.textDecoration = "none"
        }
    })



    //click event to delete task
    taskDelete.addEventListener('click', function() {
        task.remove();
        playAudio(deletedTaskTune);
        doToast(taskTitle, "delete");
    })

    task.append(taskCheckbox, taskTitle, taskEditor);
    tasksContainer.append(task);
    playAudio(addedTaskTune);
    //clean input
    input.value = '';

    //sort tasks
    sortTasks(tasksContainer);
    taskCheckbox.addEventListener('mouseup', sortTasks(tasksContainer));
});

(function(window, document) {

    var container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);

    window.doToast = function(element, desc_accion) {

        var message = element.innerHTML;
        var toast = document.createElement('div');
        if (desc_accion == "success") {
            toast.classList.add('toast', 'toast-success');
            message += " completada";
        } else if (desc_accion == "uncheck") {
            toast.classList.add('toast', 'toast-delete');
            message += " desmarcada";
        } else {
            toast.classList.add('toast', 'toast-delete');
            message += " borrada";
        }

        toast.innerHTML = message;
        container.appendChild(toast);

        setTimeout(function() {
            toast.addEventListener("transitionend", function() {
                container.removeChild(toast);
            }, false);
            toast.classList.add("fadeout");
        }, 1000);
    }
})(window, document);