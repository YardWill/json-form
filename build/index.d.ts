import * as React from 'react';
import { Subject } from 'rxjs';
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
    inline?: boolean;
    config: IFormConfig[];
    initialData?: IData;
    errorHandler: (errorMsg?: string) => void;
    submitHandler: (data: IData) => void;
    effects: ($: (target: string) => typeof Subject, setValue: (target: string, value: any) => void) => void;
    button: (submit: (data: IData) => void, reset: () => void) => React.ReactNode;
}
interface IFormState {
    [x: string]: any;
}
declare class Form extends React.Component<IFormProps, IFormState> {
    subscribes: {
        [x: string]: any;
    };
    constructor(props: IFormProps);
    private onChange;
    private submit;
    reset: () => void;
    render(): JSX.Element;
}
export default Form;
