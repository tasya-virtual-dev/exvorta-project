import { useState, useRef, useEffect } from "react";
import { Bot, X, Send, ChevronDown, User, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export function FloatingAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [message, setMessage] = useState("");
  const [conversation, setConversation] = useState<ChatMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Automatically scroll to the bottom of the chat
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [conversation]);

  const chatMutation = useMutation({
    mutationFn: async ({ message, conversation }: { message: string, conversation: ChatMessage[] }) => {
      // Add the new user message to conversation history
      const updatedConversation = [
        ...conversation,
        { role: "user", content: message }
      ];
      
      const res = await apiRequest("POST", "/api/ai/assistant", { 
        message,
        conversation: updatedConversation 
      });
      
      if (!res.ok) {
        throw new Error('Failed to get AI response');
      }
      
      return await res.json();
    },
    onSuccess: (data) => {
      // Update conversation with both user message and AI response
      const newMessages = [
        ...conversation,
        { role: "user", content: message },
        { role: "assistant", content: data.response }
      ];
      setConversation(newMessages);
    },
    onError: (error: Error) => {
      console.error('Chat error:', error);
      // Add the error as a system message in the conversation
      setConversation([
        ...conversation,
        { role: "user", content: message },
        { 
          role: "assistant", 
          content: "I'm currently experiencing some technical difficulties. Please try again or contact support if the issue persists." 
        }
      ]);
      
      // Also show a toast for immediate feedback
      toast({
        title: "Connection Issue",
        description: "The assistant is having trouble connecting. Your conversation will continue, but some features may be limited.",
        variant: "destructive",
      });
    },
  });

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    chatMutation.mutate({ 
      message, 
      conversation: conversation
    });
    
    setMessage("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleAssistant = () => {
    setIsOpen(!isOpen);
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  // Initial welcome message
  useEffect(() => {
    if (conversation.length === 0) {
      setConversation([
        {
          role: "assistant",
          content: "Hello! I'm your Exvorta Export Assistant. How can I help you with your international trade questions today?"
        }
      ]);
    }
  }, [conversation]);

  return (
    <>
      {/* Assistant Button */}
      {!isOpen && (
        <Button
          onClick={toggleAssistant}
          className="fixed bottom-6 right-6 rounded-full w-14 h-14 p-0 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg z-50"
        >
          <Bot className="h-6 w-6 text-white" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className={`fixed bottom-6 right-6 shadow-xl rounded-xl z-50 overflow-hidden transition-all duration-300 ease-in-out border-0 bg-white flex flex-col ${
          isExpanded ? "w-[450px] h-[80vh]" : "w-[350px] h-[500px]"
        }`}>
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 flex items-center justify-between">
            <div className="flex items-center">
              <div className="flex items-center justify-center bg-white/20 rounded-full h-8 w-8 mr-2">
                <Bot className="h-4 w-4 text-white" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-sm">Export Assistant</h3>
                <p className="text-white/70 text-xs">AI-powered help</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                className="text-white h-7 w-7 hover:bg-white/20"
                onClick={toggleExpand}
              >
                <ChevronDown className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-white h-7 w-7 hover:bg-white/20"
                onClick={toggleAssistant}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
            {conversation.map((msg, index) => (
              <div
                key={index}
                className={`mb-4 flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {msg.role === "assistant" && (
                  <div className="flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-full h-8 w-8 mr-2 flex-shrink-0">
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                )}
                <div
                  className={`max-w-[75%] rounded-xl px-3 py-2 ${
                    msg.role === "user"
                      ? "bg-blue-500 text-white rounded-tr-none"
                      : "bg-white border border-gray-200 shadow-sm rounded-tl-none"
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                </div>
                {msg.role === "user" && (
                  <div className="flex items-center justify-center bg-blue-600 rounded-full h-8 w-8 ml-2 flex-shrink-0">
                    <User className="h-4 w-4 text-white" />
                  </div>
                )}
              </div>
            ))}
            {chatMutation.isPending && (
              <div className="flex items-center space-x-2 text-gray-500 text-sm mb-4">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Assistant is thinking...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-3 border-t border-gray-200 bg-white">
            <div className="flex space-x-2">
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask anything about export..."
                className="resize-none min-h-[40px] max-h-[120px] border-gray-300 focus:border-blue-500 shadow-sm"
                rows={1}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!message.trim() || chatMutation.isPending}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Powered by AI • Your data helps improve the assistant
            </p>
          </div>
        </Card>
      )}
    </>
  );
}