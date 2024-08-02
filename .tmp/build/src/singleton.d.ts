declare class Singleton {
    private static instance;
    values: any[];
    private constructor();
    static getInstance(): Singleton;
}
export declare const singletonInstance: Singleton;
export {};
