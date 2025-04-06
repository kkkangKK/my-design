"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/components/ui/use-toast";
import { UseElementStore } from "@/stores/element";
import { useSocketStore } from "@/stores/socket";
import { useUserStore } from "@/stores/user";
import { generateRoomCode } from "@/utils/others/generateRoomCode"; // 辅助函数生成合规房间码
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const roomSchema = z.object({
  code: z
    .string()
    .length(8, "房间号必须为8位字符")
    .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8}$/, "必须包含字母和数字"),
});

export function RoomDialog({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"create" | "join">();
  const [isInRoom, setIsInRoom] = useState(false);
  const [roomCode, setRoomCode] = useState("");
  const { socket, connect, disconnect } = useSocketStore();
  const { userId } = useUserStore();
  const { setPageBackgroundStyle, setElements, setCurrentElement } = UseElementStore();

  const form = useForm<z.infer<typeof roomSchema>>({
    resolver: zodResolver(roomSchema),
    defaultValues: { code: "" },
  });

  // 对话框关闭时重置状态
  useEffect(() => {
    if (!open) {
      setMode(undefined);
      form.reset();
    }
  }, [open]);

  // 加入房间逻辑
  const handleJoin = (values: z.infer<typeof roomSchema>) => {
    const newSocket = connect();
    if (newSocket) {
      mode === "join"
        ? newSocket.emit("joinRoom", { roomId: values.code, userId, mode })
        : newSocket.emit("joinRoom", {
            roomId: values.code,
            userId,
            mode,
            elements: UseElementStore.getState().Elements,
            pageBackgroundStyle: UseElementStore.getState().pageBackgroundStyle,
          });
      newSocket.on("notRoom", () => {
        toast({
          variant: "destructive",
          title: "Error",
          description: "不存在此房间",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      });
      newSocket.on("successInRoom", (roomId: string) => {
        toast({
          variant: "success",
          title: "Success",
          description: "You have joined the room: " + roomId,
        });
        setIsInRoom(true);
        setRoomCode(roomId);
      });
      newSocket.on("collaboratorJoined", (userName: any) => {
        toast({
          title: "Tips",
          description: "Collaborator joined: " + userName,
        });
      });
      newSocket.on("collaboratorLeft", (userName: any) => {
        toast({
          title: "Tips",
          description: "Collaborator Left: " + userName,
        });
      });
      if (mode === "join") {
        newSocket.on("roomSnapshot", (body: any) => {
          setElements(body.elements);
          setPageBackgroundStyle(body.pageBackgroundStyle);
          //解决当加入房间时已有元素存在但无法resize的问题，
          if (body.elements.length > 0) {
            setCurrentElement(body.elements[0].id);
          }
        });
      }
      setOpen(false);
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to connect. Please check your internet connection and try again.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
      setIsInRoom(false);
      setRoomCode("");
    }
  };

  // 退出房间逻辑
  const handleLeave = () => {
    if (socket) {
      socket.emit("leaveRoom", { roomId: roomCode, userId });
      disconnect();
    }
    setIsInRoom(false);
    setRoomCode("");
    setOpen(false);
  };

  // 自动生成合规房间代码
  const handleGenerateCode = () => {
    const code = generateRoomCode();
    form.setValue("code", code);
  };

  useEffect(() => {
    return () => {
      if (socket) {
        disconnect();
      }
    };
  }, []); // 空依赖数组表示只在组件卸载时执行

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {isInRoom ? (
              <>
                <span>协作房间：</span>
                <span className="font-mono text-blue-600">{roomCode}</span>
              </>
            ) : (
              "房间管理"
            )}
          </DialogTitle>
        </DialogHeader>

        {isInRoom ? (
          <div className="flex flex-col gap-4 py-4">
            <Button
              onClick={() => handleLeave()}
              className="h-12 text-lg bg-red-500 hover:bg-red-600"
            >
              退出协作房间
            </Button>
          </div>
        ) : (
          <>
            {!mode ? (
              <div className="flex flex-col gap-4 py-4">
                <Button
                  onClick={() => setMode("create")}
                  className="h-12 text-lg"
                >
                  创建新房间
                </Button>
                <Button
                  onClick={() => setMode("join")}
                  className="h-12 text-lg"
                  variant="outline"
                >
                  加入已有房间
                </Button>
              </div>
            ) : (
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(handleJoin)}
                  className="space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="code"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {mode === "create" ? "自定义房间代码" : "输入房间代码"}
                          {mode === "create" && (
                            <Button
                              type="button"
                              variant="link"
                              className="ml-2 h-auto p-0"
                              onClick={handleGenerateCode}
                            >
                              随机生成
                            </Button>
                          )}
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder={`输入8位${mode === "create" ? "新建" : "已有"}房间代码`}
                            {...field}
                            autoComplete="off"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex justify-end gap-2">
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => {
                        setMode(undefined);
                        form.reset();
                      }}
                    >
                      返回
                    </Button>
                    <Button type="submit">{mode === "create" ? "创建" : "加入"}</Button>
                  </div>
                </form>
              </Form>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default RoomDialog;
