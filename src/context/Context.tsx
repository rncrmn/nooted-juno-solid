import {
  createContext,
  createSignal,
  ParentComponent,
  JSX,
  Accessor,
  onMount,
} from "solid-js";
import { createStore, SetStoreFunction } from "solid-js/store";
import { initJuno, authSubscribe, User } from "@junobuild/core";

interface Props {
  children?: JSX.Element;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: number;
  updatedAt: number;
}

interface NootedContext {
  user: Accessor<User | null>;
  notes: Note[];
  setNotes: SetStoreFunction<Note[]>;
}

export const Context = createContext<NootedContext>({} as NootedContext);

export const Provider: ParentComponent = (props: Props) => {
  const [user, setUser] = createSignal<User | null>(null);
  const [notes, setNotes] = createStore<Note[]>([]);

  onMount(async () => {
    await initJuno({
      satelliteId: import.meta.env.VITE_SATELLITE_NOOTED_ID,
    });

    authSubscribe((user) => {
      setUser(user);
    });
  });

  return (
    <Context.Provider
      value={{
        user,
        notes,
        setNotes,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};
