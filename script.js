let todoList
if(localStorage.getItem('todos') === null)
{
    todoList = [];
}
else
{
    todoList = JSON.parse(localStorage.getItem('todos'));
}


let txt = document.getElementById("txt");
let list = document.getElementById("list");
let items = ["Учеба", "Работа", "Досуг"];

txt.addEventListener("keypress", function (e)
{
    if (e.key === "Enter")
    {
        let val = txt.value;
        if (val !== "")
        {
            if (items.indexOf(val) >= 0)
            {
                alert("Тег с таким названием уже существует");
            }
            else
            {
                items.push(val);
                render();
                txt.value = "";
                txt.focus();
            }
        }
        else
        {
            alert("Введите название тега");
        }
    }
});

function render()
{
    list.innerHTML = "";
    items.map((item, index) => {
        list.innerHTML += `<li><span>${item}</span><a href="javascript: remove(${index})">X</a></li>`;
    });
}

function remove(i)
{
    items = items.filter((item) => items.indexOf(item) != i);
    render();
}

window.onload = function ()
{
    render();
};

function add()
{
    let description = document.getElementsByClassName('description-input')[0];
    if(description.value == "")
    {
        alert('Введите описание заметки');
    }
    else{
        let arTags = [];
        items.map((item, index) => {
            arTags.push(item);
        });
        let todoObj = {
            descript: description.value,
            tags: arTags,
            status: 'В работе',
        }
        todoList.push(todoObj);
        items = ["Учеба", "Работа", "Досуг"];
        render();
        document.getElementsByClassName('description-input')[0].value = "";
        localStorage.setItem('todos', JSON.stringify(todoList));
    }
}

