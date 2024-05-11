import { SecondArg } from "@app/types";
import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const GET = async (request: Request, { params }: SecondArg) => {
  try {
    await connectToDB();

    const prompts = await Prompt.findById(params.id).populate("creator");

    if (!prompts) return new Response("Prompt not found", { status: 404 });

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
};

export const PATCH = async (request: Request, { params }: SecondArg) => {
  const { prompt, tag } = await request.json();

  try {
    await connectToDB();

    const existingPrompt: ExistingPrompt | null = await Prompt.findById(
      params.id
    );

    if (!existingPrompt)
      return new Response("Prompt not found", { status: 404 });

    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;

    await existingPrompt.save();

    return new Response(JSON.stringify(existingPrompt), { status: 200 });
  } catch (err) {
    return new Response("Failed to update prompt", { status: 500 });
  }
};

export const DELETE = async (request: Request, { params }: SecondArg) => {
  try {
    await connectToDB();
    await Prompt.findByIdAndDelete(params.id);

    return new Response("Prompt deleted successfully", { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response("Failed to delete prompt", { status: 500 });
  }
};

type ExistingPrompt = {
  prompt: string;
  tag: string;
  save(): Promise<void>;
};
