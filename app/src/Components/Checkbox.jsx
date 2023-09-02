import { white_true_icon } from "../Assets";
import Image from "next/image";
export const Checkbox = ({ boxchecked }) => {
  return (
    <div
      className={`w-[20px] h-[20px] border-2 rounded-md border-black ${
        boxchecked ? "bg-black" : ""
      }`}
    >
      <Image src={white_true_icon} alt="icon"></Image>
    </div>
  );
};
