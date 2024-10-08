"use server";

import { createStreamableValue } from "ai/rsc";
import { streamText } from "ai";
import { createOpenAI, openai } from "@ai-sdk/openai";
import { MODELS } from "../helpers/Models";
import { headers } from "next/headers";
import { ResumeGeneratorLimiter } from "@/helpers/rate-limiter";
import { getIp } from "@/helpers/commons/server";
import path from "path";
import { promises as fs } from "fs";

export type Education = {
  degree: string;
  school: string;
  startYear?: string;
  endYear?: string;
  description?: string;
  fieldOfStudy?: string;
};

export type Experience = {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
};

export type Social = {
    platform: string;
    url: string;
};

export type Project = {
    title: string;
    skills: string;
    description: string;
    startDate: string;
    endDate: string;
};

export type BasicResumeInfo = {
  name: string;
  email: string;
  role: string;
  description?: string;
  dob?: string;
  social?: Social[];
  education?: Education[];
  experience?: Experience[];
  projects?: Project[];
  [key: string]: string | object | undefined;
};

export type CustomResponse = {
  status: "error" | "success";
  message: any;
};

const groq = createOpenAI({
  baseURL: "https://api.groq.com/openai/v1",
  apiKey: process.env.GROQ_API_KEY,
});


interface PromptFile {
  fileName: string;
  rank: number;
}

const getPromptFiles = (app: string): PromptFile[] => {
  const promptEnvVars = Object.entries(process.env)
    .filter(([key]) => key.startsWith(app))
    .map(([key, value]): PromptFile => {
      const rank = parseInt(key.split("_").pop() || "0");
      return { fileName: value || "", rank: (isNaN(rank) ? 0 : rank)  + 1 };
    })
    .filter((file) => file.fileName);
  // return with the highest-ranked prompt first where 1 is highest/best 
  console.log(promptEnvVars, "before sort");
  return promptEnvVars.sort((a, b) => b.rank - a.rank).reverse();
};

const selectPromptFile = (promptFiles: PromptFile[], retry: number): string => {
  if (retry === 0 && promptFiles.length > 0) {
    return promptFiles[0].fileName; // Use the highest-ranked prompt for the first attempt
  }
  const randomIndex = Math.floor(Math.random() * promptFiles.length);
  return promptFiles[randomIndex]?.fileName || promptFiles[0].fileName; // Fallback to the first prompt if no others are available
};

export async function generateResume(
  resumeInfo: BasicResumeInfo, 
  retry : number = 0
): Promise<CustomResponse> {
  try {
    const ip = getIp() ?? "localhost";
    const rl = await ResumeGeneratorLimiter.limit(ip);
    if (!rl.success) {
      throw new Error(
        "You have exceeded the rate limit for this action. Please try again later."
      );
    }

    const message = generateResumeInfoMessage(resumeInfo);
    const modelDefinition = MODELS.find((model) => model.provider === "groq");
    if (!modelDefinition) {
      throw new Error("Model not found for groq");
    }
    const modelProvider = modelDefinition.provider === "groq" ? groq : openai;
    const model = modelProvider(modelDefinition.id);

    console.log(message);
    const promptFiles = getPromptFiles("RESUME_SYSTEM_PROMPT");
    const selectedPromptFile = selectPromptFile(promptFiles, retry);
    const promptFilePath = path.join(
      process.cwd(),
      "prompts",
      selectedPromptFile
    );
    console.log(promptFiles);
    console.log(promptFilePath, "selected prompt file path", `for retry ${retry}`);
    const systemPrompt = await fs.readFile(promptFilePath, "utf-8");
    const result = await streamText({
      model,
      prompt: message,
      system: systemPrompt,
    });

    const stream = createStreamableValue(result.textStream);
    return {
      status: "success",
      message: stream.value,
    };
  } catch (error) {
    console.error(error);
    return {
      status: "error",
      message: (error as Error).message,
    };
  }
}

function generateResumeInfoMessage(resumeInfo: BasicResumeInfo): string {
  let message = "Today`s Date is: " + new Date().toDateString() + ". ";

  // Use switch case to handle different keys
  for (const key in resumeInfo) {
    const value = resumeInfo[key];
    if (!value || value.toString().trim() === "") {
      continue;
    }

    switch (key) {
      case "name":
        message += `I am ${value}`;
        break;

      case "email":
        message += `My email is ${value}`;
        break;

      case "dob":
        message += `I was born on ${value}`;
        break;
      
        case "location":
            message += `I am located in ${value}`;
        break;

      case "social":
        message += `You can find my social profiles platforms url(or username): ${JSON.stringify(
          value
        )}`;
        break;

      case "description":
        message += `Here is a brief description about me: ${value}`;
        break;

      case "education":
        message += `Here is my educational background: `;
        (value as Education[]).forEach((edu) => {
          message += `I have a ${edu.degree} from ${edu.school}. `;
          if (edu.fieldOfStudy) message += `I studied ${edu.fieldOfStudy}, `;
          if (edu.startYear) message += `I started in ${edu.startYear}, `;
          if (edu.endYear) message += `and finished in ${edu.endYear}, `;
          if (edu.description) message += `${edu.description}, `;
          message += ". ";
        });
        break;

      case "experience":
        message += `I have experience working at the following companies: `;
        (value as Experience[]).forEach((exp) => {
          message += `I worked at ${exp.company} as a ${exp.position}`;
          if (exp.startDate) message += ` from ${exp.startDate}`;
          if (exp.endDate) message += ` to ${exp.endDate}`;
          if (exp.description)
            message += `Here is a brief description of my role: ${exp.description}`;
          message += ". ";
        });
        break;

      case "role":
        message += `This resume is for the role of ${value}`;
        break;

      case "targetCompany":
        message += `I want this resume to be tailored for a position at ${value}`;
        break;
      
      case "projects":
        message += `Here are some projects I have worked on (some personal or with a team): `;
        (value as Project[]).forEach((project) => {
          message += `I worked on a project titled ${project.title} `;
          if (project.skills) message += `using the following skills: (${project.skills}), `;
          if (project.startDate) message += `I started in ${project.startDate}, `;
          if (project.endDate) message += `and finished in ${project.endDate}, `;
          if (project.description) message += `${project.description}, `;
          message += ". ";
        });
        break;

      default:
        // Stringify and add any other unhandled keys
        message += `For this key "${key}", here is my info: ${JSON.stringify(
          value
        )}`;
        break;
    }
    message += ". ";
  }

  return message;
}
