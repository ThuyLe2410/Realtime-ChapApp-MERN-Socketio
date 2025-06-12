import { useState, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import type { useSendMessage } from "../types";
import { Image, Send, X } from "lucide-react";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";

type ErrorResponse = {
  message: string;
};

export default function MessageInput() {
  const [text, setText] = useState<string>("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { sendMessage } = useChatStore() as { sendMessage: useSendMessage };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      toast.error("No file selected");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;
    try {
      sendMessage({
        text: text.trim(),
        image: imagePreview,
      });
      // clear form
      setText("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      const err = error as AxiosError<ErrorResponse>;
      toast.error(err.response?.data.message || "send message failed");
    }
  };

  return (
    <div className="p-4 w-full">
      {imagePreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
            />
            <button
              onClick={removeImage}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300
              flex items-center justify-center"
              type="button">
              <X className="size-3" />
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <div className="flex-1 flex gap-2">
          <input
            type="text"
            className="w-full input input-bordered rounded-lg input-sm sm:input-md"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />

          <button type="button" onClick={() => fileInputRef.current?.click()}>
            <Image size={20} />
          </button>

          <button
            type="submit"
            disabled={!text.trim() && !imagePreview}
            className="disabled:opacity-50 disabled:cursor-not-allowed">
            <Send size={22} />
          </button>
        </div>
      </form>
    </div>
  );
}
