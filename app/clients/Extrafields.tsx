'use client';
import { useRef, useState } from 'react';
import { CustomFieldProp } from '../fields';
import { Input, TextArea } from '@/components/forms/inputs';

// Fields component
export function Fields({ fields, allowed_type = 'text' }: { fields: CustomFieldProp[], allowed_type?: CustomFieldProp['type'] }) {
    const [customFields, setFields] = useState(fields);
    const inputRef = useRef<HTMLInputElement>(null);

    const addNewField = () => {
        const fieldName = inputRef.current?.value || 'new field';
        if (fieldName.trim() === '') return;

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
        <div className="flex flex-col items-center justify-center space-y-4">
            {/* Add new field */}
            <div className="flex flex-row items-center justify-between w-full">
                <Input label="Field Name" placeholder="Field Name" ref={inputRef} />
                <button onClick={addNewField} className="bg-blue-500 text-white px-4 py-2 rounded ml-2" type="button">Add</button>
            </div>
            {/* Display existing fields */}
            {customFields.map((field, index) => (
                <div key={index} className="flex items-center w-full space-x-2">
                    {field.type !== 'textarea' ? (
                        <Input {...field} />
                    ) : (
                        <TextArea {...field} />
                    )}
                    <button onClick={() => removeField(index)} className="bg-red-500 text-white px-2 py-1 rounded" type="button">Remove</button>
                </div>
            ))}
        </div>
    );
}

// Usage
export function LinkFields() {
    return (
        <Fields fields={[{ name: "github", type: "url", placeholder: "Enter your GitHub URL", label: "GitHub" }]} allowed_type={'url'} />
    );
}
