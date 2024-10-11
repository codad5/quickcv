"use client";
import { fields } from "../../helpers/resume-builder/fields";
import { Input, TextArea } from "@/components/forms/inputs";
import { PdfSection } from "./PdfSection";
import {
  EducationFields,
  ExperienceFields,
  ProjectFields,
  SocialMultipleFields,
} from "../forms/Extrafields";
import { readStreamableValue } from "ai/rsc";
import { useCallback, useEffect, useState } from "react";
import {
  BasicResumeInfo,
  Education,
  Experience,
  generateResume,
} from "../../app/actions";
import {
  APPToRemember,
  decrementCreditEvent,
  ForgetInfo,
  getRememberInfo,
  newNotification,
  RememberInfo,
} from "@/helpers/commons/client";
import { ArrowDown2, Next, Previous, Repeat, Send2 } from "iconsax-react";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";

export default function ResumeBuilder() {
  const [resumeInfo, setResumeInfo] = useState<BasicResumeInfo | null>(null);
  const [rawContent, setRawContent] = useState<string>("# Heading One (H1)");
  const [generatedContent, setGeneratedContent] = useState<string[]>([]);
  const [currentVersionIndex, setCurrentVersionIndex] = useState(0);
  const [generatingState, setGeneratingState] = useState(false);
  const [changeMade, setChangeMade] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    setChangeMade(true);
  }, [resumeInfo]);

  useEffect(() => {
    const resumeInfo = getRememberInfo<BasicResumeInfo>("resumeInfo");
    if (resumeInfo) {
      setResumeInfo(resumeInfo);
      setRememberMe(true);
    }
  }, []);

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
    const handleRememberMeUpdate = (data: { detail: APPToRemember }) => {
      console.log(data, "remember me update");
      return setRememberMe(data.detail.resumeInfo ?? false);
    };

    window.addEventListener(
      "quickcv:rememberMe" as any,
      handleRememberMeUpdate
    );

    return () => {
      window.removeEventListener(
        "quickcv:rememberMe" as any,
        handleRememberMeUpdate
      );
    };
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (!name) return;
    console.log(name, value, resumeInfo, "name and value from input change");
    setResumeInfo((prev) => ({ ...prev, [name]: value } as BasicResumeInfo));
    // setRawContent("# Heading One (H2");
  };

  const handleSocalInputChange = (data: any) => {
    console.log(data);
    setResumeInfo((prev) => ({ ...prev, social: data } as BasicResumeInfo));
  };

  const handleEducationChange = (educationData: Education[]) => {
    console.log(educationData, "education data");
    setResumeInfo(
      (prev) => ({ ...prev, education: educationData } as BasicResumeInfo)
    );
  };

  const handleExperienceChange = (educationData: Experience[]) => {
    console.log(educationData, "education data");
    setResumeInfo(
      (prev) => ({ ...prev, experience: educationData } as BasicResumeInfo)
    );
  };

  const handleProjectChange = (projectData: any) => {
    console.log(projectData, "project data");
    setResumeInfo(
      (prev) => ({ ...prev, projects: projectData } as BasicResumeInfo)
    );
  };

  const handleSubmit = 
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        if (!changeMade) throw new Error("No change made");
        await generateResumeContent();
      } catch (error) {
        console.error(error);
        newNotification((error as Error).message, "error");
      }
    }

  const handleRetry = useCallback(async () => {
    try {
      await generateResumeContent();
      setRetryCount((prev) => prev + 1);
    } catch (error) {
      console.error(error);
      newNotification((error as Error).message, "error");
    }
  }, [retryCount, resumeInfo]);

  const generateResumeContent = async () => {
    try {
      console.log("submitting form");
      if (generatingState) throw new Error("Task in place, please wait");
      if (!resumeInfo) throw new Error("No resume info provided");
      const message: BasicResumeInfo = {
        ...resumeInfo,
        name: resumeInfo.name,
        email: resumeInfo.email,
        role: resumeInfo.role,
      };

      // if message.name , role, email is empty or undefined return
      if (!message.name || !message.role || !message.email)
        throw new Error("Name, role and email are required");
      if (message.name === "" || message.role === "" || message.email === "")
        throw new Error("Name, role and email are required");
      setGeneratingState(true);
      const result = await generateResume(message, retryCount);
      if (result.status === "error") throw new Error(result.message);
      for await (const value of readStreamableValue(result.message)) {
        console.log(value);
        if (!value) return;
        setRawContent(value as string);
      }
      setGeneratedContent((prev) => [...prev, rawContent]);
      decrementCreditEvent();
      setChangeMade(false);
      newNotification("Resume Generated", "success");
    } catch (error) {
      console.error(error);
      newNotification((error as Error).message, "error");
    } finally {
      setGeneratingState(false);
      console.log("decrementing credit");
      console.log(rememberMe, "remember me");
      if (rememberMe) {
        console.log("remember me, saving to local storage");
        RememberInfo("resumeInfo", resumeInfo);
      } else {
        ForgetInfo("resumeInfo");
      }
    }
  };

  const handleNextVersion = useCallback(() => {
    console.log("next version", generatedContent, currentVersionIndex);
    setRetryCount(0); // Reset retry count
    setCurrentVersionIndex((prev) => prev + 1);
    setRawContent(generatedContent[currentVersionIndex]);
    console.log(generatedContent, currentVersionIndex, "generated content");
  }, [currentVersionIndex, generatedContent]);

  const handlePrevVersion = useCallback(() => {
    setRetryCount(0); // Reset retry count
    setCurrentVersionIndex((prev) => prev - 1);
    setRawContent(generatedContent[currentVersionIndex]);
  }, [currentVersionIndex, generatedContent]);

  return (
    <>
      <div className="w-full sm:w-1/2 h-full basis-2/5">
        {/* a form that ask for name, gender date of birth , occupation, role, and social handle */}
        <form
          className="flex flex-col items-center justify-center space-y-4 w-full"
          onSubmit={handleSubmit}
        >
          <Accordion
            allowZeroExpanded
            className="w-full flex flex-col space-y-4"
            preExpanded={["personal-information"]}
          >
            <AccordionItem className="w-full" uuid="personal-information">
              <AccordionItemHeading className="w-full">
                <AccordionItemButton className="w-full h-12 bg-green-500 text-white flex items-center justify-between px-4">
                  Personal Information <ArrowDown2 />
                </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel className="w-full py-4 space-y-4">
                {fields.map((field, index) => {
                  return field?.type !== "textarea" ? (
                    <Input
                      key={index}
                      {...field}
                      onChange={handleInputChange}
                      value={`${resumeInfo?.[field.name] ?? ""}`}
                    />
                  ) : (
                    <TextArea
                      key={index}
                      {...field}
                      onChange={handleInputChange}
                      value={`${resumeInfo?.[field.name] ?? ""}`}
                    />
                  );
                })}
              </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem className="w-full" uuid="social-information">
              <AccordionItemHeading className="w-full">
                <AccordionItemButton className="w-full h-12 bg-green-500 text-white flex items-center justify-between px-4">
                  Social Information <ArrowDown2 />
                </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel className="w-full py-4">
                <SocialMultipleFields
                  onChange={handleSocalInputChange}
                  defaultValues={resumeInfo?.social}
                />
              </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem className="w-full" uuid="education-information">
              <AccordionItemHeading className="w-full">
                <AccordionItemButton className="w-full h-12 bg-green-500 text-white flex items-center justify-between px-4">
                  Education Information <ArrowDown2 />
                </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel className="w-full py-4">
                <EducationFields
                  onChange={handleEducationChange}
                  defaultValues={resumeInfo?.education}
                />
              </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem className="w-full" uuid="experience-information">
              <AccordionItemHeading className="w-full">
                <AccordionItemButton className="w-full h-12 bg-green-500 text-white flex items-center justify-between px-4">
                  Experience Information <ArrowDown2 />
                </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel className="w-full py-4">
                <ExperienceFields
                  onChange={handleExperienceChange}
                  defaultValues={resumeInfo?.experience}
                />
              </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem className="w-full" uuid="project-information">
              <AccordionItemHeading className="w-full">
                <AccordionItemButton className="w-full h-12 bg-green-500 text-white flex items-center justify-between px-4">
                  Project Information <ArrowDown2 />
                </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel className="w-full py-4">
                <ProjectFields
                  onChange={handleProjectChange}
                  defaultValues={resumeInfo?.projects}
                />
              </AccordionItemPanel>
            </AccordionItem>

            <div className="w-full mb-4">
              <button
                type="submit"
                disabled={generatingState}
                className={`${
                  generatingState ? "bg-green-100" : "bg-green-500"
                } text-white p-2 rounded`}
              >
                {generatingState ? "Loading..." : <Send2 />}
              </button>
            </div>
          </Accordion>
        </form>
      </div>
      <div className="w-full sm:w-1/2 h-svh">
        {/* the output tab with bg color white */}
        <PdfSection
          className="w-full"
          documentTitle={resumeInfo?.name ?? "Quick Cv"}
        >
          {rawContent}
        </PdfSection>
        <div className="flex space-x-4">
          <button
            onClick={handlePrevVersion}
            disabled={currentVersionIndex <= 0}
            className="text-white bg-blue-500 px-4 py-2 rounded"
          >
            <Previous />
          </button>
          <button
            onClick={handleNextVersion}
            disabled={currentVersionIndex >= generatedContent.length - 1}
            className="text-white bg-blue-500 px-4 py-2 rounded"
          >
            <Next />
          </button>
          <button
            onClick={handleRetry}
            className={`text-white px-4 py-2 rounded ${
              generatingState
                ? "opacity-50 cursor-not-allowed bg-green-100"
                : "bg-green-500"
            }`}
          >
            {generatedContent.length === 0 ? <Send2 /> : <Repeat />}
          </button>
        </div>
      </div>
    </>
  );
}
