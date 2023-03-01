
export type UseStateCallback = <Type>(initialState: Type, callback: (state: Type) => Type) => [Type, (state: Type) => void];