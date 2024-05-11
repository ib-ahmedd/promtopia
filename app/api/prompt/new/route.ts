import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const POST = async (req: Request, res: Response) => {
  const { userId, prompt, tag } = await req.json();
  try {
    await connectToDB();
    const newPrompt = new Prompt({
      creator: userId,
      prompt,
      tag,
    });

    await newPrompt.save();
    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (err) {
    console.log(err);
    return new Response("Failed to create new prompt", { status: 500 });
  }
};
