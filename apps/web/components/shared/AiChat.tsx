"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { aiChat } from "@/http/ai";
import { BrainCircuit, Loader2, Send, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function AIChatWidget() {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [deepMode, setDeepMode] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 自动滚动到底部
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => scrollToBottom(), [messages]);

  // 提交消息处理
  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    try {
      setIsLoading(true);
      const userMessage: Message = { role: "user", content: input };

      // 立即显示用户消息
      setMessages((prev) => [...prev, userMessage]);
      setInput("");

      // 调用接口
      const response = await aiChat({
        deepMode,
        messages: [...messages, userMessage],
      });

      // 添加AI回复
      setMessages((prev) => [...prev, { role: "assistant", content: response.data.data.content }]);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "请求失败",
        description: error.response?.data?.message || "服务暂不可用",
      });
      // 回滚用户消息
      setMessages((prev) => prev.slice(0, -1));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* 浮动触发按钮 */}
      <div className="fixed bottom-8 right-8 z-50">
        <button
          className="rounded-full h-14 w-14 shadow-lg animate-bounce bg-red-400 dark:bg-[#8155d0]"
          onClick={() => setOpen(true)}
        >
          <BrainCircuit className="h-6 w-6 mx-auto my-auto" />
        </button>
      </div>

      {/* 聊天对话框 */}
      <Dialog
        open={open}
        onOpenChange={setOpen}
      >
        <DialogContent className="max-w-md h-[600px] flex flex-col p-0">
          <DialogHeader className="px-6 pt-6 pb-4 border-b">
            <div className="flex items-center justify-between">
              <DialogTitle className="flex items-center gap-2">
                <BrainCircuit className="h-5 w-5" />
                DeepSeek AI
              </DialogTitle>
              <div className="flex items-center gap-2">
                <div className="flex items-center space-x-2 mr-3">
                  <Label htmlFor="deep-mode">深度推理</Label>
                  <Switch
                    id="deep-mode"
                    checked={deepMode}
                    onCheckedChange={setDeepMode}
                    disabled={isLoading}
                  />
                </div>
              </div>
            </div>
          </DialogHeader>

          {/* 聊天消息区域 */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg transition-all ${
                    message.role === "user" ? "bg-[#eff6ff] text-primary-foreground" : "bg-muted"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-muted p-3 rounded-lg">
                  <Loader2 className="h-4 w-4 animate-spin" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* 输入区域 */}
          <form
            onSubmit={handleSubmit}
            className="p-4 border-t"
          >
            <div className="flex gap-2">
              <Input
                value={input}
                className="h-10"
                onChange={(e) => setInput(e.target.value)}
                placeholder="输入消息..."
                disabled={isLoading}
                onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSubmit()}
              />
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-red-400 hover:bg-red-500 dark:bg-[#8155d0] h-10"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
