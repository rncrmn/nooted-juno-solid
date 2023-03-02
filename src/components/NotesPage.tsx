import { Component } from "solid-js";
import { Sidebar, Notes } from "./";

const NotesPage: Component = () => {
  return (
    <div class="w-full h-sc">
      <div class="grid grid-cols-12 ">
        <Sidebar />
        <Notes />
      </div>
    </div>
  );
};

export default NotesPage;
