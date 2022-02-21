import { getErrorContent } from "./errors";
import { getMenuContent } from "./menu";
import { getPreStartContent } from "./prestart";

const t = {
    preStart: getPreStartContent,
    menu: getMenuContent,
    errors: getErrorContent
};

export default t;