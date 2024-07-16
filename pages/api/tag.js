// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAIAPI,
});

import fs from "fs";

export default async function handler(req, res) {
  async function main() {
    const transcription = await openai.audio.transcriptions.create({
      file: fs.createReadStream("public/audio-trim.mp3"),
      model: "whisper-1",
      response_format: "srt",
      timestamp_granularities: ["segment"],
    });

    res.status(200).json({ transcriptionJson: transcription });
  }

  main();
  // if (response.status !== 200) {
  //   res.status(response.status).json(response);
  //   return;
  // } else {
  //   const data = await response.json();
  //   const tags = data.choices[0].message.content;
  //   console.log(data.choices[0].message);
  //   res.status(200).json(tags);
  // }
}
