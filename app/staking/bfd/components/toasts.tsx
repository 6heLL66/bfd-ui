import { CheckCircledIcon, CrossCircledIcon } from "@radix-ui/react-icons";

import { UpdateIcon } from "@radix-ui/react-icons";

export const PendingToast = ({ amount, operation }: { amount: string; operation: string }) => {
  return (
    <div className="flex items-center gap-3">
      <UpdateIcon className="w-5 h-5 text-primary-default animate-spin" />
      <div className="flex flex-col">
        <span className="font-medium">{operation} $BFD</span>
        <span className="text-sm text-foreground-secondary">
          {amount} $BFD
        </span>
      </div>
    </div>
  )};
  
  export const SuccessToast = ({ amount, operation }: { amount: string; operation: string }) => (
    <div className="flex items-center gap-3">
      <CheckCircledIcon className="w-5 h-5 text-success" />
      <div className="flex flex-col">
        <span className="font-medium">{operation} successful</span>
        <span className="text-sm text-foreground-secondary">
          {amount} $BFD Staked
        </span>
      </div>
    </div>
  );
  
  export const ErrorToast = ({ operation }: { operation: string }) => (
    <div className="flex items-center gap-3">
      <CrossCircledIcon className="w-5 h-5 text-error" />
      <div className="flex flex-col">
        <span className="font-medium">{operation} failed</span>
        <span className="text-sm text-foreground-secondary">Please try again later</span>
      </div>
    </div>
  );