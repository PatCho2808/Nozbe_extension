window.onload = function() {
    getTasksIfAuth(new NozbeService());
}

function getTasksIfAuth(nozbe){
    chrome.storage.local.get(['access_token'],
        result => {
        if(result.access_token) {
            getTasks(nozbe, result.access_token);
        } else {
            //let token = getTokenFromURL();

            if(token)
            {
                saveToken(token);
                getTasks(nozbe, token);
            } else {
                nozbe.login();
            }
        }
    });
}

function getTasks(nozbe, token){
    nozbe.getTasks(token).then(
        result => addTasksToLists(result),
        error => console.log(error)
    );
}

function getTokenFromURL(){
    let url = new URL(window.location);
    return url.searchParams.get('access_token');
}

function saveToken(token){
    chrome.storage.local.set({'access_token' : token},
        () => console.log("Saved token to: " + token));
}

function addTasksToLists(tasks){
    let todayTasks = document.getElementById('today_tasks');
    let priorityTasks = document.getElementById('priority_tasks');
    let overdueTasks = document.getElementById('overdue_tasks');
    tasks.forEach(task => {
        if(!isTaskCompleted(task))
        {
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

function isTaskCompleted(task)
{
    return task.completed;
}