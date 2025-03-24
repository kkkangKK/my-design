export type AiChatBody = {
  deepMode: boolean;
  messages: Array<{
    role: "user" | "assistant";
    content: string;
  }>;
};

export interface AiChatResponse {
  content: string;
}
