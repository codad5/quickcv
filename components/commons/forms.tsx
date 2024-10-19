"use client";
import { BasicResumeInfo } from "@/app/actions";
import { Briefcase, Link1, Profile, Send2, Setting2, Teacher } from "iconsax-react";
import { useEffect, useState } from "react";


function InfoSection({ resumeInfo = null, handleInfoInputChange }: { resumeInfo: BasicResumeInfo | null, handleInfoInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void }) {
    const [info, setInfo] = useState<BasicResumeInfo | null>(resumeInfo);
    useEffect(() => {
      handleInfoInputChange
    }, [info]);
    return (
        <div className="w-full flex flex-col">
            <div className="form-tab w-full">
                Info
            </div>
        </div>
    )
}

function SocialSection() {
    return (
        <div className="w-full flex flex-col">
            <div className="form-tab w-full">
                Social
            </div>
        </div>
    )
}

export default function Forms() {
  const [resumeInfo, setResumeInfo] = useState<BasicResumeInfo | null>(null);
  const [activeTab, setActiveTab] = useState(0);
  const tabs = [
    // info, social, education, experience, project
    {
      icon: Profile,
      text: "Info",
      component: InfoSection,
    },
    {
      icon: Link1,
      text: "Social",
      component: SocialSection,
    },
    {
      icon: Teacher,
      text: "Edu",
      component: SocialSection,
    },
    {
      icon: Briefcase,
      text: "Exp",
      component: SocialSection,
    },
    {
      icon: Setting2,
      text: "Proj",
      component: SocialSection,
    },
  ];

  const handleInfoInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (!name) return;
    console.log(name, value, resumeInfo, "name and value from input change");
    setResumeInfo((prev) => ({ ...prev, [name]: value } as BasicResumeInfo));
  };

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
      <div className="form-tab-content w-full">
          {
          }
      </div>
    </div>
  );
}