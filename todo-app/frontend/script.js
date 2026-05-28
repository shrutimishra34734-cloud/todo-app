const API =
"http://localhost:5000/api/todos";

const todoForm =
document.getElementById("todoForm");

const todoInput =
document.getElementById("todoInput");

const todoList =
document.getElementById("todoList");



// FETCH TODOS
async function fetchTodos() {

    const response =
    await fetch(API);

    const todos =
    await response.json();

    todoList.innerHTML = "";



    todos.forEach((todo) => {

        todoList.innerHTML += `

            <div class="todo">

                <span class="${
                    todo.completed ? "completed" : ""
                }">

                    ${todo.text}

                </span>

                <div>

                    <button
                    onclick="toggleTodo(
                        '${todo._id}',
                        ${todo.completed}
                    )">

                        ${
                            todo.completed
                            ? "Undo"
                            : "Complete"
                        }

                    </button>

                    <button
                    onclick="editTodo(
                        '${todo._id}',
                        '${todo.text}'
                    )">

                        Edit

                    </button>

                    <button
                    onclick="deleteTodo(
                        '${todo._id}'
                    )">

                        Delete

                    </button>

                </div>

            </div>

        `;

    });

}




// ADD TODO
todoForm.addEventListener(
    "submit",
    async (e) => {

    e.preventDefault();

    await fetch(API, {

        method: "POST",

        headers: {
            "Content-Type":
            "application/json"
        },

        body: JSON.stringify({
            text: todoInput.value
        })

    });

    todoInput.value = "";

    fetchTodos();

});




// DELETE TODO
async function deleteTodo(id) {

    await fetch(`${API}/${id}`, {

        method: "DELETE"

    });

    fetchTodos();

}




// TOGGLE COMPLETE
async function toggleTodo(
    id,
    completed
) {

    await fetch(`${API}/${id}`, {

        method: "PUT",

        headers: {
            "Content-Type":
            "application/json"
        },

        body: JSON.stringify({
            completed: !completed
        })

    });

    fetchTodos();

}




// EDIT TODO
async function editTodo(id, oldText) {

    const newText =
    prompt("Edit Todo", oldText);

    if (!newText) return;

    await fetch(`${API}/${id}`, {

        method: "PUT",

        headers: {
            "Content-Type":
            "application/json"
        },

        body: JSON.stringify({
            text: newText
        })

    });

    fetchTodos();

}



fetchTodos();