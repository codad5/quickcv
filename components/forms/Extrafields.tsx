"use client";
import { useEffect, useRef, useState } from "react";
import { Input, TextArea } from "@/components/forms/inputs";
import type { Education, Experience, Project, Social } from "@/app/actions";

export type GroupField<Name = string> = {
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
  name: Name;
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
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    setGroupData(defaultValues);
  }, [defaultValues]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setCurrentData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateGroupData = () => {
    const newErrors: string[] = [];
    fields.forEach((field) => {
      if (field.required && !currentData[field.name as keyof T]) {
        newErrors.push(`${field.label} is required.`);
      }
    });
    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const addGroup = () => {
    if (validateGroupData()) {
      setGroupData((prevData) => [...prevData, currentData]);
      setCurrentData({} as T);
      if (onChange) {
        onChange([...groupData, currentData]);
      }
      setErrors([]);
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
    const value = (currentData as any)[field.name] || "";
    const isRequired = field.required ? "required" : "";
    delete field.required;

    switch (field.type) {
      case "select":
        return (
          <select
            name={field.name}
            onChange={handleInputChange}
            value={value}
            className={`w-full p-2 border rounded text-black ${isRequired}`}
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
            value={value}
            onChange={handleInputChange}
            className={isRequired}
          />
        );
      default:
        return (
          <Input
            {...field}
            value={value}
            onChange={handleInputChange}
            className={isRequired}
          />
        );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4 w-full">
      <h2 className="text-lg font-semibold text-left w-full">{name}</h2>

      {/* Display error messages */}
      {errors.length > 0 && (
        <div className="text-red-500 mb-4">
          {errors.map((error, index) => (
            <p key={index}>{error}</p>
          ))}
        </div>
      )}

      {/* Input fields for new group */}
      {fields.map((field, index) => (
        <div key={index} className="w-full">
          {renderField(field)}
        </div>
      ))}
      <div className="w-full">
        <button
          onClick={addGroup}
          className="bg-green-500 text-white px-4 py-2 rounded"
          type="button"
          >
          Add {name}
        </button>
      </div>

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
  const fields: GroupField<keyof Education>[] = [
    {
      name: "degree",
      type: "select",
      placeholder: "Select your degree",
      label: "Degree",
      required: true,
      options: ["BSc", "MSc", "PhD"],
    },
    {
      name: "fieldOfStudy",
      type: "text",
      placeholder: "Enter your field of study",
      label: "Field of Study",
      required: true,
    },
    {
      name: "school",
      type: "text",
      placeholder: "Enter your institution",
      label: "Institution",
      required: true,
    },
    {
      name: "startYear",
      type: "date",
      placeholder: "Enter start date",
      label: "Start Date",
    },
    {
      name: "endYear",
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
  const fields: GroupField<keyof Experience>[] = [
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
      required: true,
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
  const fields: GroupField<keyof Social>[] = [
    {
      name: "platform",
      type: "text",
      placeholder: "Enter social media platform",
      label: "Platform",
      required: true,
    },
    {
      name: "url",
      type: "text",
      placeholder: "Enter your profile URL or handle",
      label: "URL (or handle)",
      required: true,
    },
  ];
  return (
    <Fields<{ [key: string]: string }>
      fields={fields}
      name="Socials"
      onChange={onChange}
      defaultValues={defaultValues}
    />
  );
}


// for project fields
export function ProjectFields({
  onChange,
  defaultValues = [],
}: {
  onChange?: (data: { [key: string]: string }[]) => void;
  defaultValues?: { [key: string]: string }[];
}) {
  const fields: GroupField<keyof Project>[] = [
    {
      name: "title",
      type: "text",
      placeholder: "Enter project title",
      label: "Title",
      required: true,
    },
    {
      name: "skills",
      type: "text",
      placeholder: "Enter your skills",
      label: "Skills",
      required: true,
    },
    {
      name: "description",
      type: "textarea",
      placeholder: "Describe your project",
      label: "Description",
      required: true,
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
  ];
  return (
    <Fields<{ [key: string]: string }>
      fields={fields}
      name="Project"
      onChange={onChange}
      defaultValues={defaultValues}
    />
  );
}