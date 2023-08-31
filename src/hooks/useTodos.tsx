import { useEffect, useState } from "react";
import { useDispatch } from "./useStore";
import fetchTodos from "../api";
import { AxiosError } from "axios";

const useTodos = (): [State, boolean, AxiosError] => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<State>({ todos: [] });
  const [error, setError] = useState<AxiosError>({} as AxiosError);

  const dispatch = useDispatch();

  useEffect(() => {
    const getAllTodos = async () => {
      try {
        setLoading(true);
        const response = await fetchTodos();
        setData({ todos: response.data });
        dispatch({ type: "INIT", payload: response.data });
      } catch (error) {
        setError(error as AxiosError);
      } finally {
        setLoading(false);
      }
    };
    getAllTodos();
  }, [dispatch]);

  return [data, loading, error];
};

export default useTodos;
