import Message from "@/components/Message.vue";
import { createApp } from "vue";
export type MessageType = "success" | "error" | "default";

export  const createMessage = (
  message: string,
  type: MessageType,
  timeout: number = 2000
) => {
  const instance = createApp(Message, {
    message,
    type,
  });
  const node = document.createElement("div");
  document.body.appendChild(node);
  instance.mount(node);
  setTimeout(() => {
     instance.unmount();
     document.body.removeChild(node); 
  }, timeout);
};
