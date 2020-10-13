import { createStore } from "redux";

const form = document.querySelector('form');
const input = document.querySelector('input');
const ul = document.querySelector('ul');

const ADD_TODO = "ADD_TODO";
const DELETE_TODO = "DELETE_TODO";

const onSubmit = (e) => {
  e.preventDefault();
  const toDo = input.value;
  input.value = "";
  store.dispatch({ type: ADD_TODO, text: toDo });
};

const reducer = (state = [], action) => {
  switch(action.type) {
    case ADD_TODO:
      return [...state, { text: action.text, id: Date.now()}];
    case DELETE_TODO:
      return state.filter((value) => value.id !== parseInt(action.id));
    default:
      return state;
  }
}

const store = createStore(reducer);

const deleteToDo = (e) => {
  store.dispatch({ type: DELETE_TODO, id: e.target.parentNode.id});
}

const paintToDos = () => {
  ul.innerText = "";
  const toDos = store.getState();
  toDos.forEach(toDo => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.innerText = "delete";
    btn.addEventListener("click", deleteToDo);
    li.id = toDo.id;
    li.innerText = toDo.text;
    li.appendChild(btn);
    ul.appendChild(li);
  })
}

store.subscribe(paintToDos);

form.addEventListener("submit", onSubmit);