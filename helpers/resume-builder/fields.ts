import { CustomLabelProps, IconProps } from "@/components/forms/inputs"


export type CustomFieldProp = {
    name: string
    type?: HTMLInputElement['type'] | 'textarea',
    placeholder?: string,
    label?: string | CustomLabelProps,
    id?: string,
    icon?: IconProps
};

export const fields: CustomFieldProp[] = [
    {
        name: "name", 
        placeholder: "John Doe",
        label: "Name",
    }, 
    {
        name: 'dob',
        type: 'date',
        label: 'Date of Birth',
    }, 
    {
        name: 'email', 
        type: 'email',
        label: 'Email',
    },
    {
        name: 'role',
        placeholder: 'Software Engineer',
        label: 'Role',
    }, 
    {
        name: 'targetCompany',
        placeholder: 'Google',
        label: 'Company (Targeted Company your resume is for)',
    },
    {
        name: 'skills', 
        placeholder: 'React, Node, TypeScript',
        label: 'Skills (comma separated)',
    }, 
    {
        name: 'description',
        type: 'textarea',
        placeholder: 'A brief description about yourself',
        label: 'Description',
    },
    {
        name: 'location',
        placeholder: 'Lagos, Nigeria',
        label: 'Location',
    },

    
]