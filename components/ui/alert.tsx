import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";
import { useEffect } from "react";

type AlertType = "success" | "error" | "warning" | "info";

interface AlertProps {
  type: AlertType;
  message: string;
  onClose: () => void;
  duration?: number;
}

export const Alert = ({
  type,
  message,
  onClose,
  duration = 5000,
}: AlertProps) => {
  useEffect(() => {
    if (duration && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const alertStyles = {
    success: "bg-green-50 border-green-500 text-green-800",
    error: "bg-red-50 border-red-500 text-red-800",
    warning: "bg-yellow-50 border-yellow-500 text-yellow-800",
    info: "bg-blue-50 border-blue-500 text-blue-800",
  };

  const icons = {
    success: <CheckCircle2 className="h-5 w-5 text-green-600" />,
    error: <AlertCircle className="h-5 w-5 text-red-600" />,
    warning: <AlertCircle className="h-5 w-5 text-yellow-600" />,
    info: <Info className="h-5 w-5 text-blue-600" />,
  };

  return (
    <div className={`animate-slide-in fixed top-4 right-4 z-50`}>
      <div
        className={`flex items-start gap-3 rounded-lg border-2 p-4 shadow-lg ${alertStyles[type]} max-w-md`}
      >
        {icons[type]}
        <div className="flex-1">
          <p className="font-medium">{message}</p>
        </div>
        <button
          onClick={onClose}
          className="ml-2 rounded-md p-1 transition-colors hover:bg-black/10"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};
