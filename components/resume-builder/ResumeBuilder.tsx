"use client";
import { fields } from '../../helpers/resume-builder/fields';
import { Input, TextArea } from '@/components/forms/inputs';
import { PdfSection } from './PdfSection';
import { EducationFields, ExperienceFields, SocialMultipleFields } from '../forms/Extrafields';
import { readStreamableValue } from 'ai/rsc';
import { useEffect, useState } from 'react';
import { BasicResumeInfo, Education, Experience, generateResume } from '../../app/actions';
import { APPToRemember, decrementCreditEvent, ForgetInfo, getRememberInfo, newNotification, RememberInfo } from '@/helpers/commons/client';



export default function ResumeBuilder() {
    const [resumeInfo, setResumeInfo] = useState<BasicResumeInfo | null>(null);
    const [rawContent, setRawContent] = useState<string>("# Heading One (H1)")
    const [generatingState, setGeneratingState] = useState(false)
    const [changeMade, setChangeMade] = useState(false)
    const [rememberMe, setRememberMe] = useState(true)

    useEffect(() => {
        setChangeMade(true)
    }, [resumeInfo])
    
    useEffect(() => {
      const resumeInfo = getRememberInfo<BasicResumeInfo>("resumeInfo");
      if (resumeInfo) {
        setResumeInfo(resumeInfo);
        setRememberMe(true);
      }
    }
    , []);
    
    // set interval to update save data to remember me local storage every 9 seconds
    useEffect(() => {
      const interval = setInterval(() => {
        if (rememberMe && changeMade) {
          RememberInfo("resumeInfo", resumeInfo);
        }
      }, 9000);
      return () => clearInterval(interval);
    }, [resumeInfo, rememberMe]);
    
    useEffect(() => {
      // Listen for credit usage updates
      const handleRememberMeUpdate = (data: {detail : APPToRemember}) => {
        console.log(data, "remember me update");
        return setRememberMe(data.detail.resumeInfo ?? false);
      };

      window.addEventListener("quickcv:rememberMe" as any, handleRememberMeUpdate);

      return () => {
        window.removeEventListener(
          "quickcv:rememberMe" as any,
          handleRememberMeUpdate
        );
      };
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if(!name || !value) return;
        if (value === '') return;
        console.log(name, value, resumeInfo , 'name and value from input change')
        setResumeInfo((prev) => ({ ...prev, [name]: value } as BasicResumeInfo))
        // setRawContent("# Heading One (H2")
    }

    const handleSocalInputChange = (data: any) => {
        console.log(data)
        setResumeInfo((prev) => ({ ...prev, social: data } as BasicResumeInfo));
    }

    const handleEducationChange = (educationData: Education[]) => {
      console.log(educationData, 'education data')
      setResumeInfo((prev) => ({ ...prev, education: educationData } as BasicResumeInfo))
    };
    const handleExperienceChange = (educationData: Experience[]) => {
      console.log(educationData, "education data");
      setResumeInfo((prev) => ({ ...prev, experience: educationData } as BasicResumeInfo))
    };

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
            newNotification('Resume Generated', 'success')
            decrementCreditEvent()
        }catch (error) {
          console.error(error)
          newNotification((error as Error).message, 'error')
        }finally {
            setGeneratingState(false)
            setChangeMade(false)
            console.log('decrementing credit')
            console.log(rememberMe, 'remember me')
            if(rememberMe) {
              console.log('remember me, saving to local storage')
              RememberInfo("resumeInfo", resumeInfo);
            } else {
              ForgetInfo("resumeInfo");
            }
        }
    }
    return (
      <>
        
        <div className="w-full sm:w-1/2 h-full basis-2/5">
          {/* a form that ask for name, gender date of birth , occupation, role, and social hanlde  */}
          <form
            className="flex flex-col items-center justify-center space-y-4 w-full"
            onSubmit={handleSubmit}
          >
            {fields.map((field, index) => {
              return field?.type !== "textarea" ? (
                <Input key={index} {...field} onChange={handleInputChange} value={`${resumeInfo?.[field.name] ?? ""}`} />
              ) : (
                <TextArea key={index} {...field} onChange={handleInputChange} value={`${resumeInfo?.[field.name] ?? ""}`} />
              );
            })}
            <SocialMultipleFields
              onChange={handleSocalInputChange}
              defaultValues={resumeInfo?.social}
            />

            <div className="mb-4">
              <h2 className="text-xl font-semibold mb-2">Education</h2>
              <EducationFields onChange={handleEducationChange}
                defaultValues={resumeInfo?.education}
              />
            </div>

            <div className="mb-4">
              <h2 className="text-xl font-semibold mb-2">Work Experience</h2>
              <ExperienceFields onChange={handleExperienceChange}
                defaultValues={resumeInfo?.experience}
              />
            </div>

            <Input
              type="submit"
              disabled={generatingState}
              value={`${generatingState ? "Loading " : "Submit"}`}
              className={`${
                generatingState ? "bg-green-100" : "bg-green-500"
              } text-white p-2 rounded`}
            />
          </form>
        </div>
        {/* the output tab with bg color white */}
        <PdfSection className="w-full sm:w-1/2 h-svh" documentTitle={resumeInfo?.name ?? 'Quick Cv'}>{rawContent}</PdfSection>
      </>
    );
}