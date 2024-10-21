import React, { forwardRef } from 'react';

export type CustomLabelProps = React.LabelHTMLAttributes<HTMLLabelElement> & { text?: string };

export type IconProps = React.ReactNode | { position: 'left' | 'right', display: React.ReactNode };

// Label component
export function Label({ text, ...props }: { text: string } & React.LabelHTMLAttributes<HTMLLabelElement>) {
    return (
      <label
        className="text-xl font-normal text-green-light-opacity text-left w-full"
        {...props}
      >
        {text}
      </label>
    );
}

// Input component with Tailwind CSS styling and label of type string or an object with all props available for a label
export const Input = forwardRef<HTMLInputElement, { label?: string  |false | CustomLabelProps; icon?: IconProps } & React.InputHTMLAttributes<HTMLInputElement>>(({ label, icon, ...props }, ref) => {
    const renderIcon = (icon?: IconProps) => {
        if (!icon) return null;
        if (React.isValidElement(icon)) return icon;
        if (typeof icon === 'object' && 'display' in icon) return icon.display;
        if (typeof icon === 'string' || typeof icon === 'number' || typeof icon === 'boolean') {
            return <span>{icon}</span>;
        }
        return null;
    };

    const iconPosition = icon && typeof icon === 'object' && 'position' in icon ? icon.position : 'left';
    const DisplayIcon = renderIcon(icon);

    if (!props.placeholder) {
        props.placeholder = `Enter ${label?.toString().toLowerCase() || props.name || ''}`;
    }

    if (label !== false && props.name) {
        label = label || props.name;
    }

    return (
      <div className="flex flex-col w-full gap-2">
        {label && typeof label === "string" ? (
          <Label text={label} htmlFor={props.id} />
        ) : label && typeof label !== "string" ? (
          <Label text={label.text || ""} {...label} htmlFor={props.id} />
        ) : null}
        <div
          className={`flex ${
            iconPosition === "right" ? "flex-row-reverse" : "flex-row"
          } items-center w-full h-10`}
        >
          {DisplayIcon && (
            <span className="flex items-center justify-center px-2">
              {DisplayIcon}
            </span>
          )}
          <input
            type={props.type}
            {...props}
            className={`w-full h-full px-2 border-b text-progress-green border-b-green-light-opacity bg-light-gray-opacity placeholder:text-green-light-opacity ${props.className}`}
            ref={ref}
            required={false}
          />
        </div>
      </div>
    );
});

// TextArea component
export const TextArea = forwardRef<HTMLTextAreaElement, { label?: string | CustomLabelProps } & React.TextareaHTMLAttributes<HTMLTextAreaElement>>(({ label, ...props }, ref) => {
    return (
      <div className="flex flex-col w-full gap-2">
        {label && typeof label === "string" ? (
          <Label text={label} htmlFor={props.id} />
        ) : label && typeof label !== "string" ? (
          <Label text={label.text || ""} {...label} htmlFor={props.id} />
        ) : null}
        <textarea
          {...props}
          className={`px-2 text-progress-green border-b-green-light-opacity bg-light-gray-opacity inverse-color min-h-[200px] h-fit ${props.className}`}
          ref={ref}
          required={false}
        />
      </div>
    );
});


