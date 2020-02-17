class Task {
    constructor(description) {
        this.description = description;
        this.finished = false;
        this.id = description.replace(/\s/g, '');
        this.html = "<div class='full-item'><div class='task' id=" + description.replace(/\s/g, '') + " onclick='taskClicked(this.id)'> <i class='material-icons'>check_box_outline_blank</i> <p>" + description +  "</p> </div> <i class='material-icons delete-task' id='" + description.replace(/\s/g, '') + "' onclick='deleteTask(this.id)'>close</i></div>"
    }

    getDescription() {
        return this.description;
    }
}

var tasksArray = [];
var fullHtmlTasks = "";
var saveAlertShowed = false;

function init() {
    if(localStorage.getItem('tasks')) {
        tasksArray = JSON.parse(localStorage.getItem('tasks'));
    }
    writeTasks();
}

function writeTasks(state) {
    if(state === 'new') {
        fullHtmlTasks = "";
    }

    for(let task of tasksArray) {
        fullHtmlTasks = fullHtmlTasks + task.html;
    }

    document.getElementById('tasks').innerHTML = fullHtmlTasks;

    localStorage.setItem('tasks', JSON.stringify(tasksArray));
}

function newTask() {
    let newTaskDescription = document.getElementById('newTask').value;
    if(newTaskDescription) {
        let task = new Task(document.getElementById('newTask').value);
        document.getElementById('newTask').value = "";
        if(tasksArray.length === 0 && !saveAlertShowed) {
            document.getElementById('save-alet-area').innerHTML = "<div class='save-alert'><h4>Recado</h4><p>Suas tarefas ficarão salvas mesmo após fechar a aba.</p></div>";
            saveAlertShowed = true;
        }
        tasksArray.push(task);
        writeTasks('new');
    }
}

function taskClicked(description) {
    console.log(description);
    let task = findTask(description);
    if(task.finished) {
        unfinishTask(task);
    } else {
        finishTask(task);
    }
}

function findTask(description) {
    for(let task of tasksArray) {
        if(task.id === description) {
            return task;
        }
    }
}

function cleanTasks() {
    tasksArray = [];
    writeTasks('new');
}

function finishTask(task) {
    task.html = "<div class='full-item'><div class='task' id=" + task.id + " onclick='taskClicked(this.id)'> <i class='material-icons'>check_box</i> <p>" + task.description +  "</p> </div> <i class='material-icons delete-task' id='" + task.id + "' onclick='deleteTask(this.id)'>close</i></div>";
    task.finished = true;
    writeTasks('new');
}

function unfinishTask(task) {
    task.html = "<div class='full-item'><div class='task' id=" + task.id + " onclick='taskClicked(this.id)'> <i class='material-icons'>check_box_outline_blank</i> <p>" + task.description +  "</p> </div> <i class='material-icons delete-task' id='" + task.id + "' onclick='deleteTask(this.id)'>close</i></div>";
    task.finished = false;
    writeTasks('new');
}

function deleteTask(description) {
    for(let i = 0; i < tasksArray.length; i++) {
        if(tasksArray[i].id === description) {
            tasksArray.splice(i, 1);
            break;
        }
    }
    console.log(description + ' deletada');
    writeTasks('new');
}

init();
