declare type Todo = {
  id: number;
  name: string;
};

declare type State = {
  todos: Todo[];
};

declare type Action = {
  type: "INIT" | "ADD_TODO" | "DELETE_TODO";
  payload: Todo[];
};
