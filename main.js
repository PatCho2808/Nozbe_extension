window.onload = function() {
    let nozbe = new NozbeService();
    nozbe.getTasks().then(
        result => addTasksToLists(result),
        error => console.log(error)
    );
}

function addTasksToLists(tasks){
    let todayTasks = document.getElementById('today_tasks');
    let priorityTasks = document.getElementById('priority_tasks');
    let overdueTasks = document.getElementById('overdue_tasks');
    console.log(tasks);
    tasks.forEach(task => {
        if(isTaskDueToday(task))
        {
            addTaskToList(task, todayTasks);
        }
        else if(isTaskOverdue(task))
        {
            addTaskToList(task, overdueTasks);
        }
        else if(isTaskPriority(task))
        {
            addTaskToList(task, priorityTasks);
        }
    })
}

function isTaskDueToday(task){
    let today = new Date();
    let task_date = new Date(task.datetime);
    return today.getDate() === task_date.getDate() &&
        today.getMonth() === task_date.getMonth() &&
        today.getFullYear() === task_date.getFullYear();
}

function isTaskOverdue(task)
{
    let today = new Date();
    let task_date = new Date(task.datetime);
    return today.getDate() > task_date.getDate() &&
        today.getMonth() === task_date.getMonth() &&
        today.getFullYear() === task_date.getFullYear();
}

function isTaskPriority(task){
    return task.next;
}

function addTaskToList(task, list){
    let li = document.createElement('li');
    li.innerHTML = task.name;
    list.append(li);
}