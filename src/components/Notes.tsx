import { Component, For, onMount, useContext } from "solid-js";
import { listDocs } from "@junobuild/core";
import { Context, Note } from "../context/Context";
import { NoteItem } from "./";

const Notes: Component = () => {
  const { notes, setNotes } = useContext(Context);

  onMount(async () => {
    const { items } = await listDocs({
      collection: "Notes",
      filter: {
        order: {
          desc: true,
        },
      },
    });

    const sortedItems = items.sort(
      (ca1, ca2) => Number(ca1.created_at) - Number(ca2.created_at)
    );

    sortedItems.map((item) => {
      setNotes((prev) => [item.data as Note, ...prev]);
    });
  });

  // setNotes((prev) => prev.reverse());

  return (
    <div class="relative col-span-11 bg-white px-12 pt-12 py-8 flex justify-between flex-col">
      <div class="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-6">
        <For each={notes}>{(note: Note) => <NoteItem note={note} />}</For>
      </div>
      <p class="text-center font-mono text-gray-600 mt-6 text-sm">
        Built with:{" "}
        <a href="https://juno.build/" class="font-bold" target="_blank">
          Juno
        </a>
      </p>
    </div>
  );
};

export default Notes;
