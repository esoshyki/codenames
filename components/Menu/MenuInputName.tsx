import styled from 'styled-components';
import { colors
 } from '@/theme/colors';
import { useSelector } from 'react-redux';
import { useRef } from 'react';
import { menuContent } from 'translate/menu';
import { select } from '@/store/select';

const InputWrapper = styled.div`
    height: 50px;
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
`;

const InputLabel = styled.span`
    font-size: 20px;
    margin-bottom: 20px;
`

const Input = styled.input`
    width: 400px;
    max-width: 400px;
    padding: 15px 15px;
    border: none;
    outline: none;
    background-color: transparent;
    color: #fff;
    border: 1px solid #fff;
    font-weight: 700;
    transition: 0.1s ease-in;
    &::placeholder {
        color: transparent;
    }
    &:focus {
        border-color: ${colors.yellow};
    }
`;

const InputError = styled.span`
    color: ${colors.red};
    font-weight: 700;
    font-size: 14px;
    width: 100%;
    text-align: center;
`;

const MenuInputName = () => {

    const inputRef = useRef<HTMLInputElement>(null);
    const locale = useSelector(select.app.locale)

    const content = menuContent[locale];

    return (
        <InputWrapper>
            <InputLabel>
                {content.yourName}
            </InputLabel>
            <Input ref={inputRef}/>
            <InputError />
        </InputWrapper>
    )

};

export default MenuInputName;



