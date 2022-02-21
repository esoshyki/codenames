export enum Locales {
    ru = "ru-RU",
    en = "en-US",
    be = "be-BE"
};

const locales = [Locales.ru, Locales.be, Locales.en];

export const getLocale = (locale: string | undefined) : Locales => {

    const foundLocal = locales.find(el => el === locale);
    if (foundLocal) {
        return foundLocal
    } else {
        return Locales.ru;
    }
}