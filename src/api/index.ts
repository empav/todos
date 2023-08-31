import axios from "axios";

const fetchTodos = async () => {
  return await axios.get<Todo[]>("/api/todos");
};

export default fetchTodos;
