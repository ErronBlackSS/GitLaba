console.log(1);
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
          <a class="saved-input-todo" type="text">${arTodos[obj].descript}</a>
          <div class="container">
            <ul id="tags-list">
              ${tags_init}
            </ul>
          </div>       &nbsp;
          <div class="status-container">
            <span>
              Выберите состояние
            </span>
            <select aria-readonly="true">
              <option>В работе</option>
              <option>Завершена</option>
              <option>Отложена</option>
            </select>
            
          </div>          &nbsp;
          <div class="container-buttons">
            <button>Редактировать</button>
            <button>Удалить</button>
          </div>
        </span>
      <hr>
    </li>`;
}
function myFunction() {
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("search-input");
    filter = input.value.toUpperCase();
    ul = document.getElementById("saved_list");
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        txtValue = a.value || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}