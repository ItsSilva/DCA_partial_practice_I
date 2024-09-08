import TaskItem from "../TaskItem/TaskItem.js";

class TaskList extends HTMLElement {

    constructor(){
        super();
        this.attachShadow({mode: 'open'});
        this.tasks = [];
    }

    connectedCallback() {
        this.render();
        this.addEventListeners();
    }

    addTask(title, description){
        const newTask = { title, description, status: 'pending' };
        this.tasks.push(newTask);
        this.renderTasks();
    }

    renderTasks(){
        const taskListContainer = this.shadowRoot.querySelector('.task-list')
        taskListContainer.innerHTML = '';

        this.tasks.forEach((task, index) => {
            const taskItem = document.createElement('task-item');
            taskItem.setAttribute('title', task.title);
            taskItem.setAttribute('description', task.description);
            taskItem.setAttribute('status', task.status);

            taskItem.addEventListener('statusChanged', (event) => {
                this.tasks[index].status = event.detail.newStatus;
                this.renderTasks();
            })
            taskListContainer.appendChild(taskItem);
        })
    }

    addEventListeners(){
        const form = this.shadowRoot.querySelector('.task-list-form')
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            const titleInput = this.shadowRoot.querySelector('#title');
            const descriptionInput = this.shadowRoot.querySelector('#description');
            const title = titleInput.value.trim();
            const description = descriptionInput.value.trim();

            if(title && description){
                this.addTask(title, description);
                titleInput.value = '';
                descriptionInput.value = '';
            }
        })
    }

    render(){
        this.shadowRoot.innerHTML = `
        <section class="task-list-container">
            <form class="task-list-form">
                <input id="title" type="text" placeholder="Add a title task" required>
                <input id="description" type="text" placeholder="Add a description task" required>
                <button type='submit'>Add Task</button>
            </form>
        </section>
        <section class="task-list"></section>
        `;
        this.renderTasks();
    }
}
customElements.define('task-list', TaskList);
export default TaskList;