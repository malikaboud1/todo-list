let tasks = [
    {
        "title":"قراءة كتاب",
        "date":"17/12/2023",
        "isDone":false

    },
  
]

function getTasksFromStorage(){

    let reTrievedTasks = JSON.parse(localStorage.getItem("tasks"))
    if(reTrievedTasks == null){
        tasks = []
    }else{
        tasks = reTrievedTasks
    }

}
getTasksFromStorage()

function fillTasksOnThePage(){
    document.getElementById("tasks").innerHTML =""


       let index = 0;
        for(let task of tasks){
            let content = `
            <div class="task ${task.isDone ? 'done': ''}">
            <div class="task-info">
            <h2> ${task.title}</h2>
            <span class="material-symbols-outlined">
                calendar_month
                </span>
            <span class="date">${task.date}</span>
            </div>

            <div class="task-action">
            <button onclick="deleteTaske(${index})" class="circular delete"><span class="material-symbols-outlined">
                delete
                </span></button>

                ${task.isDone ? ` <button style="background-color:red" onclick="toggleTaskCompletion(${index})" class="circular done"><span class="material-symbols-outlined">
                cancel
                </span></button>`:` <button onclick="toggleTaskCompletion(${index})" class="circular done"><span class="material-symbols-outlined">
                done
                </span></button>`}
           
            <button onclick="editTask(${index})" class="circular edit"><span class="material-symbols-outlined">
                edit
                </span></button>
            </div>
        </div>
            `
            document.getElementById("tasks").innerHTML += content;
           index++;


        }

}
fillTasksOnThePage()



// add task
document.getElementById("add-btn").addEventListener("click",function(){
    let taskName = prompt("الرجاء أدخال أسم المهمة");
    let now = new Date()
    let date = `${now.getDate()}/${now.getMonth()+1}/${now.getFullYear()} | ${now.getHours()}:${now.getMinutes()}`
    let taskObj = {
        "title":taskName,
        "date":date,
        "isDone":false
    }
    tasks.push(taskObj)
    storeTasks()
   
    fillTasksOnThePage()

})
// end add task

// delete task

function deleteTaske(index){
    let task = tasks[index]
    let confirmed = confirm(`هل أنت متأكد من حذف ${task.title}`);
    if(confirmed){
        tasks.splice(index,1)
        storeTasks()
        fillTasksOnThePage()
     

    }
  
}
// end delete task

// edit task
function editTask(index){
    let task = tasks[index]

    let newTaskTitle = prompt("الرجاء أدخال عنوان المهمة الجديد", task.title);
    task.title = newTaskTitle;
    storeTasks()
    fillTasksOnThePage()



}
// //edit task

// complete task
function toggleTaskCompletion(index){
    let task = tasks[index]
    if(task.isDone){
        task.isDone = false;

    }else{
    task.isDone = true;


    }
    storeTasks()
    fillTasksOnThePage()

}
// end complete task



// =============== storage function

function storeTasks(){
    let tasksString = JSON.stringify(tasks)
    localStorage.setItem("tasks",tasksString)

}