"use client";

import "@/styles/base/search.css";

import { useState } from "react";

import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface BaseSearchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onSearch?: (e: any) => void;
}

const BaseSearch: React.FC<BaseSearchProps> = ({ className, onClick, onSearch, ...rest }) => {
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="search-panels">
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Input
          type="text"
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Email"
          onClick={onClick}
        />
        <Button
          type="submit"
          onClick={() => onSearch?.(inputValue)}
          className="bg-red-400 hover:bg-red-600"
        >
          {/* 搜索 */}
          <span className="icon-[carbon--search] text-lg font-extrabold"></span>
        </Button>
      </div>
    </div>
  );
};

export default BaseSearch;
