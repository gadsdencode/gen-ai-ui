import { CopilotKit } from "@copilotkit/react-core"
import { ChatInterface } from "./components/chat-interface"
import "./index.css"

function App() {
  return (
    <CopilotKit>
      <div className="min-h-screen bg-background text-foreground">
        <ChatInterface />
      </div>
    </CopilotKit>
  )
}

export default App
