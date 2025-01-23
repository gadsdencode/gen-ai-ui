import { useState } from 'react'
import { Virtuoso } from 'react-virtuoso'
import { ChatMessage } from './ui/chat-message'
import { CopilotTextarea } from "@copilotkit/react-ui"
import { useCopilotChat } from "@copilotkit/react-core"

export function ChatInterface() {
  const [messages, setMessages] = useState<Array<{ content: string; isAi: boolean }>>([])
  const { submitMessage, isLoading } = useCopilotChat({
    onResponse: (response) => {
      setMessages(prev => [...prev, { content: response, isAi: true }])
    }
  })

  const handleSubmit = async (message: string) => {
    setMessages(prev => [...prev, { content: message, isAi: false }])
    await submitMessage(message)
  }

  return (
    <div className="flex h-screen flex-col">
      <div className="flex-1 overflow-hidden">
        <Virtuoso
          data={messages}
          totalCount={messages.length}
          itemContent={(index, message) => (
            <ChatMessage
              key={index}
              content={message.content}
              isAi={message.isAi}
            />
          )}
          followOutput="smooth"
        />
      </div>
      <div className="border-t p-4">
        <CopilotTextarea
          className="w-full resize-none rounded-lg border p-2"
          placeholder="Type a message..."
          onSubmit={handleSubmit}
          disabled={isLoading}
        />
      </div>
    </div>
  )
}
