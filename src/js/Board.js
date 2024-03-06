import { CreateRequest } from "./CreateRequest";
import Popovers from "./Popovers";

export default class Board {
    constructor() {
        this.board = document.querySelector('.board');
        this.tasks = [];
        this.popovers = new Popovers();
        this.currentTicket;
    }

    async buildtoDOM() {
        const btnAddTicket = document.createElement('button');
        btnAddTicket.classList.add('btn-create-ticket');
        btnAddTicket.textContent = 'Добавить тикет';
        btnAddTicket.addEventListener('click', () => {
            this.popovers.buildAddPopover();
            const buttons = Array.from(document.querySelectorAll('.button'));
            buttons[0].addEventListener('click', this.submitForm.bind(this))
            buttons[1].addEventListener('click', this.popovers.deletePopover);
        })
        const ticketList = document.createElement('ul');
        ticketList.classList.add('ticket-list');
        this.board.appendChild(btnAddTicket);
        this.board.appendChild(ticketList);
        const tasks =  await CreateRequest({
            data: {
              method: 'allTickets',
            },
            responseType: 'json',
            method: 'GET',
          });
        console.log(tasks);
        this.buildTasks(tasks);
        
    }
    
    buildTasks(tasks) {
        const ticketList = document.querySelector('.ticket-list');
        tasks.forEach(item => {
            const task = document.createElement('ul');
            task.classList.add('ticket');
            const nameStatus = document.createElement('div');
            nameStatus.classList.add('ticket-status-name');
            const status = document.createElement('input');
            status.classList.add('ticket-status');
            status.type = 'checkbox';
            status.id = `checkbox${item.id}`;
            const label = document.createElement('label');
            label.classList.add('label-for-checkbox');
            label.setAttribute('for', `checkbox${item.id}`);
            const name = document.createElement('h1');
            name.classList.add('ticket-name');
            nameStatus.appendChild(status);
            nameStatus.appendChild(label);
            nameStatus.appendChild(name);
            const rightSide = document.createElement('div');
            rightSide.classList.add('ticket-rightside');
            const dateTime = document.createElement('span');
            dateTime.classList.add('ticket-date-time');
            const ticketButtons = document.createElement('div');
            ticketButtons.classList.add('ticket-buttons');
            rightSide.appendChild(dateTime);
            rightSide.appendChild(ticketButtons);
            const edit = document.createElement('button');
            edit.classList.add('ticket-button-edit');
            edit.textContent = "✎";
            const deleteTicket = document.createElement('button');
            deleteTicket.classList.add('ticket-button-delete');
            deleteTicket.textContent = "x";
            ticketButtons.appendChild(edit);
            ticketButtons.appendChild(deleteTicket);
            task.appendChild(nameStatus);
            task.appendChild(rightSide);
            ticketList.appendChild(task);
            task.dataset.id = item.id;
            name.textContent = item.name;
            if (item.status === "true" ||
                item.status === true) {
                status.checked = true;
            };
            dateTime.textContent = item.created;
            this.tasks.push(task);
            this.registerTaskEvents(task);
        });    
    }
    
