
export type UseStateCallback = <Type>(initialState: Type, callback: () => void) => [Type, (state: Type) => void];