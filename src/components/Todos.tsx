import { useRef, useState } from "react";
import { debounce } from "lodash";
import styles from "./Todos.module.css";
import fetchTodos from "../api";

const Todos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [todo, setTodo] = useState("");
  const [query, setQuery] = useState("");
  const abortRef = useRef<AbortController | null>(null);

  const handleAddInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodo(event.target.value);
  };

  const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.currentTarget.value);
    debouncedHandler(event.currentTarget.value);
  };

  const handleAddButton = () => {
    setTodo("");
  };

  const handleSearch = async (q: string) => {
    if (abortRef.current) abortRef.current.abort();
    abortRef.current = new AbortController();

    try {
      setLoading(true);
      const response = await fetchTodos(q, abortRef.current.signal);
      setTodos(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const debouncedHandler = debounce(handleSearch, 500);

  return (
    <div className={styles.container}>
      <div>
        <h1>Add:</h1>
        <input value={todo} type="text" onChange={handleAddInput} />
        <button onClick={handleAddButton}>Add</button>
      </div>
      <div>
        <h1>Search:</h1>
        <input value={query} type="text" onChange={handleSearchInput} />
        {loading ? (
          <div>Loading...</div>
        ) : (
          <ul>
            {todos.map((todo) => (
              <li key={todo.id}>{todo.name}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Todos;
