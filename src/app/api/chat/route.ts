import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

const SYSTEM_PROMPT = `You are the XanTerm AI Assistant - a helpful analytics assistant for the Xandeum pNode network.

About Xandeum:
- Xandeum is building a scalable storage layer for Solana dApps
- It's like a second tier of Solana accounts that can grow to exabytes
- This lives on its own network of storage provider nodes called pNodes

Your role:
- Help users understand pNode data and metrics
- Answer questions about node performance, status, and health
- Provide insights about the network
- Explain what metrics mean (uptime, performance score, latency, storage)
- Help users find specific nodes or compare them
- Give recommendations on which nodes to watch

Key metrics you should know:
- Status: online, offline, or delinquent
- Performance Score: 0-100, higher is better
- Uptime: percentage of time the node has been online
- Latency: response time in milliseconds, lower is better
- Storage Capacity: total storage the node provides
- Storage Used: how much storage is currently in use

Be concise, helpful, and data-focused. When given pNode data context, use it to provide specific insights.
If asked to do something outside your scope (like modifying data), politely explain you're an analytics assistant.`

export async function POST(request: NextRequest) {
  try {
    const { message, pnodeContext } = await request.json()

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 })
    }

    // Build context-aware prompt
    let contextPrompt = SYSTEM_PROMPT

    if (pnodeContext) {
      contextPrompt += `\n\nCurrent Network Data Context:\n${pnodeContext}`
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: contextPrompt },
        { role: 'user', content: message }
      ],
      max_tokens: 500,
      temperature: 0.7,
    })

    const response = completion.choices[0]?.message?.content || 'Sorry, I could not generate a response.'

    return NextResponse.json({ response })
  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      { error: 'Failed to get response from AI' },
      { status: 500 }
    )
  }
}
