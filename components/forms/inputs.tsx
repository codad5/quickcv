import React from 'react';

type CustomLabelProps = React.LabelHTMLAttributes<HTMLLabelElement> & { text?: string };

type IconProps = React.ReactNode | { position: 'left' | 'right', display: React.ReactNode };

// Label component
export function Label({ text, ...props }: { text: string } & React.LabelHTMLAttributes<HTMLLabelElement>) {
    return <label className="text-sm text-left w-full" {...props}>{text}</label>;
}

// Input component with Tailwind CSS styling and label of type string or an object with all props available for a label
export function Input({ label, icon, ...props }: { label?: string | CustomLabelProps; icon?: IconProps } & React.InputHTMLAttributes<HTMLInputElement>) {
    const renderIcon = (icon?: IconProps) => {
        if (!icon) return null;
        if (React.isValidElement(icon)) return icon;
        if (typeof icon === 'object' && 'display' in icon) return icon.display;
        // string , number, boolean return icon
        if (typeof icon === 'string' || typeof icon === 'number' || typeof icon === 'boolean') {
            return <span>{icon}</span>;
        }
        return null;
    };

    const iconPosition = icon && typeof icon === 'object' && 'position' in icon ? icon.position : 'left';
    const DisplayIcon = renderIcon(icon)
    return (
        <div className="flex flex-col w-full gap-2">
            {label && typeof label === 'string' ? (
                <Label text={label} htmlFor={props.id} />
            ) : label && typeof label !== 'string' ? (
                <Label text={label.text || ''} {...label} htmlFor={props.id} />
            ) : null}
            <div className={`flex ${iconPosition === 'right' ?  'flex-row-reverse' : 'flex-row' } items-center w-full`}>
                {DisplayIcon &&<span className="flex items-center justify-center px-2">{
                    renderIcon(icon)
                }</span>}
                <input
                    type={props.type}
                    className="border border-gray-300 rounded px-2 py-1 text-black placeholder-black inverse-color flex-grow"
                    {...props}
                />
            </div>
        </div>
    );
}

// TextArea component
export function TextArea({ label, ...props }: { label?: string | CustomLabelProps } & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
    return (
        <div className="flex flex-col">
            {label && typeof label === 'string' ? (
                <Label text={label} htmlFor={props.id} />
            ) : label && typeof label !== 'string' ? (
                <Label text={label.text || ''} {...label} htmlFor={props.id} />
            ) : null}
            <textarea className="border border-gray-300 rounded px-2 py-1 w-full text-black placeholder-black inverse-color" {...props} />
        </div>
    );
}
