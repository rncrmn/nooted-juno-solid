import { Component, Show, useContext } from "solid-js";
import { Portal } from "solid-js/web";
import { Context } from "../context/Context";

const Modal: Component = () => {
  const {
    setNotes,
    id,
    setId,
    title,
    setTitle,
    content,
    setContent,
    createdAt,
    setCreatedAt,
    isHidden,
    setIsHidden,
  } = useContext(Context);

  return <></>;
};

export default Modal;
