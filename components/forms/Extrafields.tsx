"use client";
import { useRef, useState } from "react";
import { Input, TextArea } from "@/components/forms/inputs";
import { Education, Experience } from "@/app/actions";

export type GroupField = {
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

type FieldProps<T> = {
  name: string;
  fields: GroupField[];
  onChange?: (data: T[]) => void;
  defaultValues?: T[];
};

export function Fields<T>({
  name,
  fields,
  onChange,
  defaultValues = [],
}: FieldProps<T>) {
  return (
    <MultipleGroupFields<T>
      fields={fields}
      name={name}
      onChange={onChange}
      defaultValues={defaultValues}
    />
  );
}

function MultipleGroupFields<T>({
  fields,
  onChange,
  name,
  defaultValues = [],
}: FieldProps<T>) {
  const [groupData, setGroupData] = useState<T[]>(defaultValues);
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

  const renderField = (field: GroupField) => {
    switch (field.type) {
      case "select":
        return (
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
        );
      case "textarea":
        return (
          <TextArea
            {...field}
            value={(currentData as any)[field.name] || ""}
            onChange={handleInputChange}
          />
        );
      default:
        return (
          <Input
            {...field}
            value={(currentData as any)[field.name] || ""}
            onChange={handleInputChange}
          />
        );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4 w-full">
      <h2 className="text-lg font-semibold text-left w-full">{name}</h2>

      {/* Input fields for new group */}
      {fields.map((field, index) => (
        <div key={index} className="w-full">
          {renderField(field)}
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
  defaultValues = [],
}: {
  onChange?: (data: Education[]) => void;
  defaultValues?: Education[];
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
    <Fields<Education>
      fields={fields}
      name="Education"
      onChange={onChange}
      defaultValues={defaultValues}
    />
  );
}

export function ExperienceFields({
  onChange,
  defaultValues = [],
}: {
  onChange?: (data: Experience[]) => void;
  defaultValues?: Experience[];
}) {
  const fields: GroupField[] = [
    {
      name: "company",
      type: "text",
      placeholder: "Enter company name",
      label: "Company",
    },
    {
      name: "position",
      type: "text",
      placeholder: "Enter your position",
      label: "Position",
    },
    {
      name: "startDate",
      type: "date",
      placeholder: "Enter start date",
      label: "Start Date",
    },
    {
      name: "endDate",
      type: "date",
      placeholder: "Enter end date",
      label: "End Date",
    },
    {
      name: "description",
      type: "textarea",
      placeholder: "Describe your responsibilities and achievements",
      label: "Description",
    },
  ];
  return (
    <Fields<Experience>
      fields={fields}
      name="Experience"
      onChange={onChange}
      defaultValues={defaultValues}
    />
  );
}

export function SocialMultipleFields({
  onChange,
  defaultValues = [],
}: {
  onChange?: (data: { [key: string]: string }[]) => void;
  defaultValues?: { [key: string]: string }[];
}) {
  const fields: GroupField[] = [
    {
      name: "platform",
      type: "text",
      placeholder: "Enter social media platform",
      label: "Platform",
    },
    {
      name: "url",
      type: "url",
      placeholder: "Enter your profile URL",
      label: "URL",
    },
  ];
  return (
    <Fields<{ [key: string]: string }>
      fields={fields}
      name="Social Media"
      onChange={onChange}
      defaultValues={defaultValues}
    />
  );
}
