import React, { } from 'react';
import Todo from './Todo.js';

function Main(props) {

  const { todos,addTodoItem,setTodoCompleted} = props;


  const addTodo = () => {

    let todoText = document.getElementById("todoInputBox").value;
    if(todoText){
      addTodoItem(todoText);
    }

  }


  return (
    <div className="text-center">
      <section className="" >
        <div className="container mt-3 mb-5">
          <div className="row d-flex justify-content-center align-items-center">
            <div className="col col-lg-10">

              <div className="card" style={{ borderRadius: 20 }}>
                <div className="card-body p-5">
                  <img src="img/todo1.jpg" alt="logo" style={{ width: 100 }} />
                  <h1 className="mb-3 text-primary" style={{ fontFamily: 'Courgette' }}><b>Our Todo App</b></h1>

                  <div className="d-flex m-5">

                    <div className="form-outline flex-fill">
                      <input id="todoInputBox" type="text" placeholder="What's in your mind?" className="form-control form-control-lg" />
                    </div>
                    <button onClick={addTodo} className="btn btn-primary btn-lg ms-2">Add Todo</button>

                  </div>

                  <div className="row">

                    {todos.map((todo, key) => {
                      return (
                        <div className="col-lg-4 col-md-6 " key={key}>
                          <Todo todo={todo} setTodoCompleted={setTodoCompleted} />
                        </div>
                      )
                    })}

                  </div>


                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </div>


  )

}

export default Main;


