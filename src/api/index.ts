import axios from "axios";

const fetchTodos = async (queryString?: string, signal?: AbortSignal) => {
  return await axios.get<Todo[]>("/api/todos", {
    signal,
    params: queryString ? { q: queryString } : undefined,
  });
};

export default fetchTodos;
