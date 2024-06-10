'use client';
import { useRef, useState } from 'react';
import { CustomFieldProp } from '../fields';
import { Input, TextArea } from '@/components/forms/inputs';

// Fields component
export function Fields({ name = "Other Fields", fields, allowed_type = 'text' , onChange}: { name ?: String, fields: CustomFieldProp[], allowed_type?: CustomFieldProp['type'] , onChange?: (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => void }) {
    const [customFields, setFields] = useState(fields);
    const inputRef = useRef<HTMLInputElement>(null);

    const addNewField = () => {
        const fieldName = inputRef.current?.value;
        if (fieldName?.trim() === '' || !fieldName) return;

        const newField: CustomFieldProp = {
            name: fieldName,
            type: allowed_type,
            placeholder: `Enter ${fieldName}`,
            label: fieldName,
        };
        setFields(oldFields => [...oldFields, newField]);
        if (inputRef.current) inputRef.current.value = '';
    };

    const removeField = (index: number) => {
        setFields(oldFields => oldFields.filter((_, i) => i !== index));
    };

    return (
        <div className="flex flex-col items-center justify-center space-y-4 w-full">
            <h2 className="text-lg font-semibold text-left w-full">{name}</h2>
            {/* Display existing fields */}
            {customFields.map((field, index) => (
                <div key={index} className="flex items-end w-full space-x-2">
                    {field.type !== 'textarea' ? (
                        <Input {...field} onChange={onChange} />
                    ) : (
                        <TextArea {...field} onChange={onChange} />
                    )}
                    <button onClick={() => removeField(index)} className="bg-red-500 text-white px-2 py-1 rounded" type="button">Remove</button>
                </div>
            ))}
            {/* Add new field */}
            <div className="flex flex-row items-end justify-between w-full">
                <Input label={`Add new ${name} field`} ref={inputRef} placeholder={`Enter new ${name} field`} />
                <button onClick={addNewField} className="bg-blue-500 text-white px-4 py-2 rounded ml-2" type="button">Add</button>
            </div>
        </div>
    );
}

// Usage
export function LinkFields({onChange}: {onChange?: (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => void}) {
    return (
        <Fields fields={[{ name: "github", type: "url", placeholder: "Enter your GitHub URL", label: "GitHub" }]} allowed_type={'url'} name="Social Media" onChange={onChange} />
    );
}
