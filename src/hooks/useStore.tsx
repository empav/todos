import React, {
  createContext,
  useMemo,
  useReducer,
  useContext,
  PropsWithChildren,
  Dispatch,
} from "react";

const initialState: State = {
  todos: [],
};

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "INIT":
      return {
        ...state,
        todos: [...state.todos, ...action.payload],
      };
    case "ADD_TODO":
      return {
        ...state,
        todos: [...state.todos, ...action.payload],
      };
    case "DELETE_TODO":
      throw new Error("Not implemented!!!");
    default:
      throw new Error("Unknown Action");
  }
};

const makeStore = (
  reducer: (state: State, action: Action) => State,
  initialState: State
) => {
  const todos: Todo[] = [];
  const storeContext = createContext({ todos });
  const dispatchContext = createContext<Dispatch<Action>>(
    {} as Dispatch<Action>
  );

  const StoreProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const memoState = useMemo(() => state, [state]);
    const memoDispatch = useMemo(() => dispatch, [dispatch]);

    return (
      <storeContext.Provider value={memoState}>
        <dispatchContext.Provider value={memoDispatch}>
          {children}
        </dispatchContext.Provider>
      </storeContext.Provider>
    );
  };

  const useStore = () => useContext(storeContext);
  const useDispatch = () => useContext(dispatchContext);

  return { useStore, useDispatch, StoreProvider };
};

const { useStore, useDispatch, StoreProvider } = makeStore(
  reducer,
  initialState
);

// eslint-disable-next-line react-refresh/only-export-components
export { useStore, useDispatch, StoreProvider };