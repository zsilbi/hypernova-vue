declare type HypernovaPayload = {
    node: HTMLElement;
    data: any;
};
export { load } from 'hypernova';
export declare const mountComponent: (Component: any, node: HTMLElement, data: any) => any;
export declare const renderInPlaceholder: (name: string, Component: any, id: string) => any;
export declare const loadById: (name: string, id: string) => HypernovaPayload;
export declare const renderVue: (name: string, Component: any) => void;
