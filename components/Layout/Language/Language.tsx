import { setLocale } from "@/store/app/app.actions";
import { select } from "@/store/select";
import { ChangeEvent, ChangeEventHandler, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { getLocale, Locales } from "translate/locales";
import { RollAnimation } from "@/styles/animations";


const LanguageBar = styled.div<{
    locale: Locales,
    show: boolean
}>`
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 50000;
    width: 60px;
    height: 60px;
    background-image: ${props => {
        if (props.show) {
            return null;
        }
        switch (props.locale) {
            case Locales.be:
                return `url(/icons/be.png)`;
            case Locales.ru:
                return `url(/icons/ru.png)`;
            default:
                return `url(/icons/en.png)`;
        }
    }};
    background-color: transparent;
    background-size: 50px;
    background-position: center;
    background-repeat: no-repeat;
    &:hover {
        cursor: pointer;
    }
`;

const LanguageOptionsWrapper = styled.div<{show: boolean}>`
    height: 150px;
    width: 50px;
    margin: auto;
    display: flex;
    flex-direction: column;
    position: absolute;
    bottom: ${props => props.show ? "0" : "-150px"};
    transition: 0.3s ease-in;
    left: 5px;
`;

const LanguageOption = styled.option<{
    locale: Locales,
}>`
    background-image: ${props => {
        switch (props.locale) {
            case Locales.be:
                return `url(/icons/be.png)`;
            case Locales.ru:
                return `url(/icons/ru.png)`;
            default:
                return `url(/icons/en.png)`;
        }
    }};
    width: 50px;
    height: 50px;
    background-size: cover;
    transition: cubic-bezier(0.075, 0.82, 0.165, 1);
    &:hover {
        cursor: pointer;
        animation: ${RollAnimation} 1s ease-in 0s infinite;
    }
`;


const Language = () => {

    const dispatch = useDispatch();

    const locale = useSelector(select.app.locale);

    const onChange = (locale: Locales) => {
        dispatch(setLocale(locale));
    };

    const [showItems, setShowItems] = useState(false);

    const toggleShowItems = () => {
        setShowItems(!showItems)
    }

    return (
        <LanguageBar 
            locale={locale}
            onClick={toggleShowItems} 
            show={showItems}
            >

            <LanguageOptionsWrapper show={showItems}>
            
                <LanguageOption 
                    locale={Locales.ru}
                    onClick={() => onChange(Locales.ru)}
                    >
                </LanguageOption>
                
                <LanguageOption 
                    onClick={() => onChange(Locales.en)}
                    locale={Locales.en}>
                </LanguageOption>

                <LanguageOption
                    onClick={() => onChange(Locales.be)}
                    locale={Locales.be}>
                </LanguageOption>
            
            </LanguageOptionsWrapper>

        </LanguageBar>)
};

export default Language;