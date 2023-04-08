export interface ObjectSameTypeValues<T> {
    [name: string]: T[keyof T]
}

export enum ReducerTypes {
    Add = 'add',
    Delete = 'delete',
    Edit = 'edit',
    Reset = 'reset',
}


export type ReducerAction<T extends { [key: string]: any }> = {
    [Key in keyof T]: T[Key] extends undefined
        ?
        {
            type: Key
        }
        :
        {
            type: Key,
            payload: T[Key]
        }
}

export type CheckedItemsPayload = {

    [ReducerTypes.Add]: string;
    [ReducerTypes.Delete]: string;
    [ReducerTypes.Reset]: undefined;

}

export type CheckedItemsActions = ReducerAction<CheckedItemsPayload>[keyof ReducerAction<CheckedItemsPayload>];
