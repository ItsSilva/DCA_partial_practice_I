class TaskItem extends HTMLElement {
    static get observedAttributes(){
        return ['title', 'description', 'status'];
    }

    constructor(){
        super();
        this.attachShadow({mode: 'open'});
    }

    connectedCallback() {
        this.render();
        this.addEventListeners();
    };

    attributeChangedCallback(propName, oldValue, newValue) {
        if(oldValue !== newValue) {
            this[propName] = newValue;
            this.render();
        };
    };

    toggleStatus(){
        const currentStatus = this.getAttribute('status');
        const newStatus = currentStatus === 'completed' ? 'pending' : 'completed';
        this.setAttribute('status', newStatus);

        this.dispatchEvent(new CustomEvent('statusChanged', {
            detail: { newStatus },
            bubbles: true,
            composed: true
        }));
    };

    addEventListeners(){
        const toggleButton = this.shadowRoot.querySelector('.toggle-status');
        toggleButton.addEventListener('click', () => this.toggleStatus());
    };

    render(){
        this.shadowRoot.innerHTML = `
        <div class="task-container" ${this.status || 'pending' === 'completed' ? 'completed' : ''}>
            <h2>${this.title || 'No Title'}</h2>
            <p>${this.description || 'No Description'}</p>
            <button class="toggle-status">
                ${this.status === 'completed' ? 'Mark as Incomplete' : 'Mark as Complete'}
            </button>
        </div>
        `
    };
};
customElements.define('task-item', TaskItem);
export default TaskItem;