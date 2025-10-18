const form = document.getElementById('Form');
const input = document.getElementById('itemInput');
const errorMessage = document.getElementById('errorMessage');
const todoList = document.getElementById('toDoList');

document.addEventListener('DOMContentLoaded', loadTasks);

form.addEventListener('submit', function(event){
    event.preventDefault();

    const taskText = input.value.trim();

    if (taskText === '') {
        // jika input kosong
        errorMessage.textContent = 'Tugas tidak boleh kosong';
        input.classList.add('invalid');
        input.classList.remove('valid');
    } else {
        errorMessage.textContent ='';
        input.classList.remove('invalid');
        input.classList.add('valid');

        addTask(taskText);
        input.value = '';
    }
});

function addTask(taskText) {
    const li = document.createElement('li');
    const emoji = '🍵';
    li.textContent = emoji + taskText;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Hapus';
    deleteBtn.className = 'delete-btn';
    deleteBtn.addEventListener('click', function() {
        todoList.removeChild(li);
        saveTasks();
    });

    li.appendChild(deleteBtn);

    li.addEventListener('click', function(event) {
        if (event.target !== deleteBtn) {
            li.classList.toggle('completed');
            saveTasks();
        }
    });

    toDoList.appendChild(li);
    saveTasks();
}

function saveTasks() {
    const tasks = [];
    document.querySelectorAll('#todoList li').forEach(li => {
        tasks.push({
            text: li.firstChild.textContent,  
            completed: li.classList.contains('completed')  
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));  
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        addTask(task.text);  
        const li = todoList.lastChild;  
        if (task.completed) {
            li.classList.add('completed');  
        }
    });
}