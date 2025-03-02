import { CrossCircledIcon } from "@radix-ui/react-icons";

import { CheckCircledIcon, UpdateIcon } from "@radix-ui/react-icons";
import { toast } from "react-toastify";

export const PendingToast = ({
  token1Amount,
  token1Symbol,
  token2Symbol,
}: {
  token1Amount: string;
  token1Symbol: string;
  token2Symbol: string;
}) => (
  <div className="flex items-center gap-3">
    <UpdateIcon className="w-5 h-5 text-primary-default animate-spin" />
    <div className="flex flex-col">
      <span className="font-medium">Swapping tokens</span>
      <span className="text-sm text-foreground-secondary">
        {token1Amount} {token1Symbol} → {token2Symbol}
      </span>
    </div>
  </div>
);

export const SuccessToast = ({
  token2Amount,
  token2Symbol,
}: {
  token2Amount: string;
  token2Symbol: string;
}) => (
  <div className="flex items-center gap-3">
    <CheckCircledIcon className="w-5 h-5 text-success" />
    <div className="flex flex-col">
      <span className="font-medium">Swap successful</span>
      <span className="text-sm text-foreground-secondary">
        Received {token2Amount} {token2Symbol}
      </span>
    </div>
  </div>
);

export const ErrorToast = () => (
  <div className="flex items-center gap-3">
    <CrossCircledIcon className="w-5 h-5 text-error" />
    <div className="flex flex-col">
      <span className="font-medium">Swap failed</span>
      <span className="text-sm text-foreground-secondary">
        Please try again later
      </span>
    </div>
  </div>
);

export const createSwapToast = (promise: Promise<void>, token1Amount: string, token1Symbol: string, token2Symbol: string, token2Amount: string) => {
  return toast.promise(promise, {
    pending: { render: () => <PendingToast token1Amount={token1Amount} token1Symbol={token1Symbol} token2Symbol={token2Symbol} />, icon: false },
    success: { render: () => <SuccessToast token2Amount={token2Amount} token2Symbol={token2Symbol} />, icon: false },
    error: { render: () => <ErrorToast />, icon: false },
  });
};

export const createApproveToast = (promise: Promise<void>, token1Symbol: string, amount: string, infinite: boolean) => {
    return toast.promise(promise, {
        pending: {
          render() {
            return (
              <div className="flex items-center gap-3">
                <UpdateIcon className="w-5 h-5 text-primary-default animate-spin" />
                <div className="flex flex-col">
                  <span className="font-medium">Approving {token1Symbol}</span>
                  <span className="text-sm text-foreground-secondary">
                    {infinite
                      ? "Infinite approval"
                      : `Amount: ${amount}`}
                  </span>
                </div>
              </div>
            );
          },
          icon: false,
        },
        success: {
          render() {
            return (
              <div className="flex items-center gap-3">
                <CheckCircledIcon className="w-5 h-5 text-success" />
                <div className="flex flex-col">
                  <span className="font-medium">Approval successful</span>
                  <span className="text-sm text-foreground-secondary">
                    You can now swap {token1Symbol}
                  </span>
                </div>
              </div>
            );
          },
          icon: false,
        },
        error: {
          render() {
            return (
              <div className="flex items-center gap-3">
                <CrossCircledIcon className="w-5 h-5 text-error" />
                <div className="flex flex-col">
                  <span className="font-medium">Approval failed</span>
                  <span className="text-sm text-foreground-secondary">
                    Please try again
                  </span>
                </div>
              </div>
            );
          },
          icon: false,
        },
      });
}
