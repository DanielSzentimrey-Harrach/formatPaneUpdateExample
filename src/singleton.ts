class Singleton {
    private static instance: Singleton;
    public values: any[] = [];

    private constructor() {}

    public static getInstance(): Singleton {
        if (!Singleton.instance) {
            Singleton.instance = new Singleton();
        }
        return Singleton.instance;
    }
}

export const singletonInstance = Singleton.getInstance();