require("dotenv").config()
import express from "express"
import cors from "cors"
import OpenAI from "openai"

import { BASE_PROMPT, getSystemPrompt } from "./prompts"

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY
})

const MODEL = "google/gemma-3n-e2b-it:free"

const app = express()
app.use(cors())
app.use(express.json())

app.post("/template", async (req, res) => {
  try {
    const prompt: string = req.body.prompt
    const completion = await openai.chat.completions.create({
      model: MODEL,
      max_tokens: 10,
      messages: [
        {
          role: "system",
          content:
            "Return either node or react based on what you think this project should be. Only return a single word ('node' or 'react'). Do not return anything extra."
        },
        { role: "user", content: prompt }
      ]
    })
    const answer = completion.choices[0].message.content?.trim().toLowerCase()
    if (answer === "react") {
      return res.json({
        prompts: [
          BASE_PROMPT,
          `Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`
        ],
        
      })
    }
    if (answer === "node") {
      return res.json({
        prompts: [
          `Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`
        ],
        
      })
    }
    return res.status(403).json({ message: "You can't access this" })
  } catch {
    res.status(500).json({ error: "Server error" })
  }
})

app.post("/chat", async (req, res) => {
  try {
    const messages = req.body.messages
    const completion = await openai.chat.completions.create({
      model: MODEL,
      max_tokens: 8000,
      messages: [{ role: "system", content: getSystemPrompt() }, ...messages]
    })
    res.json({ response: completion.choices[0].message.content ?? "" })
  } catch {
    res.status(500).json({ error: "Server error" })
  }
})

app.listen(3000)

async function demo() {
  const stream = await openai.chat.completions.create({
    model: MODEL,
    stream: true,
    messages: [
      { role: "system", content: getSystemPrompt() },
      { role: "user", content: "What is the meaning of life?" }
    ]
  })
  for await (const chunk of stream) {
    const delta = chunk.choices?.[0]?.delta?.content
    if (delta) process.stdout.write(delta)
  }
  console.log("\n\n(done)")
}

demo().catch(console.error)
