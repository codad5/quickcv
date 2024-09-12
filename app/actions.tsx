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

export type BasicResumeInfo = {
  name: string;
  email: string;
  role: string;
  description?: string;
  dob?: string;
  social?: Social[];
  education?: Education[];
  experience?: Experience[];
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

export async function generateResume(
  resumeInfo: BasicResumeInfo
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
    const promptFilePath = path.join(
      process.cwd(),
      "prompts",
      process.env.RESUME_SYSTEM_PROMPT ?? 'resume.txt'
    );
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
  let message = "";

  // Use switch case to handle different keys
  for (const key in resumeInfo) {
    const value = resumeInfo[key];
    if (!value || value.toString().trim() === "") {
      continue;
    }

    switch (key) {
      case "name":
        message += `I am ${value}. `;
        break;

      case "email":
        message += `My email is ${value}. `;
        break;

      case "dob":
        message += `I was born on ${value}. `;
        break;
      
        case "location":
            message += `I am located in ${value}. `;
        break;

      case "social":
        message += `You can find my social profiles platforms url(or username): ${JSON.stringify(
          value
        )}. `;
        break;

      case "description":
        message += `Here is a brief description about me: ${value}. `;
        break;

      case "education":
        message += `Here is my educational background: `;
        (value as Education[]).forEach((edu) => {
          message += `I have a ${edu.degree} from ${edu.school}. `;
          if (edu.startYear) message += `I started in ${edu.startYear}. `;
          if (edu.endYear) message += `and finished in ${edu.endYear}. `;
          if (edu.description) message += `${edu.description}. `;
        });
        break;

      case "experience":
        message += `I have experience working at the following companies: `;
        (value as Experience[]).forEach((exp) => {
          message += `I worked at ${exp.company} as a ${exp.position} from ${exp.startDate} to ${exp.endDate}. `;
          if (exp.description)
            message += `My responsibilities included: ${exp.description}. `;
        });
        break;

      case "role":
        message += `This resume is for the role of ${value}. `;
        break;

      case "targetCompany":
        message += `I want this resume to be tailored for a position at ${value}. `;
        break;

      default:
        // Stringify and add any other unhandled keys
        message += `For this key "${key}", here is my info: ${JSON.stringify(
          value
        )}. `;
        break;
    }
  }

  return message;
}
