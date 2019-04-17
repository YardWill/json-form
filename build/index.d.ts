import * as React from 'react';
export declare const registerComponent: (type: string, Component: React.ReactNode) => void;
interface IFormConfig {
    type: string;
    target: string;
    title: React.ReactNode;
    placeholder?: string;
    test?: (value: any) => boolean;
    errorMsg?: string;
}
interface IData {
    [x: string]: any;
}
interface IFormProps {
    config: IFormConfig[];
    initialData?: IData;
    errorHandler: (errorMsg?: string) => void;
    submitHandler: (data: IData) => void;
}
interface IFormState {
    [x: string]: any;
}
declare class Form extends React.Component<IFormProps, IFormState> {
    constructor(props: IFormProps);
    onChange: (target: string, value: any) => void;
    submit: () => void;
    render(): JSX.Element;
}
export default Form;
