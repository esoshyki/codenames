import { IField, Sides } from "@/types/game";

export const getStart = (field: IField) => 
    field.cards.filter(el => el.type === Sides.blue).length === 9 ? 
    Sides.blue : Sides.red;
