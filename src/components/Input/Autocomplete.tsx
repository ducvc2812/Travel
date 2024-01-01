import React, { type ReactNode } from 'react';
import { Controller, type Path, type PathValue, type Control, type FieldPath, type FieldValues, type RegisterOptions } from 'react-hook-form';
import { useTranslation } from 'next-i18next';
import { FormControl } from '@mui/material';
import { Cascader } from 'antd';
import { type CascaderProps, type DefaultOptionType } from 'antd/es/cascader';
import OptionType from '../constants/type';

interface IAutocompleteSelect<T extends FieldValues> {
    options: OptionType[]
    control: Control<T>
    rules?: RegisterOptions<T>
    label?: string
    id: string
    name: FieldPath<T>
    noteMessage?: string
    required: boolean
    error: boolean | undefined
    iconBefore?: ReactNode
    containerClassName?: string
}

export default function AutocompleteSelect<T extends FieldValues> ({ options, className, control, rules, label, id, name, noteMessage, required, error, containerClassName, defaultValue = [], iconBefore, ...props }: IAutocompleteSelect<T> & CascaderProps) {
    const { t } = useTranslation();
    const filter = (inputValue: string, path: DefaultOptionType[]) =>
        path.some(
            (option) => (option.label as string).toLowerCase().includes(inputValue.toLowerCase())
        );
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
                        <Cascader
                            // suffixIcon={<DownArrowIcon/>}
                            className={`h-[42px] w-full relative ${error && ' border-brand rounded-[8px]'} ${iconBefore && 'autocomplete-custom'}`}
                            value={value}
                            onChange={onChange}
                            options={options}
                            showSearch={{ filter }}
                            {...props}
                        />
                        <div className='absolute top-[10px] left-[10px]'>
                            {iconBefore}
                        </div>
                        {noteMessage && <span className="mt-[10px] text-brand1 text-[14px] block opacity-[0.7]">{noteMessage}</span>}
                    </FormControl>
                )}
            />
        </div>
    );
};
