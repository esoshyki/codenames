import { getErrorContent } from "./errors";
import { getFinishContent } from "./finish";
import { getMenuContent } from "./menu";
import { getPreStartContent } from "./prestart";
import { getSelectCollectionContent } from "./selectCollection";

const t = {
    preStart: getPreStartContent,
    menu: getMenuContent,
    errors: getErrorContent,
    selectCollection: getSelectCollectionContent,
    finish: getFinishContent
};

export default t;