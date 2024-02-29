import { CreateRequest } from "./CreateRequest";

export default class Popovers {
    constructor() {
        this.currentTask;
    }

    buildAddPopover() {
        const popover = document.createElement('form');
        popover.classList.add('popover', 'popover-add');
        const popovertitle = document.createElement('h2');
        popovertitle.classList.add('popover-title');
        popovertitle.textContent = 'Добавить тикет';
        const sectorShortDescription = document.createElement('div');
        sectorShortDescription.classList.add('popover-short-description');
        const titleShortDescription = document.createElement('h3');
        titleShortDescription.classList.add('title-short-description');
        titleShortDescription.textContent = 'Краткое описание';
        const inputShortDescription = document.createElement('input');
        inputShortDescription.classList.add('input-short-description');
        inputShortDescription.type = 'text';
        inputShortDescription.required = true;
        sectorShortDescription.appendChild(titleShortDescription);
        sectorShortDescription.appendChild(inputShortDescription);
        const sectorFullDescription = document.createElement('div');
        sectorFullDescription.classList.add('popover-full-description');
        const titleFullDescription = document.createElement('h3');
        titleFullDescription.classList.add('title-full-description');
        titleFullDescription.textContent = 'Подробное описание';
        const textFullDescription = document.createElement('textarea');
        textFullDescription.classList.add('text-full-description');
        textFullDescription.required = true;
        sectorFullDescription.appendChild(titleFullDescription);
        sectorFullDescription.appendChild(textFullDescription);
        const buttons = document.createElement('div');
        buttons.classList.add('buttons');
        const buttonOk = document.createElement('button');
        buttonOk.classList.add('button','button-ok');
        buttonOk.type = "submit";
        buttonOk.textContent = 'OK';
        const buttonCancel = document.createElement('button');
        buttonCancel.classList.add('button', 'button-cancel');
        buttonCancel.type = "reset";
        buttonCancel.textContent = 'Отмена';
        buttons.appendChild(buttonOk);
        buttons.appendChild(buttonCancel);
        popover.appendChild(popovertitle);
        popover.appendChild(sectorShortDescription);
        popover.appendChild(sectorFullDescription);
        popover.appendChild(buttons);
        const body = document.querySelector('body');
        body.appendChild(popover);
    }

    buildEditPopover() {
        const popover = document.createElement('form');
        popover.classList.add('popover', 'popover-edit');
        const popovertitle = document.createElement('h2');
        popovertitle.classList.add('popover-title');
        popovertitle.textContent = 'Изменить тикет';
        const sectorShortDescription = document.createElement('div');
        sectorShortDescription.classList.add('popover-short-description');
        const titleShortDescription = document.createElement('h3');
        titleShortDescription.classList.add('title-short-description');
        titleShortDescription.textContent = 'Краткое описание';
        const inputShortDescription = document.createElement('input');
        inputShortDescription.classList.add('input-short-description');
        inputShortDescription.type = 'text';
        inputShortDescription.required = true;
        sectorShortDescription.appendChild(titleShortDescription);
        sectorShortDescription.appendChild(inputShortDescription);
        const sectorFullDescription = document.createElement('div');
        sectorFullDescription.classList.add('popover-full-description');
        const titleFullDescription = document.createElement('h3');
        titleFullDescription.classList.add('title-full-description');
        titleFullDescription.textContent = 'Подробное описание';
        const textFullDescription = document.createElement('textarea');
        textFullDescription.classList.add('text-full-description');
        textFullDescription.required = true;
        sectorFullDescription.appendChild(titleFullDescription);
        sectorFullDescription.appendChild(textFullDescription);
        const buttons = document.createElement('div');
        buttons.classList.add('buttons');
        const buttonOk = document.createElement('button');
        buttonOk.classList.add('button','button-ok');
        buttonOk.type = "submit";
        buttonOk.textContent = 'OK';
        const buttonCancel = document.createElement('button');
        buttonCancel.classList.add('button', 'button-cancel');
        buttonCancel.type = "reset";
        buttonCancel.textContent = 'Отмена';
        buttons.appendChild(buttonOk);
        buttons.appendChild(buttonCancel);
        popover.appendChild(popovertitle);
        popover.appendChild(sectorShortDescription);
        popover.appendChild(sectorFullDescription);
        popover.appendChild(buttons);
        const body = document.querySelector('body');
        body.appendChild(popover);

    }

    buildDeletePopover() {
        const popover = document.createElement('form');
        popover.classList.add('popover', 'popover-delete');
        const popovertitle = document.createElement('h2');
        popovertitle.classList.add('popover-title');
        popovertitle.textContent = 'Удалить тикет';
        const description = document.createElement('div');
        description.classList.add('popover-description');
        description.textContent = 'Вы уверены что хотите удалить текет? Это действие не обратимо.';
        const buttons = document.createElement('div');
        buttons.classList.add('buttons');
        const buttonOk = document.createElement('button');
        buttonOk.classList.add('button','button-ok');
        buttonOk.type = "submit";
        buttonOk.textContent = 'OK';
        const buttonCancel = document.createElement('button');
        buttonCancel.classList.add('button', 'button-cancel');
        buttonCancel.type = "reset";
        buttonCancel.textContent = 'Отмена';
        buttons.appendChild(buttonOk);
        buttons.appendChild(buttonCancel);
        popover.appendChild(popovertitle);
        popover.appendChild(description);
        popover.appendChild(buttons);
        const body = document.querySelector('body');
        body.appendChild(popover);
    }

    deletePopover() {
        const popover = document.querySelector('.popover');
        popover.remove();
    }
}