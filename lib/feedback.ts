import { useToast } from "@/hooks/use-toast";

export const showError = (
  toast: ReturnType<typeof useToast>["toast"],
  title: string,
  error: any
) => {
  let description = "Une erreur est survenue.";

  if (error?.response?.data?.detail) {
    const detail = error.response.data.detail;

    if (Array.isArray(detail) && detail[0]?.msg) {
     
      description = detail.map((d: any) => d.msg).join(", ");
    } else if (typeof detail === "string") {
      
      description = detail;
    }
  } else if (error?.response?.data?.message) {
    description = error.response.data.message;
  } else if (error?.message) {
    description = error.message;
  }

  toast({
    title,
    description,
    variant: "destructive",
  });
};

export const showSuccess = (
  toast: ReturnType<typeof useToast>["toast"],
  title: string,
  description: string
) => {
  toast({
    title,
    description,
    variant: "default",
  });
};
