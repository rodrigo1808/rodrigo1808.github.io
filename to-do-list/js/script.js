class Task {
    constructor(description) {
        this.description = description;
        this.finished = false;
        this.id = description.replace(/\s/g, '');
        this.html = "<div class='task' id=" + description.replace(/\s/g, '') + " onclick='taskClicked(this.id)'> <i class='material-icons'>check_box_outline_blank</i> <p>" + description +  "</p> </div>"
    }

    getDescription() {
        return this.description;
    }
}

var tasksArray = [];
var fullHtmlTasks = "";

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
        console.log(task)
        fullHtmlTasks = fullHtmlTasks + task.html;
    }

    document.getElementById('tasks').innerHTML = fullHtmlTasks;

    localStorage.setItem('tasks', JSON.stringify(tasksArray));
}

function newTask() {
    let newTaskDescription = document.getElementById('newTask').value;
    if(newTaskDescription) {
        if(newTaskDescription[0] === '<') {
            return;
        }
        let task = new Task(document.getElementById('newTask').value);
        document.getElementById('newTask').value = "";
        tasksArray.push(task);
        writeTasks('new');
    }
}

function taskClicked(description) {
    console.log(description);
    for(let task of tasksArray) {
        if(task.id === description) {
            console.log(task);
            if(task.finished) {
                unfinishTask(task);
            } else {
                finishTask(task);
            }
            break;
        }
    }
}

function finishTask(task) {
    task.html = "<div class='task' id=" + task.id + " onclick='taskClicked(this.id)'> <i class='material-icons'>check_box</i> <p>" + task.description +  "</p> </div>"
    task.finished = true;
    writeTasks('new');
}

function unfinishTask(task) {
    task.html = "<div class='task' id=" + task.id + " onclick='taskClicked(this.id)'> <i class='material-icons'>check_box_outline_blank</i> <p>" + task.description +  "</p> </div>"
    task.finished = false;
    writeTasks('new');
}

init();
