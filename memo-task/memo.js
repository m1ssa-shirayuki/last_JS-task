'use strict';

const saveButton = document.getElementById('save-button');
const itemInput = document.getElementById('item-iput');
const itemList = document.getElementById('memo-list');

saveButton.addEventListener('click', () =>{
    const newItem = document.createElement('li');
    newItem.textContent = itemInput.value;
    itemList.append(newItem);

    itemInput.value = '';

    const items = JSON.parse(localStorage.getItem('items')) || [];
    items.push({ Text: itemInput.value});
    localStorage.setItem('items', JSON.stringify('items'));
});