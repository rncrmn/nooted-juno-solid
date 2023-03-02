import { Component, Show, useContext } from "solid-js";
import { HomePage, NotesPage } from "./components";
import { Context } from "./context/Context";

const App: Component = () => {
  const { user } = useContext(Context);
  return (
    <>
      <Show
        when={user() !== undefined && user() !== null}
        fallback={<HomePage />}
      >
        <NotesPage />
      </Show>
    </>
  );
};

export default App;
