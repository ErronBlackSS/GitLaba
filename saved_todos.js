let arTodos = JSON.parse(localStorage.getItem('todos'));
let list = document.getElementById("saved_list");

function render_todos()
{
    let sumOfNullValues = 0;
    let arTodos = JSON.parse(localStorage.getItem('todos'));
    let list = document.getElementById("saved_list");

    list.innerHTML = '';
    for (let obj in arTodos)
    {
        if (arTodos[obj] != null)
        {
            let tags_init = ``;
            for (let tag in arTodos[obj].tags)
            {
                tags_init += `<li><span>${arTodos[obj].tags[tag]}</span><a>X</a></li>`
            }
            list.innerHTML += `<li id="elem${Number(obj)}" type="">     
                                <h3>Задача №${Number(obj) + 1}</h3>
                                <a class="saved-a-todos" type="text">${arTodos[obj].descript}</a>
                                <br>
                                 
                                <div class="container">
                                    <ul id="tags-list">
                                        ${tags_init}
                                    </ul>
                                </div>       &nbsp
                               <div class="status-container">
                                    <span>
                                        Выберите состояние
                                    </span>
                                    <select aria-readonly="true">
                                        <option>В работе</option>
                                        <option>Завершена</option>
                                        <option>Отложена</option>
                                    </select>
                                </div>
                                <div class="container-buttons">
                                    <button onclick="edit(${Number(obj)})">Редактировать</button>
                                    <button type="submit" id="submit" onclick="deleteToDo(${Number(obj)});"> Удалить</button>
                                 </div>       
                                <hr>
                            </li>`;
        }
        if (arTodos[obj] == null)
        {
            sumOfNullValues = sumOfNullValues + 1;
            if (sumOfNullValues === arTodos.length)
                localStorage.clear();
        }
    }
}
function deleteToDo(a)
{
    let element = document.getElementById(`elem${a}`);
    let arTodos = JSON.parse(localStorage.getItem('todos'));
    let isDelete = confirm('Удалить заметку?');
    if(isDelete)
    {
        delete arTodos[a];
        localStorage.setItem('todos', JSON.stringify(arTodos));
        render_todos();
        console.log(element);
    }
}
function show_filters()
{
    let show = document.getElementById('filters');
    if(show.style.display == 'none')
    {
        show.style.display = "";
    }
    else
    {
        show.style.display = 'none';
    }
}
function search()
{
    let input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("search-input");
    filter = input.value.toUpperCase();
    ul = document.getElementById("saved_list");
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++)
    {
        a = li[i].getElementsByTagName("a")[0];
        txtValue = a.value || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1)
        {
            li[i].style.display = "";
        }
        else
        {
            if(li[i].hasAttribute('type'))
            {
                li[i].style.display = "none";
            }
        }
    }
}

function edit(todoIndex)
{
    //console.log(todoIndex);
    let fullList = document.querySelector("#saved_list");
    let saved_tags = arTodos[todoIndex].tags;
    let saved_description = arTodos[todoIndex].descript;
    let li_element = fullList.querySelector(`#elem${todoIndex}`);
    li_element.innerHTML = `<li id="elem${Number(todoIndex)}" type="">
        <span>
          <h3>Задача №${Number(todoIndex) + 1}</h3>
          <input id="input-edit${Number(todoIndex)}" class="saved-input-todo" placeholder="${arTodos[todoIndex].descript}" type="text">
          <div class="container">
            <button onclick="add(${todoIndex})">add</button>
            <ul id="tags-list${Number(todoIndex)}">
            </ul>
            <input type="text" id="txt${Number(todoIndex)}" placeholder="Введите категорию">
          </div>       
          &nbsp
          <div class="status-container">
            <span>
              Выберите состояние
            </span>
            <select aria-readonly="true">
              <option>В работе</option>
              <option>Завершена</option>
              <option>Отложена</option>
            </select>
          </div>    
          <div class="container-buttons">
            <button onclick="save(${todoIndex})">Сохранить</button>
            <button onclick="undo(${todoIndex})">Отмена</button>
          </div>     
        </span>
      <hr>
    </li>`;
    let tags = li_element.querySelector(`#tags-list${Number(todoIndex)}`);
    let arTags = arTodos[todoIndex].tags;
    arTags.map((item, index) => {
        tags.innerHTML += `<li id="chip${Number(todoIndex)}${index}"><span>${item}</span><a onclick="remove_tag(${index}, ${todoIndex})">X</a></li>`;
    });
    fullList.querySelector(`#input-edit${Number(todoIndex)}`).focus();
}


function add(index)
{
    let list = document.getElementById(`tags-list${Number(index)}`);
    let input = document.getElementById(`txt${Number(index)}`).value;
    arTodos[index].tags.push(input);
    let idx = arTodos[index].tags.length - 1;
    list.innerHTML += `<li id="chip${Number(index)}${idx}">
                            <span>
                                ${input}
                            </span>
                            <a onclick="remove_tag(${idx}, ${index})">
                                X
                            </a> 
                       </li>`
    input.value = "";
}

function save(index)
{
    let find_Tags = document.getElementById(`tags-list${index}`);
    let list_tags = find_Tags.getElementsByTagName('li');
    let arTags = [];
    for(let i = 0; i < list_tags.length; i++)
    {
        if(list_tags[i].style.display != 'none')
        {
            let tag = list_tags[i].getElementsByTagName('span')[0];
            arTags.push(tag.innerText);
        }
    }
    let input = document.getElementById(`input-edit${index}`).value;
    if(input == "")
    {
        let saved_ar = JSON.parse(localStorage.getItem('todos'));
        arTodos[index].descript = saved_ar[index].descript;
    }
    else
    {
        arTodos[index].descript = input;
    }
    arTodos[index].tags = arTags;
    localStorage.setItem('todos', JSON.stringify(arTodos));
    list.innerHTML = "";
    render_todos();
    document.getElementById(`elem${index}`).focus();
}

function undo(index)
{
    let saved_ar = JSON.parse(localStorage.getItem('todos'));
    arTodos[index].descript = saved_ar[index].descript;
    arTodos[index].tags = saved_ar[index].tags;
    list.innerHTML = "";
    render_todos();
}

function remove_tag(index, tdIndex)
{
    let chip = document.getElementById(`chip${tdIndex}${index}`);
    chip.style.display = 'none';
}

window.onload = function()
{
    document.getElementById('filter-button').click();
    render_todos();
}