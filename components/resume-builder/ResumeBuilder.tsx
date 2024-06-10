"use client";
import { CustomFieldProp, fields } from '../../helpers/resume-builder/fields';
import { Input, TextArea } from '@/components/forms/inputs';
import { PdfSection } from './PdfSection';
import { MultipleFields } from '../forms/Extrafields';
import { readStreamableValue } from 'ai/rsc';
import { useEffect, useState } from 'react';
import { BasicResumeInfo, generateResume } from '../../app/actions';

export default function ResumeBuilder() {
    const [resumeInfo, setResumeInfo] = useState<BasicResumeInfo | null>(null);
    const [rawContent, setRawContent] = useState<string>("# Heading One (H1)")
    const [generatingState, setGeneratingState] = useState(false)
    const [changeMade, setChangeMade] = useState(false)

    useEffect(() => {
        setChangeMade(true)
    }, [resumeInfo])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if(!name || !value) return;
        if (value === '') return;
        console.log(name, value, resumeInfo , 'name and value from input change')
        setResumeInfo((prev) => ({ ...prev, [name]: value } as BasicResumeInfo))
        // setRawContent("# Heading One (H2")
    }

    const handleSocalInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if(!name || !value) return;
        if (value === '') return;
        console.log(name, value, resumeInfo , 'name and value from input change')
        setResumeInfo((prev) => ({ ...prev, social: { ...prev?.social, [name]: value } } as BasicResumeInfo))
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            console.log('submitting form')
            e.preventDefault();
            if(!changeMade) throw new Error('No change made')
            if(generatingState) throw new Error("Task in place , please wait")
            if (!resumeInfo) throw new Error('No resume info provided');
            const message: BasicResumeInfo = {
                ...resumeInfo,
                name: resumeInfo.name,
                email: resumeInfo.email,
                role: resumeInfo.role,
            }

            // if message.name , role, email is empty or undefined return
            if (!message.name || !message.role || !message.email) throw new Error('Name, role and email are required');
            if (message.name === '' || message.role === '' || message.email === '')  throw new Error('Name, role and email are required');
            setGeneratingState(true)
            const result = await generateResume(message);
            if (result.status === 'error') throw new Error(result.message);
            for await (const value of readStreamableValue(result.message)) {
                console.log(value);
                if(!value) return;
                setRawContent(value as string)
            }
            
        }catch (error) {
            console.error(error)
        }finally {
            setGeneratingState(false)
            setChangeMade(false)
        }
    }
    return (
        <>
            <div className='w-full sm:w-1/2 h-full basis-2/5'>
                {/* a form that ask for name, gender date of birth , occupation, role, and social hanlde  */}
                <form className="flex flex-col items-center justify-center space-y-4 w-full" onSubmit={handleSubmit}>
                {
                    fields.map((field, index) => {
                    return field?.type !== 'textarea' ? <Input key={index} {...field} onChange={handleInputChange} /> :  <TextArea key={index} {...field} onChange={handleInputChange} />
                    })
                }
                <MultipleFields onChange={handleSocalInputChange} />
                <Input type="submit" value={`${generatingState ?  'Loading ' : 'Submit'}`} className={`${ generatingState ? 'bg-green-100' : 'bg-green-500'} text-white p-2 rounded`}/>
                </form>
            </div>
            {/* the output tab with bg color white */}
            <PdfSection className="w-full sm:w-1/2 h-svh">
                {rawContent}
            </PdfSection>
        </>
    )
}