let arTodos = JSON.parse(localStorage.getItem('todos'));

let list = document.getElementById("saved_list");

for(let obj in arTodos){
    let tags_init = ``;
    for(let tag in arTodos[obj].tags){
        tags_init += `<li><span>${arTodos[obj].tags[tag]}</span><a>X</a></li>`
    }
    list.innerHTML += `<li id="elem${Number(obj)}">
        <span>
          <h3>Задача №${Number(obj) + 1}</h3>
          <input class="saved-input-todo" type="text" readonly placeholder="${arTodos[obj].descript}">
          <div class="container">
            <ul id="tags-list">
              ${tags_init}
            </ul>
          </div>
          &nbsp;
          <div class="status-container">
            <span>
              Выберите состояние
            </span>
            <select>
              <option>В работе</option>
              <option>Завершена</option>
              <option>Отложена</option>
            </select>
          </div>
          &nbsp;
          <div class="container-buttons">
            <button>Редактировать</button>
            <button>Удалить</button>
          </div>
        </span>
      <hr>
    </li>`;
}