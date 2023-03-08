

export interface ModalContextValues {

    title?: string;
    class?: 'success-background'|'error-background'|'warning-background';
    onExit?: () => void;

}