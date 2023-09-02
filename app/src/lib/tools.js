import { readFile } from "fs/promises";

export const fileReader = (str) => readFile(str);

export const noop = () => {};