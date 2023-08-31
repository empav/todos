import "./App.css";
import Todos from "./components/Todos";
import { StoreProvider } from "./hooks/useStore";

function App() {
  return (
    <StoreProvider>
      <Todos />
    </StoreProvider>
  );
}

export default App;
