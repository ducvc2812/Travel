import { DatePicker, type DatePickerProps } from 'antd';
import { type Control, Controller, type FieldPath, type FieldValues, type Path, type PathValue, type RegisterOptions } from 'react-hook-form';
import { FormControl } from '@mui/material';
import { useTranslation } from 'next-i18next';

interface IDateTimeSelect<T extends FieldValues> {
    control: Control<T>
    rules?: RegisterOptions<T>
    label?: string
    id: string
    name: FieldPath<T>
    noteMessage?: string
    required: boolean
    error: boolean | undefined
    containerClassName?: string
    

}

export default function DateTimeSelect<T extends FieldValues> ({ containerClassName, name, control, required, rules, defaultValue, error, noteMessage, label, id, ...props }: IDateTimeSelect<T> & DatePickerProps) {
    const { t } = useTranslation();

    return (
        <div className={containerClassName}>
            <Controller
                control={control}
                name={name}
                rules={{
                    required: {
                        value: required,
                        message: t('common.validate.required')
                    },
                    ...rules
                }}
                defaultValue={defaultValue as PathValue<T, Path<T>>}
                render={({ field: { value, onChange } }) => (
                    <FormControl fullWidth>
                        {label && <label id={id} className="mb-[10px] block text-text1 text-[14px] font-[600]">{label} {required && <span className='text-brand1'>*</span>}</label>}
                        <DatePicker
                            format={'DD/MM/YYYY'}
                            className={`h-[42px] ${props.className}`}
                            onChange={(date) => { onChange(date); }}
                            value={value}
                            {...props}
                        />
                        {noteMessage && <span className={`mt-[10px] ${error ? 'text-brand1' : 'text-text1'} text-[14px] block opacity-[0.7]`}>{noteMessage}</span>}
                    </FormControl>
                )}
            />
        </div>
    );
}
