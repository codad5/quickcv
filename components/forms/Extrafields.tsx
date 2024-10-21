import React, { useEffect, useState } from "react";
import { Input, TextArea } from "@/components/forms/inputs";
import type { Education, Experience, Project, Social } from "@/app/actions";
import { newNotification } from "@/helpers/commons/client";
import { Add, Edit, Trash } from "iconsax-react";

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
  allowEdit?: boolean;
  onErrors?: (errors: string[]) => void;
};

function MultipleGroupFields<T>({
  fields,
  onChange,
  name,
  defaultValues = [],
  allowEdit = true,
  onErrors,
}: FieldProps<T>) {
  const [groupData, setGroupData] = useState<T[]>(defaultValues);
  const [currentData, setCurrentData] = useState<T>({} as T);
  const [errors, setErrors] = useState<string[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);


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

  const addOrUpdateGroup = () => {
    if (validateGroupData()) {
      if (editIndex !== null) {
        setGroupData((prevData) => {
          const newData = [...prevData];
          newData[editIndex] = currentData;
          return newData;
        });
        setEditIndex(null);
      } else {
        setGroupData((prevData) => [...prevData, currentData]);
      }
      setCurrentData({} as T);
      setIsModalOpen(false);
    }
  };

  useEffect(() => {
    if (onErrors) {
      onErrors(errors);
    }
    const timeout = setTimeout(() => {
      setErrors([]);
    }, 5000);
    return () => clearTimeout(timeout);
  }, [errors]);

  useEffect(() => {
    if (onChange) {
      console.log(groupData, "groupData");
      onChange(groupData);
    }
  }, [groupData]);

  const removeGroup = (index: number) => {
    const updatedData = groupData.filter((_, i) => i !== index);
    setGroupData(updatedData);
    if (onChange) {
      onChange(updatedData);
    }
    if (editIndex === index) {
      setEditIndex(null);
      setCurrentData({} as T);
    }
  };

  const editGroup = (index: number) => {
    if (allowEdit) {
      setCurrentData(groupData[index]);
      setEditIndex(index);
      setIsModalOpen(true);
    }
  };

  const cancelEdit = () => {
    setCurrentData({} as T);
    setEditIndex(null);
    setErrors([]);
    setIsModalOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
    setCurrentData({} as T);
    setEditIndex(null);
  };

  const renderField = (field: GroupField) => {
    const value = (currentData as any)[field.name] || "";
    const isRequired = field.required ? "required" : "";
    // delete field.required;

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
      {errors.length > 0 && !onErrors && (
        <div className="text-red-500 mb-4">
          {errors.map((error, index) => (
            <p key={index}>{error}</p>
          ))}
        </div>
      )}

      {isModalOpen && (
        <div className="grid place-items-center fixed inset-0 w-svw h-svh bg-light-gray-opacity-2 py-4 z-30">
          <div className="px-10 py-12 bg-deep-blue max-h-[800px] overflow-y-auto rounded-3xl flex flex-col gap-4">
            {fields.map((field, index) => (
              <div key={index} className="w-full">
                {renderField(field)}
              </div>
            ))}
            <div className="w-full">
              <button
                onClick={addOrUpdateGroup}
                className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                type="button"
              >
                {editIndex !== null ? `Update ${name}` : `Add ${name}`}
              </button>
              <button
                onClick={cancelEdit}
                className="bg-gray-500 text-white px-4 py-2 rounded"
                type="button"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {groupData.map((group, index) => (
        <div
          key={index}
          className="w-full px-4 py-6 flex flex-col justify-center items-center bg-light-gray-opacity relative"
        >
          {fields.map((field, fieldIndex) => (
            <p key={fieldIndex} className="w-full text-xl overflow-clip">
              <strong className="font-bold">{field.label}:</strong>{" "}
              <span className="font-light text-wrap">
                {(group as any)[field.name]}
              </span>
            </p>
          ))}
          <div className="absolute w-full h-full flex justify-end items-end p-5">
            <div className="btn-wrapper flex gap-4">
              {allowEdit && (
                <Edit
                  onClick={() => editGroup(index)}
                  size={"24px"}
                  className="text-white"
                  type="button"
                />
              )}
              <Trash
                onClick={() => removeGroup(index)}
                className=" text-red-alert"
                size={"24px"}
                color={"#FF0202"}
                type="button"
              />
            </div>
          </div>
        </div>
      ))}
      <div className="add-btn w-full text-left">
        <div className="bg-shadow-blue px-7 py-4 rounded-full w-24">
          <Add
            onClick={openModal}
            className=" text-white"
            size={"40px"}
            type="button"
          />
        </div>
      </div>
    </div>
  );

}

export function Fields<T>({
  name,
  fields,
  onChange,
  defaultValues = [],
  allowEdit = true,
  onErrors
}: FieldProps<T>) {
  return (
    <MultipleGroupFields<T>
      fields={fields}
      name={name}
      onChange={onChange}
      defaultValues={defaultValues}
      allowEdit={allowEdit}
      onErrors={onErrors ?? ((errors) => errors.forEach((error) => newNotification(error, "error")))}
    />
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
  onChange?: (data:  Social[]) => void;
  defaultValues?: Social[];
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
    <Fields<Social>
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
  onChange?: (data: Project[]) => void;
  defaultValues?: Project[];
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
    <Fields<Project>
      fields={fields}
      name="Project"
      onChange={onChange}
      defaultValues={defaultValues}
    />
  );
}
