import { Component } from "solid-js";
import { signIn } from "@junobuild/core";

const HomePage: Component = () => {
  const login = async () => {
    await signIn();
  };

  return (
    <section class="min-h-screen bg-gradient-to-r from-rose-50 to-sky-100">
      <div class="flex items-center justify-center min-h-screen">
        <div class="flex flex-col items-center justify-center gap-2 w-[550px] m-auto text-center">
          <h1 class="flex items-center justify-center gap-1 mb-5">
            <svg
              fill="none"
              stroke="currentColor"
              stroke-width={1.5}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              class="text-sky-700"
              width={42}
              height={42}
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              />
            </svg>
            <span class="font-mono text-3xl font-bold text-transparent uppercase bg-clip-text bg-gradient-to-r from-sky-500 via-sky-600 to-sky-700">
              Nooted
            </span>
          </h1>
          <p class="font-sans font-black uppercase text-6xl mb-5 text-gray-900">
            Your Notes, Your Control
          </p>
          <p class="mb-10 font-sans text-3xl font-semibold text-sky-700">
            Take Control of Your Notes in the Decentralized Web with{" "}
            <span class="font-mono text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-sky-600 to-sky-700">
              Nooted
            </span>
          </p>
          <button
            class="px-7 py-3.5 font-bold shadow-md bg-sky-100 hover:bg-sky-200 text-sky-900 rounded-full text-md font-sans"
            onClick={login}
          >
            Login with II
          </button>
          <p class="text-center font-mono text-gray-500 mt-6 text-sm">
            Built with:{" "}
            <a
              href="https://juno.build/"
              class="font-bold hover:text-gray-600"
              target="_blank"
            >
              Juno
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
