import { useState } from "react";
import { useSelector } from "react-redux";

export const Settings = () => {
  const state = useSelector((state) => state.User);
  return <h1>Settings</h1>;
};
