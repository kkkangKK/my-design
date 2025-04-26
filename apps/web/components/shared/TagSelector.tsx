"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";

interface TagSelectorProps {
  value: string[];
  onChange: (tags: string[]) => void;
}

const presetTags = ["青春", "校园", "招聘", "结婚", "其他"];

export function TagSelector({ value, onChange }: TagSelectorProps) {
  const [selectedTags, setSelectedTags] = useState<string[]>(value);
  const [inputValue, setInputValue] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setSelectedTags(value);
  }, [value]);

  const handleTagClick = (tag: string) => {
    const newTags = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag];
    setSelectedTags(newTags);
  };

  const handleAddCustomTag = () => {
    if (inputValue.trim() && !selectedTags.includes(inputValue.trim())) {
      const newTags = [...selectedTags, inputValue.trim()];
      setSelectedTags(newTags);
      setInputValue("");
    }
  };

  const handleConfirm = () => {
    onChange(selectedTags);
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className={`w-full ${value.length > 0 ? "bg-red-400 text-white" : ""} hover:bg-red-500`}
        >
          {value.length > 0 ? `已选 ${value.length} 个标签` : "选择标签"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>选择作品标签</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4">
          <div className="flex flex-wrap gap-2">
            {presetTags.map((tag) => (
              <Button
                key={tag}
                variant={selectedTags.includes(tag) ? "default" : "outline"}
                className={
                  selectedTags.includes(tag)
                    ? "bg-red-400 text-white hover:bg-red-500"
                    : "hover:bg-red-500"
                }
                onClick={() => handleTagClick(tag)}
              >
                {tag}
              </Button>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="输入自定义标签"
              className="flex-1 px-3 py-2 border rounded"
            />
            <Button
              onClick={handleAddCustomTag}
              className="bg-red-400 text-white hover:bg-red-500"
            >
              添加
            </Button>
          </div>
          {selectedTags.length > 0 && (
            <div className="mt-2">
              <h4 className="text-sm font-medium mb-2">已选标签:</h4>
              <div className="flex flex-wrap gap-2">
                {selectedTags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-100 rounded-full text-sm flex items-center gap-1"
                  >
                    {tag}
                    <button
                      onClick={() => handleTagClick(tag)}
                      className="text-gray-500 hover:text-red-500"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="flex justify-end gap-2">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
          >
            取消
          </Button>
          <Button
            onClick={handleConfirm}
            className="bg-red-400 text-white hover:bg-red-500"
          >
            确认
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
