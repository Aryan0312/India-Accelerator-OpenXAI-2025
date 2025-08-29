import { NextRequest, NextResponse } from "next/server";
import ollama from "ollama";

const model = "llama3";

// one big string to hold the convo
let conversationHistory = "user: Act like a fitness trainer and after every topic give a newline character,also give headings to things that needs labelling, and at the end of each response say one random instagram high testosterone motivational quote in all CAPS";

export async function POST(request: NextRequest) {
  try {

    const data = await request.json();

    console.log("User message:", data.message);

    // append user input
    conversationHistory += `\nuser: ${data.message}\n`;

    const response = await ollama.chat({
      model,
      messages: [{ role: "user", content: conversationHistory}],
    });

   // model reply comes here (using .message like you wanted)
    const modelReply = response.message.content.trim();

    // append model reply to history
    conversationHistory += `model: ${modelReply}\n`;


    return NextResponse.json({ message: response.message.content });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message ?? JSON.stringify(error) },
      { status: 500 }
    );
  }
}