    registerTaskEvents(task) {
        const editBtn = task.querySelector('.ticket-button-edit');
        const deleteBtn = task.querySelector('.ticket-button-delete');
        const checkBoxBtn = task.querySelector('.ticket-status');
        task.addEventListener('click', (e) => {
            const checkbox = task.querySelector('.label-for-checkbox');
            const trueCheckBox = task.querySelector('.ticket-status');
            if (e.target === checkbox || 
                e.target === editBtn || 
                e.target === deleteBtn || 
                e.target === trueCheckBox) {
                return;
            }
            this.showDescription(task);
        });

        checkBoxBtn.addEventListener('click', async () => {
            this.currentTicket = task;
            let options = {};
            if (checkBoxBtn.checked) {
                options = {
                    data: {
                        method: 'updateById',
                        id: this.currentTicket.dataset.id,
                        status: true
                    },
                    responseType: 'json',
                    method: 'POST',
                }
            } else {
                options = {
                    data: {
                        method: 'updateById',
                        id: this.currentTicket.dataset.id,
                        status: false
                    },
                    responseType: 'json',
                    method: 'POST',
                }
            }
            await CreateRequest(options);
            this.tasks = [];
            this.currentTicket = null;
            this.removeTasks();
            const tasks =  await CreateRequest({
                data: {
                    method: 'allTickets',
                },
                responseType: 'json',
                method: 'GET',
            });
            console.log(tasks);
            this.buildTasks(tasks);
        })

        editBtn.addEventListener('click', async () => {
            this.currentTicket = task;
            this.popovers.buildEditPopover(task);
            const inputShort = document.querySelector('.input-short-description');
            const inputFull = document.querySelector('.text-full-description');
            inputShort.value = task.querySelector('.ticket-name').textContent;
            inputFull.innerHTML = await CreateRequest({
                data: {
                    method: 'ticketById',
                    id: this.currentTicket.dataset.id
                },
                responseType: 'text',
                method: 'GET'
            })
            const buttons = Array.from(document.querySelectorAll('.button'));
            buttons[0].addEventListener('click', this.submitForm.bind(this))
            buttons[1].addEventListener('click', this.popovers.deletePopover);
        })
        deleteBtn.addEventListener('click', () => {
            this.currentTicket = task;
            this.popovers.buildDeletePopover();
            const buttons = Array.from(document.querySelectorAll('.button'));
            buttons[0].addEventListener('click', this.deleteForm.bind(this)); 
            buttons[1].addEventListener('click', this.popovers.deletePopover);
        })
    }

    async submitForm(e) {
        e.preventDefault();
        console.log(e);
        const name = document.querySelector('.input-short-description');
        const description = document.querySelector('.text-full-description');
        const array = [];
        for (let i = 0; i < this.tasks.length; i++) {
            let id = this.tasks[i].dataset.id;
            array.push(id);
        }
        let options = {
            data: {
                method: 'createTicket',
                id: Math.max.apply(null, array) + 1,
                status: false,
                name: name.value,
                description: description.value,
            },
            responseType: 'json',
            method: 'POST',
        };
        await CreateRequest(options);
        if (e.target.parentElement.parentElement.classList.contains('popover-edit')) {
            options = {
                data: {
                    method: 'deleteTicket',
                    id: this.currentTicket.dataset.id,
                  },
                  responseType: 'json',
                  method: 'POST',
            }
            await CreateRequest(options);
        }
        this.tasks = [];
        this.currentTicket = null;
        this.removeTasks();
        this.popovers.deletePopover();
        const tasks =  await CreateRequest({
            data: {
                method: 'allTickets',
            },
            responseType: 'json',
            method: 'GET',
        });
        console.log(tasks);
        this.buildTasks(tasks);
    }

    async deleteForm(e) {
        e.preventDefault();
        const options = {
            data: {
                method: 'deleteTicket',
                id: this.currentTicket.dataset.id,
              },
              responseType: 'json',
              method: 'POST',
        }
        await CreateRequest(options);
        this.tasks = [];
        this.currentTicket = null;
        this.removeTasks();
        this.popovers.deletePopover();
        const tasks =  await CreateRequest({
            data: {
                method: 'allTickets',
            },
            responseType: 'json',
            method: 'GET',
        });
        console.log(tasks);
        this.buildTasks(tasks);
    }

    removeTasks() {
        const tickets = Array.from(document.querySelectorAll('.ticket'));
        tickets.forEach(item => {
            item.remove();
        })
    }

    async showDescription(ticket) {
        const isDescription = ticket.querySelector('.ticket-description');
        if (isDescription) {
            isDescription.remove();
            return;
        }
        const options = {
            data: {
                method: 'ticketById',
                id: ticket.dataset.id
            },
            responseType: 'text',
            method: 'GET',
        }
        const descriptionText = await CreateRequest(options);
        console.log(descriptionText);
        const description = document.createElement('div');
        description.classList.add('ticket-description');
        description.innerHTML = descriptionText;
        ticket.appendChild(description);
    }

}