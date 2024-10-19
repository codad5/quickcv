"use client";
import { BasicResumeInfo, Education, Experience, generateResume } from "@/app/actions";
import { Briefcase, Link1, Profile, Send2, Setting2, Teacher } from "iconsax-react";
import { useCallback, useEffect, useState } from "react";
import { EducationFields, ExperienceFields, ProjectFields, SocialMultipleFields } from "../forms/Extrafields";
import { fields } from "@/helpers/resume-builder/fields";
import { Input, TextArea } from "../forms/inputs";
import { getRememberInfo, RememberInfo, APPToRemember, newNotification, decrementCreditEvent, ForgetInfo } from "@/helpers/commons/client";
import { readStreamableValue } from "ai/rsc";

type TabComponent = (props: { resumeInfo: BasicResumeInfo | null, handleChange: (data: BasicResumeInfo[string]) => void }) => JSX.Element;

type Tab = {
  icon: any;
  text: string;
  component: any;
  handleChange?: (data: BasicResumeInfo[string]) => void;
};


function InfoSection({ resumeInfo = null, handleInfoInputChange }: { resumeInfo: BasicResumeInfo | null, handleInfoInputChange: (data: BasicResumeInfo) => void }) {
  const [info, setInfo] = useState<BasicResumeInfo | null>(resumeInfo);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setInfo((prev) => ({ ...prev, [name]: value } as BasicResumeInfo));
  }

  useEffect(() => {
    if (info) {
      handleInfoInputChange(info);
    }
  }, [info]);

    return (
      <div className="w-full flex flex-col gap-6">
        {/* <div className="form-tab w-full "> */}
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
        {/* </div> */}
      </div>
    );
}

function SocialSection({
  resumeInfo = null,
  handleChange,
} : { resumeInfo: BasicResumeInfo | null, handleChange: (data: BasicResumeInfo["social"]) => void }) {
  return (
    <div className="w-full flex flex-col">
      <SocialMultipleFields
        onChange={handleChange}
        defaultValues={resumeInfo?.social}
      />
    </div>
  );
}

// education, experience, project
function EducationSection({
  resumeInfo = null,
  handleChange,
} : { resumeInfo: BasicResumeInfo | null, handleChange: (data: BasicResumeInfo["education"]) => void }) {
  return (
    <div className="w-full flex flex-col">
      <EducationFields
        onChange={handleChange}
        defaultValues={resumeInfo?.education}
      />
    </div>
  );
}

function ExperienceSection({
  resumeInfo = null,
  handleChange,
} : { resumeInfo: BasicResumeInfo | null, handleChange: (data: BasicResumeInfo["experience"]) => void }) {
  return (
    <div className="w-full flex flex-col">
      <ExperienceFields
        onChange={handleChange}
        defaultValues={resumeInfo?.experience}
      />
    </div>
  );
}

function ProjectSection({
  resumeInfo = null,
  handleChange,
} : { resumeInfo: BasicResumeInfo | null, handleChange: (data: BasicResumeInfo["projects"]) => void }) {
  return (
    <div className="w-full flex flex-col">
      <ProjectFields
        onChange={handleChange}
        defaultValues={resumeInfo?.projects}
      />
    </div>
  );
}


export default function Forms() {
  const [activeTab, setActiveTab] = useState(0);
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!changeMade) throw new Error("No change made");
      await generateResumeContent();
    } catch (error) {
      console.error(error);
      newNotification((error as Error).message, "error");
    }
  };

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
  const tabs: Tab[] = [
    // info, social, education, experience, project
    {
      icon: Profile,
      text: "Info",
      component: InfoSection,
      handleChange: (data: any) => {
        console.log(data);
        setResumeInfo(
          (prev) =>
            ({
              ...prev,
              name: data?.name ?? prev?.name,
              email: data?.email ?? prev?.email,
              role: data?.role ?? prev?.role,
              description: data?.description ?? prev?.description,
              dob: data?.dob ?? prev?.dob,
            } as BasicResumeInfo)
        );
      },
    },
    {
      icon: Link1,
      text: "Social",
      component: SocialSection,
      handleChange: (data: any) => {
        console.log(data);
        setResumeInfo((prev) => ({ ...prev, social: data } as BasicResumeInfo));
      },
    },
    {
      icon: Teacher,
      text: "Edu",
      component: EducationSection,
      handleChange: (data: any) => {
        console.log(data);
        setResumeInfo(
          (prev) => ({ ...prev, education: data } as BasicResumeInfo)
        );
      },
    },
    {
      icon: Briefcase,
      text: "Exp",
      component: ExperienceSection,
      handleChange: (data: any) => {
        console.log(data);
        setResumeInfo(
          (prev) => ({ ...prev, experience: data } as BasicResumeInfo)
        );
      },
    },
    {
      icon: Setting2,
      text: "Proj",
      component: ProjectSection,
      handleChange: (data: any) => {
        console.log(data);
        setResumeInfo(
          (prev) => ({ ...prev, projects: data } as BasicResumeInfo)
        );
      },
    },
  ];

  return (
    <form className="w-full flex flex-col" onSubmit={handleSubmit}>
      <div className="form-tab w-full">
        <div className="w-full rounded-full bg-deep-blue-opacity h-16 flex">
          <div className="tab-nav flex-grow h-full flex justify-evenly items-center">
              {tabs.map((tab, index) => {
                  return (
                    <div
                      key={index}
                      className={`tab-nav-item p-3 md:p-0 md:w-20 md:h-10 flex justify-center gap-2 items-center cursor-pointer rounded-full ${
                        activeTab === index ? "bg-green-light-opacity" : ""
                      }`}
                      onClick={() => setActiveTab(index)}
                    >
                      <tab.icon
                        color={`${
                          activeTab === index ? "#D9D9D9" : "#3DD973"
                        }`}
                        size="24px"
                      />
                      {activeTab === index ? (
                        <div className="tab-nav-item-active hidden md:inline-block">{tab.text}</div>
                      ) : null}
                    </div>
                  );
                  
                  }) 
              }
              
          </div>
          <div className="tab-send-btn h-full flex-shrink-0 w-24 rounded-full bg-progress-green grid place-items-center">
            <button type="submit">
              <Send2 
                color="#fff"
                size="40px"
                type="submit"
              />
            </button>
          </div>
        </div>
      </div>
      <div className="form-tab-content w-full grid place-items-center pt-7">
        {
          tabs.map((tab, index) => {
            return (
              <div key={index} className={`w-full tab-content px-4 ${activeTab === index ? "block" : "hidden"}`}>
                <tab.component resumeInfo={resumeInfo} handleInfoInputChange={tab.handleChange} />
              </div>
            )
          })
        }
      </div>
    </form>
  );
}