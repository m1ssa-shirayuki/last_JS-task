'use strict';

// 保存ボタンのクリックイベント
document.getElementById("save-button").addEventListener("click", function () {
    const input = document.getElementById("item-input");
    const newItemText = input.value.trim();

    if (newItemText) {
        const items = JSON.parse(localStorage.getItem("items")) || [];
        const editIndex = input.dataset.editIndex; // 編集中のアイテムのindex

        if (editIndex !== undefined) {
            items[editIndex].text = newItemText; // 編集
            delete input.dataset.editIndex; // 編集indexを削除
        } else {
            // 新規追加
            const now = new Date();
            const formattedDate = now.toLocaleString();
            items.push({ text: newItemText, date: formattedDate });
        }

        localStorage.setItem("items", JSON.stringify(items));
        input.value = "";
        displayItems();
    } else {
        alert("メモを入力してください。");
    }
});

// 保存されたアイテムを画面に表示
function displayItems() {
    const items = JSON.parse(localStorage.getItem("items")) || [];
    const memoList = document.getElementById("memo-list");
    memoList.replaceChildren();

    items.forEach(function (item, index) {
        const li = document.createElement("li");
        li.innerHTML = `
            <span class="memo-text">${item.text}</span>
        <div class="memo-details">
            <span class="memo-date">${item.date}</span>
            <button class="edit-button">編集</button>
            <button class="delete-button">削除</button>
        </div>
        `;
        memoList.appendChild(li);

        // イベントリスナーを追加
        const editButton = li.querySelector('.edit-button');
        const deleteButton = li.querySelector('.delete-button');

        editButton.addEventListener('click', () => {
            const input = document.getElementById('item-input');
            input.value = item.text;
            input.dataset.editIndex = index; // 編集中のアイテムのindexを保存
        });

        deleteButton.addEventListener('click', () => {
            items.splice(index, 1);
            localStorage.setItem('items', JSON.stringify(items));
            displayItems();
        });
    });
}

// 削除ボタンのクリックイベント
document.getElementById("clear-all").addEventListener("click", function () {
    const userConfirmed = confirm('本当にすべてのメモを削除しますか？');

    if (userConfirmed) {
        localStorage.clear();
        const memoList = document.getElementById("memo-list");
        memoList.replaceChildren();
    }
});

// ページ読み込み時に保存されたアイテムを表示
displayItems();