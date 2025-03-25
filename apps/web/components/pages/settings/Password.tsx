"use client";

import CustomFormField from "@/components/shared/CustomFormField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { verifyPhone } from "@/http/sms";
import { addPassword, getUserInfo, isHasPassword, updatePassword } from "@/http/user";
import { useUserStore } from "@/stores/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function Account({ className }: Readonly<{ className?: string }>) {
  const t = useTranslations();
  const { toast } = useToast();
  const { userId } = useUserStore();

  const [phoneStep, setPhoneStep] = useState<number>(0); //用于控制表单显示的步骤变化

  const FormSchema = z.object({
    phone: z.string().regex(/^1[3-9]\d{9}$/, {
      message: t("form.phone.invalid"),
    }),
    otp: z.string().regex(/^\d+$/, {
      message: t("form.code.length"),
    }),
    password: z.string(),
  });

  type formSchemaType = z.infer<typeof FormSchema>;

  const form = useForm<formSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      phone: "",
      otp: "",
      password: "",
    },
  });

  const getUserData = useCallback(
    async (userId: string) => {
      try {
        const res = await getUserInfo(userId);
        if (res.data.data) {
          form.setValue("phone", res.data.data.phone);
          form.setValue("otp", "000000");
        }
      } catch (error) {
        toast({
          variant: "destructive",
          title: t("errors.common.serverError"),
          description: t("errors.connection.failed"),
          action: <ToastAction altText="Try again">{t("errors.common.tryAgain")}</ToastAction>,
        });
      }
    },
    [form, toast, t],
  );

  useEffect(() => {
    if (userId) {
      getUserData(userId);
    }
  }, [userId, getUserData]);

  const executePhoneStep = async (step: number) => {
    switch (step) {
      case 1:
        form.setValue("otp", ""); //初始化验证码
        break;
      case 2: {
        const res = await verifyPhone({
          phone: form.getValues("phone"),
          otp: form.getValues("otp"),
        });
        if (res.data.msg === "手机号校验成功") {
          toast({
            variant: "success",
            title: "Success",
            description: res.data.msg,
          });
          setPhoneStep(2);
        } else {
          toast({
            variant: "destructive",
            title: "Error",
            description: res.data.msg,
            action: <ToastAction altText="Try again">Try again</ToastAction>,
          });
          setPhoneStep(1);
          return;
        }
        break;
      }
      case 3: {
        try {
          const res = await isHasPassword();
          if (res.data.data.hasPassword) {
            await updatePassword({
              newPassword: form.getValues("password"),
            });
          } else {
            await addPassword({
              password: form.getValues("password"),
            });
          }
          toast({
            variant: "success",
            title: "Success",
            description: res.data.msg,
          });
        } catch (error) {
          console.error("Error updating password:", error);
          toast({
            variant: "destructive",
            title: "Error",
            description: "Failed to update password.",
            action: <ToastAction altText="Try again">Try again</ToastAction>,
          });
        }
        setPhoneStep(0);
        break;
      }
      default:
        break;
    }
  };

  async function onSubmitPhone(values: formSchemaType) {
    console.log(values);
    setPhoneStep(phoneStep + 1);
    executePhoneStep(phoneStep + 1); //因为setPhoneSteps是异步的，所以还需要直接+1
  }

  return (
    <div className={`h-full flex flex-row justify-between gap-10 ${className}`}>
      <div className="flex-1 flex flex-col justify-start gap-24">
        <div className="flex justify-start items-center">
          <div className="text-[#f43f5e] dark:text-[#d048ef] text-xl card-title">
            {t("change-password")}
          </div>
        </div>
        <div className="flex flex-col justify-start gap-6">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmitPhone)}
              className="sm:w-[40%] mx-auto flex flex-col gap-4"
            >
              <CustomFormField
                form={form}
                name="phone"
                placeholder={t("phonePlaceholder")}
                label={t("phone")}
                disabled={true}
                hidden={phoneStep > 1}
              />

              <CustomFormField
                form={form}
                name="otp"
                placeholder={t("otpPlaceholder")}
                label={t("verification-code")}
                isShowLabel={false}
                isVerify={true}
                hidden={phoneStep !== 1}
              />

              <CustomFormField
                form={form}
                name="password"
                placeholder={t("passwordPlaceholder")}
                label={t("new-password")}
                hidden={phoneStep === 0 || phoneStep === 1}
              />

              <div className="w-full flex gap-4">
                <Button
                  className="btn bg-[#f43f5e] dark:bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:bg-red-600 text-white"
                  type="submit"
                >
                  {phoneStep === 0 ? t("change-password") : t("next-step")}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>

      <div className="flex-1 h-full bg-blue-500/30 rounded-lg"></div>
    </div>
  );
}
