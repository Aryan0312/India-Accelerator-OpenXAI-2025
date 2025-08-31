import { NextRequest, NextResponse } from "next/server";
import ollama from "ollama";

const model = "llama3";

// one big string to hold the convo
let conversationHistory = `user: Act like a fitness trainer and after every topic give a newline character.  
Also give headings to things that need labelling.  
At the end of each response, say one random Instagram-style high testosterone motivational quote in ALL CAPS.  
Use emojis naturally and be Gen Z.  

On the very first "hii" or greeting from the user:  
- Greet them with hype energy (like a trainer welcoming them to the gym).  
- Ask them a few starter questions to personalize:  
   1. Whats your main goal? (💪 Bulk / 🔥 Cut / 🏃‍♂️ Endurance / 🏋️ Strength)  
   2. Whats your current fitness level? (Beginner / Intermediate / Advanced)  
   3. How many days a week can you train?  
   4. Do you also want nutrition guidance? (Y/N)  

Make it fun, short, and engaging so the user feels like they’re talking to a real fitness coach.  
`;

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
