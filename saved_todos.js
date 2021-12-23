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
            let statusClass = '';
            let status = arTodos[obj].status;
            if (status === 'В работе') {
                statusClass = 'work-status';
            } else if (status === 'Отложена') {
                statusClass = 'wait-status';
            } else {
                statusClass = 'end-status';
            }
            for (let tag in arTodos[obj].tags) {
                tags_init += `<li><span>${arTodos[obj].tags[tag]}</span><a>X</a></li>`
            }

            list.innerHTML += `<li id="elem${Number(obj)}" type="">     
                                <h3>Задача №${Number(obj) + 1}</h3>
                                <a class="saved-a-todos" type="text">${arTodos[obj].descript}</a>
                                <br>
                                 
                                <div class="container">
                                    <ul id="tags-list${Number(obj)}">
                                        ${tags_init}
                                    </ul>
                                </div>       &nbsp
                                <div class="status-container">
                                    Статус: <span class="${statusClass}" id="status${Number(obj)}">${status}</span>
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

function show_filters() {
    let show = document.getElementById('filters');
    if(show.style.display === 'none')
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
    let input = document.getElementById("search-input");
    let filter = input.value.toUpperCase();
    let ul = document.getElementById("saved_list");
    let li = ul.getElementsByTagName("li");
    for (let i = 0; i < li.length; i++)
    {
        let a = li[i].getElementsByTagName("a")[0];
        let txtValue = a.value || a.innerText;
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

function search_tags()
{
    let input = document.getElementById("search-tags-input");
    let filter = input.value.toUpperCase();
    for (let i = 0; i < arTodos.length; i++)
    {
        if (arTodos[i] != null)
        {
            for (let j = 0; j < arTodos[i].tags.length; j++)
            {
                if (arTodos[i].tags[j].toUpperCase().indexOf(filter) > -1)
                {
                    let elem = document.getElementById(`elem${i}`)
                    elem.style.display = "";
                    break;
                } else
                {
                    let elem = document.getElementById(`elem${i}`)
                    elem.style.display = "none";
                }
            }
        }
    }
}

function filter_status(val)
{
    if (val === 'Все')
    {
        return render_todos();
    }
    for (let i = 0; i < arTodos.length; i++)
    {
        if (arTodos[i] != null)
        {
            if (arTodos[i].status === val)
                {
                    let elem = document.getElementById(`elem${i}`)
                    elem.style.display = "";
                }
            else
            {
                let elem = document.getElementById(`elem${i}`)
                elem.style.display = "none";
            }
        }
    }
}

function edit(todoIndex)
{
    let fullList = document.querySelector("#saved_list");
    let saved_tags = arTodos[todoIndex].tags;
    let saved_description = arTodos[todoIndex].descript;
    let li_element = fullList.querySelector(`#elem${todoIndex}`);

    let status = arTodos[todoIndex].status;
    let statusClass = (status === 'В работе') ? 'work-status' : (status === 'Отложена') ? 'wait-status' : 'end-status';


    li_element.innerHTML = `<li id="elem${Number(todoIndex)}" type="">
        <span>
          <h3>Задача №${Number(todoIndex) + 1}</h3>
          <input id="input-edit${Number(todoIndex)}" class="saved-input-todo" placeholder="${arTodos[todoIndex].descript}" type="text">
          <div class="container">
            <button onclick="add(${todoIndex})">add</button>
            <ul id="tags-list${Number(todoIndex)}">
            </ul>
            <input type="text" id="txt${Number(todoIndex)}" style="float: none" placeholder="Введите категорию">
          </div>       
          &nbsp
          <div class="status-container">
            Текущее состояние: <span class="${statusClass}" id="status${todoIndex}">${status}</span>
            Выберите новый
            <select id="select${todoIndex}">
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

    let select = document.getElementById(`select${todoIndex}`);
    select.addEventListener('change', function() {
        let statusVar = document.getElementById(`status${todoIndex}`);
        statusVar.removeAttribute('class');
        let newStatus = this.options[this.selectedIndex].text;
        statusVar.className = (newStatus === 'В работе') ? 'work-status' : (newStatus === 'Отложена') ? 'wait-status' : 'end-status';
        statusVar.innerText = newStatus;
    })

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
    let status = document.getElementById(`status${index}`);
    let input = document.getElementById(`input-edit${index}`).value;
    let arTags = [];
    for(let i = 0; i < list_tags.length; i++) {
        if(list_tags[i].style.display != 'none')
        {
            let tag = list_tags[i].getElementsByTagName('span')[0];
            arTags.push(tag.innerText);
        }
    }
    if(input === "")
    {
        let saved_ar = JSON.parse(localStorage.getItem('todos'));
        arTodos[index].descript = saved_ar[index].descript;
    }
    else
    {
        arTodos[index].descript = input;
    }
    arTodos[index].tags = arTags;
    arTodos[index].status = status.innerText;
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

window.onload = function() {
    document.getElementById('filter-button').click();
    render_todos();
}
