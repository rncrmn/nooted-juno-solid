import { Component, useContext } from "solid-js";
import { setDoc, signOut } from "@junobuild/core";
import { Context, Note } from "../context/Context";

const Sidebar: Component = () => {
  const { setNotes } = useContext(Context);

  const addNote = async () => {
    const uuid: string = crypto.randomUUID();

    const newNote = {
      id: uuid,
      title: "New note",
      content: "This is a new note.",
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
    };

    setNotes((prev: Note[]) => [newNote as Note, ...prev]);

    const data = await setDoc({
      collection: "Notes",
      doc: {
        key: uuid,
        data: newNote,
      },
    });
  };

  const logOut = async () => {
    await signOut();
  };

  return (
    <div class="z-10 col-span-1 bg-white border-r border-gray-300 shadow-sm">
      <div class="flex flex-col items-center justify-between h-screen py-8">
        <div class="flex flex-col gap-6">
          <div class="px-3 py-1 font-sans text-2xl font-bold text-center text-gray-800 bg-sky-200 border border-sky-300 rounded-lg shadow-sm">
            N
          </div>
          <button
            class="rounded-full bg-gray-800 text-white h-[42px] w-[42px] p-1.5"
            onClick={addNote}
          >
            <svg
              fill="none"
              stroke="currentColor"
              stroke-width={1.5}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              width={26}
              height={26}
              class="transition hover:rotate-90 w-full h-full"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </button>
        </div>
        <button
          class="p-2.5 bg-gray-100 rounded-full hover:bg-gray-200"
          onClick={logOut}
        >
          <svg
            fill="white"
            stroke="currentColor"
            stroke-width={1.5}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            width={26}
            height={26}
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
