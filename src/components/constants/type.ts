export interface IAuth {
    user: string;
    accessToken: any;
    refreshToken: any;
}
export default interface OptionType {
    value: string | number
    label: string
    name?: string
    id?: string
    disabled?: boolean
    checked?: boolean
    className?: string
    children?: OptionType[]
    control?: boolean
}