"use client";
import { useRef, useState } from "react";
import { CustomFieldProp } from "../../helpers/resume-builder/fields";
import { Input, TextArea } from "@/components/forms/inputs";
import { Education } from "@/app/actions";

// Fields component
export function Fields({
  name = "Other Fields",
  fields,
  allowed_type = "text",
  onChange,
}: {
  name?: String;
  fields: CustomFieldProp[];
  allowed_type?: CustomFieldProp["type"];
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}) {
  const [customFields, setFields] = useState(fields);
  const inputRef = useRef<HTMLInputElement>(null);

  const addNewField = () => {
    const fieldName = inputRef.current?.value;
    if (fieldName?.trim() === "" || !fieldName) return;

    const newField: CustomFieldProp = {
      name: fieldName,
      type: allowed_type,
      placeholder: `Enter ${fieldName}`,
      label: fieldName,
    };
    setFields((oldFields) => [...oldFields, newField]);
    if (inputRef.current) inputRef.current.value = "";
  };

  const removeField = (index: number) => {
    setFields((oldFields) => oldFields.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4 w-full">
      <h2 className="text-lg font-semibold text-left w-full">{name}</h2>
      {/* Display existing fields */}
      {customFields.map((field, index) => (
        <div key={index} className="flex items-end w-full space-x-2">
          {field.type !== "textarea" ? (
            <Input {...field} onChange={onChange} />
          ) : (
            <TextArea {...field} onChange={onChange} />
          )}
          <button
            onClick={() => removeField(index)}
            className="bg-red-500 text-white px-2 py-1 rounded"
            type="button"
          >
            Remove
          </button>
        </div>
      ))}
      {/* Add new field */}
      <div className="flex flex-row items-end justify-between w-full">
        <Input
          label={`Add new ${name} field`}
          ref={inputRef}
          placeholder={`Enter new ${name} field`}
        />
        <button
          onClick={addNewField}
          className="bg-blue-500 text-white px-4 py-2 rounded ml-2"
          type="button"
        >
          Add
        </button>
      </div>
    </div>
  );
}

// Usage
export function SocialMultipleFields({
  onChange,
}: {
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}) {
  return (
    <Fields
      fields={[
        {
          name: "github",
          type: "url",
          placeholder: "Enter your GitHub URL",
          label: "GitHub",
        },
      ]}
      allowed_type={"url"}
      name="Social Media"
      onChange={onChange}
    />
  );
}

type GroupField = {
  type:
    | "text"
    | "textarea"
    | "url"
    | "number"
    | "email"
    | "select"
    | "radio"
    | "checkbox"
    | "date"
    | "file"
    | "password";
  placeholder: string;
  label: string;
  name: string;
  required?: boolean;
  options?: (string | { value: string; label: string })[];
};

export function MultipleGroupFields<T>({
  fields,
  onChange,
  name,
}: {
  fields: GroupField[];
  name: string;
  onChange?: (data: T[]) => void;
}) {
  const [groupData, setGroupData] = useState<T[]>([]);
  const [currentData, setCurrentData] = useState<T>({} as T);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setCurrentData((prevData) => ({ ...prevData, [name]: value }));
  };

  const addGroup = () => {
    setGroupData((prevData) => [...prevData, currentData]);
    setCurrentData({} as T);
    if (onChange) {
      onChange([...groupData, currentData]);
    }
  };

  const removeGroup = (index: number) => {
    const updatedData = groupData.filter((_, i) => i !== index);
    setGroupData(updatedData);
    if (onChange) {
      onChange(updatedData);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4 w-full">
      <h2 className="text-lg font-semibold text-left w-full">{name}</h2>

      {/* Input fields for new group */}
      {fields.map((field, index) => (
        <div key={index} className="w-full">
          {field.type === "select" ? (
            <select
              name={field.name}
              onChange={handleInputChange}
              value={(currentData as any)[field.name] || ""}
              className="w-full p-2 border rounded"
            >
              <option value="">{field.placeholder}</option>
              {field.options?.map((option, i) => (
                <option
                  key={i}
                  value={typeof option === "string" ? option : option.value}
                >
                  {typeof option === "string" ? option : option.label}
                </option>
              ))}
            </select>
          ) : (
            <Input
              {...field}
              value={(currentData as any)[field.name] || ""}
              onChange={handleInputChange}
            />
          )}
        </div>
      ))}

      <button
        onClick={addGroup}
        className="bg-green-500 text-white px-4 py-2 rounded"
        type="button"
      >
        Add {name}
      </button>

      {/* Display existing groups */}
      {groupData.map((group, index) => (
        <div key={index} className="w-full p-4 border rounded mt-4">
          {fields.map((field, fieldIndex) => (
            <p key={fieldIndex}>
              <strong>{field.label}:</strong> {(group as any)[field.name]}
            </p>
          ))}
          <button
            onClick={() => removeGroup(index)}
            className="bg-red-500 text-white px-2 py-1 rounded mt-2"
            type="button"
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}

export function EducationFields({
  onChange,
}: {
  onChange?: (data: Education[]) => void;
}) {
  const fields: GroupField[] = [
    {
      name: "degree",
      type: "select",
      placeholder: "Select your degree",
      label: "Degree",
      options: ["BSc", "MSc", "PhD"],
    },
    {
      name: "institution",
      type: "text",
      placeholder: "Enter your institution",
      label: "Institution",
    },
    {
      name: "start",
      type: "date",
      placeholder: "Enter start date",
      label: "Start Date",
    },
    {
      name: "end",
      type: "date",
      placeholder: "Enter end date",
      label: "End Date",
    },
  ];
  return (
    <MultipleGroupFields<Education>
      fields={fields}
      name="Education"
      onChange={onChange}
    />
  );
}
