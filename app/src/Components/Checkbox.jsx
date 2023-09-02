import { useEffect } from "react";

export const Checkbox = ({ boxchecked }) => {
  useEffect(() => {
    console.log("checked : ", boxchecked);
  });
  return (
    <div
      className={`w-[20px] h-[20px] border-2 rounded-md border-black ${
        boxchecked ? "bg-black" : ""
      }`}
    ></div>
  );
};
