"use client";
import { BasicResumeInfo } from "@/app/actions";
import { Briefcase, Link1, Profile, Send2, Setting2, Teacher } from "iconsax-react";
import { useEffect, useState } from "react";
import { EducationFields, ExperienceFields, ProjectFields, SocialMultipleFields } from "../forms/Extrafields";
import { fields } from "@/helpers/resume-builder/fields";
import { Input, TextArea } from "../forms/inputs";

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
  const [resumeInfo, setResumeInfo] = useState<BasicResumeInfo | null>(null);
  const [activeTab, setActiveTab] = useState(0);
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
    <div className="w-full flex flex-col">
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
              <Send2 
                  color="#fff"
                  size="40px"
              />
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
    </div>
  );
}