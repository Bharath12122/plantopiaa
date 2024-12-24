import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'support';
  timestamp: Date;
}

export const SupportChat = ({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const { toast } = useToast();

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      content: newMessage,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');

    // Simulate instant support response
    setTimeout(() => {
      const supportMessage: Message = {
        id: crypto.randomUUID(),
        content: "Thank you for reaching out! Our support team will be with you shortly. In the meantime, you can browse our help center for immediate assistance.",
        sender: 'support',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, supportMessage]);
    }, 1000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Priority Support Chat</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col h-[400px]">
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.sender === 'user'
                        ? 'bg-[#2A3B1D] text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <p>{message.content}</p>
                    <span className="text-xs opacity-70">
                      {message.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
          <form onSubmit={handleSendMessage} className="p-4 border-t flex gap-2">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1"
            />
            <Button type="submit" size="icon">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};