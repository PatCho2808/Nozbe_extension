class App
{
    nozbe = null;
    auth = null;

    constructor(nozbe, auth)
    {
        this.nozbe = nozbe;
        this.auth = auth;
    }

    setupPage()
    {
        this.auth.authorize(this.nozbe, () => {
            this.setupLists(); 
        }); 
    }

    setupLists()
    {
        this.setupTasks();
        this.setupFilters();
    }

    setupTasks()
    {
        this.nozbe.getTasks(this.auth.getToken()).then(
            result => this.addTasksToLists(result),
            error => console.log(error)
        );
    }

    addTasksToLists(tasks)
    {
        let todayTasks = document.getElementById('today_tasks');
        let priorityTasks = document.getElementById('priority_tasks');
        let overdueTasks = document.getElementById('overdue_tasks');
        tasks.forEach(task => {
            if(!this.isTaskCompleted(task))
            {
                if(this.isTaskDueToday(task))
                {
                    this.addTaskToList(task, todayTasks);
                }
                else if(this.isTaskOverdue(task))
                {
                    this.addTaskToList(task, overdueTasks);
                }
                else if(this.isTaskPriority(task))
                {
                    console.log(task); 
                    this.addTaskToList(task, priorityTasks);
                }
            }
        });
    }


    isTaskDueToday(task){
        let today = new Date();
        let task_date = new Date(task.datetime);
        return today.getDate() === task_date.getDate() &&
            today.getMonth() === task_date.getMonth() &&
            today.getFullYear() === task_date.getFullYear();
    }

    isTaskOverdue(task)
    {
        let today = new Date();
        let task_date = new Date(task.datetime);
        return today.getDate() > task_date.getDate() &&
            today.getMonth() === task_date.getMonth() &&
            today.getFullYear() === task_date.getFullYear();
    }

    isTaskPriority(task){
        return task.next && !task.datetime;
    }

    addTaskToList(task, list){
        let li = document.createElement('li');
        li.innerHTML = task.name;
        list.append(li);
    }

    isTaskCompleted(task)
    {
        return task.completed;
    }

    setupFilters()
    {
        this.nozbe.getAllCategories(this.auth.getToken()).then(
            result => this.addFiltersToList(result),
            error => console.log(error)
        );
    }

    addFiltersToList(categories)
    {
        let div = document.getElementById('filters');
        categories.forEach(category => {
            this.addFilterToList(category, div);
        });
    }

    addFilterToList(category, div) {
        let formCheck = this.createFormCheckElement();
        formCheck.append(this.createInputElement(category));
        formCheck.append(this.createLabelElement(category));
        div.append(formCheck);
    }

    createFormCheckElement() {
        let formCheck = document.createElement('div');
        formCheck.className = "form-check";
        return formCheck;
    }

    createLabelElement(category) {
        let label = document.createElement('label');
        label.classList = "form-check-label";
        label.htmlFor = category.id;
        label.innerText = category.name;
        return label;
    }

    createInputElement(category) {
        let input = document.createElement('input');
        input.className = "form-check-input"
        input.type = "checkbox";
        input.value = category.id;
        input.id = category.id;
        input.name = 'categories';
        return input;
    }

    filter(filters)
    {
        this.resetPriorityList();
        filters.forEach(filter => {
            this.nozbe.getTasksByCategoryId(this.auth.getToken(), filter).then(
                result => this.addTasksToLists(result),
                error => console.log(error)
            );
        })
    }

    resetPriorityList() {
        let list = document.getElementById('priority_tasks');
        list.innerHTML = "";
    }
}