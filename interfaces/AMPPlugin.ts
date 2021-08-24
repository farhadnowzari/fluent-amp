export default interface AMPPlugin<TOptions = {}> {
    options: TOptions;
    name: string;
    install(): void;
}
