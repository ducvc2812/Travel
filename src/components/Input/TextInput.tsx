import { FormControl, TextField, type TextFieldProps } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { Controller, type RegisterOptions, type Control, type FieldValues, type FieldPath, type PathValue, type Path } from 'react-hook-form';
interface ITextInputProps<T extends FieldValues> {
    label?: string
    id: string
    noteMessage: string | undefined
    required: boolean
    control: Control<T>
    name: FieldPath<T>
    rules?: RegisterOptions<T>
    error?: boolean | undefined
    className?: string
    containerClassName?: string
}
export default function TextInput<T extends FieldValues> ({ label, id, noteMessage, required, control, name, rules, error, className, defaultValue = '', containerClassName = '', ...props }: ITextInputProps<T> & TextFieldProps) {
    const { placeholder } = props;
    const { t } = useTranslation();
    return (
        <div className={containerClassName}>
            <Controller
                name={name}
                rules={{
                    required: {
                        value: required,
                        message: t('common.validate.required')
                    },
                    ...rules
                }}
                control={control}
                defaultValue={defaultValue as PathValue<T, Path<T>>}
                render={({ field: { value, onChange } }) => (
                    <>
                        <FormControl fullWidth>
                            {label && <label htmlFor={id} className="mb-[10px] block text-text1 text-[14px] font-[600]">{label} {required && <span className='text-brand1'>*</span>}</label>}
                            <TextField
                                id={id}
                                className={`w-full ${className}`}
                                value={value}
                                onChange={onChange}
                                placeholder={placeholder ?? `${t('common.textfield.input.default')} ${label?.toLowerCase()}`}
                                error={error}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#c94962'
                                        },
                                        '&:hover fieldset': {
                                            borderColor: '#c94962',
                                            borderWidth: 1
                                        }
                                    }
                                }}

                                {...props}
                            />
                            {noteMessage && <span className={`mt-[10px] text-[14px] block ${error ? 'text-brand1' : 'text-text1'} opacity-[0.7]`}>{noteMessage}</span>}
                        </FormControl>
                    </>
                )}
            />
        </div>

    );
}
