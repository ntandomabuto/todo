let todoList = document.getElementById('todo-list')
let addedElement = document.getElementById('added')

function CreateTodo(id, name, description, completed) {
  this.id = id
  this.name = name
  this.description = description
  this.completed = completed
}

let todos = []

localStorage.setItem('todos', JSON.stringify(todos))

todoList.innerHTML = ''

let addBtn = document.getElementById('add-btn')
let todoInput = document.getElementById('todo-input')

addBtn.addEventListener('click', () => {
  let todoText = todoInput.value.trim()
  if (todoText) {
    let newTodo = new CreateTodo(todos.length + 1, todoText, '', false)
    todos.push(newTodo)
    localStorage.setItem('todos', JSON.stringify(todos))
    todoList.innerHTML = ''
    todos.forEach(todo => {
      todoList.innerHTML += `
        <li>
          <input type="checkbox" id="checkbox-${todo.id}">
          <label for="checkbox-${todo.id}">${todo.name}</label>
          <p>${todo.description}</p>
          <button class="delete" value="${todo.id}">Delete</button>
        </li>
      `
    })
    addedElement.textContent = `Added "${todoText}" to the list!`
    setTimeout(() => {
      addedElement.textContent = ""
    }, 2000)
    todoInput.value = ""
  }
})

let deleteButtons = document.querySelectorAll('.delete')

function deleteTodo(id) {
  let [todo] = todos.filter(object => object.id == id)
  let index = todos.indexOf(todo)
  todos.splice(index, 1)
  localStorage.setItem('todos', JSON.stringify(todos))
  todoList.innerHTML = ''
  todos.forEach(todo => {
    todoList.innerHTML += `
      <li>
        <input type="checkbox" id="checkbox-${todo.id}">
        <label for="checkbox-${todo.id}">${todo.name}</label>
        <p>${todo.description}</p>
        <button class="delete" value="${todo.id}">Delete</button>
      </li>
    `
  })
}

deleteButtons.forEach(button => {
  button.addEventListener('click', (event) => {
    deleteTodo(event.target.value)
  })
})

// Add event listener to checkbox
todoList.addEventListener('click', (event) => {
  if (event.target.type === 'checkbox') {
    let todoId = event.target.id.replace('checkbox-', '')
    let [todo] = todos.filter(object => object.id == todoId)
    todo.completed = event.target.checked
    localStorage.setItem('todos', JSON.stringify(todos))
  }
})