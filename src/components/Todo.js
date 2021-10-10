import React from 'react'

export default function Todo(props) {
    const { todo,setTodoCompleted } = props;

    const timeConverter = (UNIX_timestamp) => {
        var a = new Date(UNIX_timestamp * 1000);
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var hours = a.getHours();
        var minutes = a.getMinutes();

        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;

        var time = date + ' ' + month + ' ' + year + ' ' + hours + ':' + minutes + ' ' + ampm;
        return time;
    }

    const todoCompleted = ()=>{
        setTodoCompleted(todo.id.toNumber())
    }

    return (
        <div className={`card text-light mb-3 shadow ${todo.completed ? 'gradient-custom' : 'bg-dark'}`}>
            <div className="card-body">
                <h5 className="card-title "><div className="form-check">
                    <div >
                        {todo.completed
                            ?
                            <input onClick={todoCompleted} className="form-check-input " type="checkbox" defaultChecked />
                            :
                            <input onClick={todoCompleted} className="form-check-input " type="checkbox" />
                        }
                        <br></br>
                    </div>
                </div></h5>
                <p className="card-text ">{todo.content}</p>
            </div>
            <div className="card-footer">{timeConverter(todo.date)}</div>

        </div>
    )
}
