// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import OpenAI, { toFile } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAIAPI,
});

import fs from "fs";
const { Duplex } = require("stream"); // Native Node Module

function bufferToStream(myBuffer) {
  let tmp = new Duplex();
  tmp.push(myBuffer);
  tmp.push(null);
  return tmp;
}
export const config = {
  api: {
    bodyParser: {
      sizeLimit: "100mb",
    },
  },
};
const { Readable } = require("stream");

export default async function handler(req, res) {
  const reqBodyData = await JSON.parse(req.body);
  // // console.log(await bufferToStream(await Buffer(reqBodyData.video.data)));
  // // const stream = typeof reqBodyData.video;
  // console.log(typeof reqBodyData.video);
  // console.log(reqBodyData.video);
  // console.log(await Buffer(await reqBodyData.video));
  async function main() {
    const video = await fetch(reqBodyData.video);

    const transcription = await openai.audio.transcriptions.create({
      file: await toFile(video),
      model: "whisper-1",
      response_format: "srt",
      timestamp_granularities: ["segment"],
    });
    console.log(transcription);
    res.status(200).send(transcription);
  }

  console.log("hi");
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
