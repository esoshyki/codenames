import { getErrorContent } from "./errors";
import { getMenuContent } from "./menu";
import { getPreStartContent } from "./prestart";
import { getSelectoCollectionContent } from "./selectCollection";

const t = {
    preStart: getPreStartContent,
    menu: getMenuContent,
    errors: getErrorContent,
    selectCollection: getSelectoCollectionContent
};

export default t;