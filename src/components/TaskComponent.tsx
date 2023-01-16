
export default function TaskComponent(props: any) {

    return <>
        <label>
            <input
                type="checkbox"
                checked={props.todo.complete}
                onChange={() => {
                    props.setTodoList((todos: Task[]) => {
                        const newTodos = todos.map((todo: Task) =>
                            props.todo === todo
                                ? {...todo, complete: !todo.completed}
                                : todo
                        );
                        return newTodos;
                    });
                }}
            />
            <span>
                            {props.todo.name} - {props.todo.description}

            </span>
        </label>
    </>
}
