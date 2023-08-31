import useTodos from "../hooks/useTodos";

const Todos = () => {
  const [{ todos }, isLoading, error] = useTodos();
  return isLoading ? (
    <div>Loading...</div>
  ) : error?.message ? (
    <div>error...</div>
  ) : (
    <div>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Todos;
