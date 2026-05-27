const todoInput = document.getElementById('todo-input');
const todoDate = document.getElementById('todo-date');
const todoPriority = document.getElementById('todo-priority');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');

window.addEventListener('DOMContentLoaded', () => {
    loadTodosFromCookie();
});

//追加ボタンをクリックしたときのイベント
addBtn.addEventListener('click', () => {
    const taskText = todoInput.value.trim();
    const taskDate = todoDate.value;
    const taskPriority = todoPriority.value;

    if(taskText == "")
    {
        return;//taskTextが空なら何もしない
    }

    addTodoDOM(taskText, taskDate, taskPriority);//タスク、期限、優先度を追加
    todoInput.value = "";//入力欄をクリア
    todoDate.value = "";
    todoPriority.value = "中";//優先度をデフォルトに戻す
    saveTodosToCookie();//Cookieに状態を保存
});

//画面にタスクを追加する関数
function addTodoDOM(text, date, priority) 
{
    const li = document.createElement('li');

    //タスク名を表示する部分
    const textSpan = document.createElement('span');
    textSpan.textContent = text;
    textSpan.className = 'task-text'; //Cookie保存の時に見つけやすくするためクラス名をつける
    li.appendChild(textSpan);

    //期限の追加
    if (date)
    {
        const dateSpan = document.createElement('span');
        dateSpan.textContent = `⏳${date}`;
        dateSpan.style.fontSize = '12px';
        dateSpan.style.color = '#666';
        dateSpan.style.marginLeft = '10px';
        li.appendChild(dateSpan);
    }

    //優先度バッジの追加
    const prioritySpan = document.createElement('span');
    prioritySpan.textContent = `[${priority}]`;
    prioritySpan.style.fontSize = '12px';
    prioritySpan.style.marginLeft = '10px';
    prioritySpan.style.fontWeight = 'bold';
    
    if (priority == '高')
    {
        prioritySpan.style.color = 'red';
    }
    else if (priority == '中')
    {
        prioritySpan.style.color = 'orange';
    }
    else
    {
        prioritySpan.style.color = 'green';
    }

    li.appendChild(prioritySpan);

    //削除ボタン
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '削除';
    deleteBtn.className = 'delete-btn';
    deleteBtn.style.marginLeft = 'auto'; //削除ボタンを右端に寄せる

    deleteBtn.addEventListener('click', () => {
        li.remove();
        saveTodosToCookie();
    });

    li.appendChild(deleteBtn);
    todoList.appendChild(li);
}

//Cookieへ現在のタスク一覧を保存する関数
function saveTodosToCookie()
{
    const todos = [];
    const lis = todoList.querySelectorAll('li');
    lis.forEach(li => {
        //クラス名「task-text」から純粋なタスク名だけを抜き出す
        const text = li.querySelector('.task-text').textContent;
        
        //画面のテキストから期限と優先度を逆算して取得
        const hasDate = li.textContent.includes('⏳');
        const date = hasDate ? li.textContent.match(/⏳(\d{4}-\d{2}-\d{2})/)[1] : "";
        
        let priority = "中";
        if (li.textContent.includes('[高]'))
        {
            priority = "高";
        }
        if (li.textContent.includes('[低]'))
        {
            priority = "低";
        }

        //配列へ保存
        todos.push({ text: text, date: date, priority: priority });
    })

    const jsonStr = JSON.stringify(todos);
    document.cookie = `todoData=${encodeURIComponent(jsonStr)}; max-age=${60 * 60 * 24 * 7}; path=/`;
}

function loadTodosFromCookie()
{
    const cookies = document.cookie.split('; ');
    let todoDataCookie = "";

    cookies.forEach(cookie => {
        const [key, value] = cookie.split('=');
        if(key == 'todoData')
        {
            todoDataCookie = decodeURIComponent(value);
        }
    });

    if(todoDataCookie)
    {
        const todos = JSON.parse(todoDataCookie);
        todos.forEach(task => {
            //オブジェクトから3つのデータを戻して画面に復元する
            addTodoDOM(task.text, task.date, task.priority);
        });
    }
}