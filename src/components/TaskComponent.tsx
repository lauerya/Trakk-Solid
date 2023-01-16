
export default function TaskComponent(props: any){

    return <>
        Task Component!: {props.todo.name} - {props.todo.description}

        <label>
            <input
                type="checkbox"
                checked={props.todo.complete}
                onChange={() => {
                    props.setTodoList((todos: Task[]) => {
                        const newTodos = todos.map((todo: Task) =>
                            props.todo === todo
                                ? { ...todo, complete: !todo.completed }
                                : todo
                        );
                        return newTodos;
                    });
                }}
            />
            {props.todo.text}
        </label>
    </>
}
