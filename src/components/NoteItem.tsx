import { Component, createSignal, Show, useContext } from "solid-js";
import { Portal } from "solid-js/web";
import { Doc, getDoc, delDoc, setDoc } from "@junobuild/core";
import { Context, Note } from "../context/Context";
import getRelativeTime from "../utils/timeconvert";

interface Props {
  note: {
    id: string;
    title: string;
    content: string;
    createdAt: number;
    updatedAt: number;
  };
}

const NoteItem: Component<Props> = (props: Props) => {
  const { setNotes } = useContext(Context);

  const [isHidden, setIsHidden] = createSignal<boolean>(true);
  const [id, setId] = createSignal<string>(props.note.id);
  const [title, setTitle] = createSignal<string>(props.note.title);
  const [content, setContent] = createSignal<string>(props.note.content);
  const [createdAt, setCreatedAt] = createSignal<number>(props.note.createdAt);
  const [updatedAt, setUpdatedAt] = createSignal<number>(props.note.createdAt);

  const updateNote = async (id: string) => {
    setIsHidden(true);
    setUpdatedAt(new Date().getTime());

    const result = await getTheDoc(id);

    await setDoc({
      collection: "Notes",
      doc: {
        ...result,
        key: id,
        data: {
          id,
          title: title(),
          content: content(),
          createdAt: createdAt(),
          updatedAt: updatedAt(),
        },
      },
    });
  };

  const deleteNote = async (id: string) => {
    setNotes((prevNotes: Note[]) => {
      return prevNotes.filter((noteItem: Note) => {
        return noteItem.id !== id;
      });
    });

    setIsHidden(true);
    const myDoc = await getTheDoc(id);

    await delDoc({
      collection: "Notes",
      doc: myDoc as Doc<Note>,
    });
  };

  const getTheDoc = async (id: string) => {
    const myDoc = await getDoc({
      collection: "Notes",
      key: id,
    });

    return myDoc;
  };

  const newDateFormat = getRelativeTime(createdAt());

  return (
    <>
      <div
        class={`w-full h-64 flex-col flex justify-between bg-sky-200 rounded-lg border border-gray-400 py-5 px-4 ${
          isHidden() ? "opacity-100" : "opacity-0"
        }`}
      >
        <div>
          <h4 class="text-gray-800 font-bold mb-3 text-lg">{title()}</h4>
          <p class="text-gray-800 text-md max-h-[145px] overflow-hidden">
            {content()}
          </p>
        </div>
        <div>
          <div class="flex items-center justify-between text-gray-800">
            <p class="text-sm">
              Last updated:{" "}
              <span class="capitalize font-medium">{newDateFormat}</span>
            </p>
            <div
              class="w-8 h-8 rounded-full bg-gray-800 hover:bg-gray-700 text-white flex items-center justify-center cursor-pointer"
              onClick={() => setIsHidden((prev) => !prev)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon icon-tabler icon-tabler-pencil"
                width={20}
                height={20}
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" />
                <path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4" />
                <line x1="13.5" y1="6.5" x2="17.5" y2="10.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <Show when={!isHidden()}>
        <Portal>
          <div class="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 outline-none focus:outline-none z-50 bg-black/25">
            <div class="relative w-auto my-6 mx-auto max-w-2xl min-w-[400px] border-0 rounded-lg shadow-lg bg-white outline-none focus:outline-none pt-6 pb-5 px-5 flex flex-col h-auto">
              <button
                type="button"
                class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                data-modal-hide="popup-modal"
                onClick={() => setIsHidden(true)}
              >
                <svg
                  aria-hidden="true"
                  class="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span class="sr-only">Close modal</span>
              </button>
              <input
                type="text"
                value={title()}
                onInput={(e) => setTitle((e.target as HTMLInputElement).value)}
                class="py-2 outline-none text-gray-800 font-bold text-xl"
              />
              <textarea
                value={content()}
                onInput={(e) =>
                  setContent((e.target as HTMLInputElement).value)
                }
                class="py-2 outline-none text-gray-800 text-md mb-4 resize-none h-auto"
              ></textarea>
              <div class="flex gap-4 w-full justify-center border-t border-gray-200 pt-5">
                <button
                  class="bg-green-700 hover:bg-green-600 text-white py-2 px-4 rounded-lg font-bold text-xs uppercase flex gap-1 justify-center items-center"
                  onClick={() => updateNote(id())}
                >
                  <svg
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    width={18}
                    height={18}
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                    ></path>
                  </svg>
                  Update
                </button>
                <button
                  class="bg-red-700 hover:bg-red-600 text-white py-2 px-4 rounded-lg font-bold text-xs flex gap-1 justify-center items-center uppercase"
                  onClick={() => deleteNote(id())}
                >
                  <svg
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    width={18}
                    height={18}
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    ></path>
                  </svg>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </Portal>
      </Show>
    </>
  );
};

export default NoteItem;
