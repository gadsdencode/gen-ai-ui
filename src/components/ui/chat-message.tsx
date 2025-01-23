import { cn } from "@/lib/utils"
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

interface ChatMessageProps {
  content: string
  isAi?: boolean
  isLoading?: boolean
}

export function ChatMessage({ content, isAi, isLoading }: ChatMessageProps) {
  return (
    <div className={cn(
      "flex w-full items-start gap-4 p-4",
      isAi && "bg-muted/50"
    )}>
      <div className={cn(
        "flex-1 space-y-2 overflow-hidden break-words",
        isLoading && "animate-pulse"
      )}>
        <ReactMarkdown
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || '')
              return !inline && match ? (
                <SyntaxHighlighter
                  style={vscDarkPlus}
                  language={match[1]}
                  PreTag="div"
                  {...props}
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              )
            }
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  )
}
