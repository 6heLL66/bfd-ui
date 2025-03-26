import { CheckCircledIcon, CrossCircledIcon, UpdateIcon } from '@radix-ui/react-icons';
import { toast } from 'react-toastify';

// Queue Boost Toasts
export const QueueBoostPendingToast = ({ amount }: { amount: string }) => (
  <div className="flex items-center gap-3">
    <UpdateIcon className="w-5 h-5 text-primary-default animate-spin" />
    <div className="flex flex-col">
      <span className="font-medium">Queueing boost</span>
      <span className="text-sm text-foreground-secondary">
        {amount} BGT
      </span>
    </div>
  </div>
);

export const QueueBoostSuccessToast = ({ amount }: { amount: string }) => (
  <div className="flex items-center gap-3">
    <CheckCircledIcon className="w-5 h-5 text-success" />
    <div className="flex flex-col">
      <span className="font-medium">Boost queued successfully</span>
      <span className="text-sm text-foreground-secondary">
        {amount} BGT added to queue
      </span>
    </div>
  </div>
);

export const QueueBoostErrorToast = () => (
  <div className="flex items-center gap-3">
    <CrossCircledIcon className="w-5 h-5 text-error" />
    <div className="flex flex-col">
      <span className="font-medium">Queue boost failed</span>
      <span className="text-sm text-foreground-secondary">Please try again later</span>
    </div>
  </div>
);

// Cancel Boost Toasts
export const CancelBoostPendingToast = ({ amount }: { amount: string }) => (
  <div className="flex items-center gap-3">
    <UpdateIcon className="w-5 h-5 text-primary-default animate-spin" />
    <div className="flex flex-col">
      <span className="font-medium">Cancelling queued boost</span>
      <span className="text-sm text-foreground-secondary">
        {amount} BGT
      </span>
    </div>
  </div>
);

export const CancelBoostSuccessToast = ({ amount }: { amount: string }) => (
  <div className="flex items-center gap-3">
    <CheckCircledIcon className="w-5 h-5 text-success" />
    <div className="flex flex-col">
      <span className="font-medium">Boost cancelled successfully</span>
      <span className="text-sm text-foreground-secondary">
        {amount} BGT removed from queue
      </span>
    </div>
  </div>
);

export const CancelBoostErrorToast = () => (
  <div className="flex items-center gap-3">
    <CrossCircledIcon className="w-5 h-5 text-error" />
    <div className="flex flex-col">
      <span className="font-medium">Cancel boost failed</span>
      <span className="text-sm text-foreground-secondary">Please try again later</span>
    </div>
  </div>
);

// Activate Boost Toasts
export const ActivateBoostPendingToast = () => (
  <div className="flex items-center gap-3">
    <UpdateIcon className="w-5 h-5 text-primary-default animate-spin" />
    <div className="flex flex-col">
      <span className="font-medium">Activating boost</span>
      <span className="text-sm text-foreground-secondary">
        Confirming your queued boost
      </span>
    </div>
  </div>
);

export const ActivateBoostSuccessToast = ({ amount }: { amount: string }) => (
  <div className="flex items-center gap-3">
    <CheckCircledIcon className="w-5 h-5 text-success" />
    <div className="flex flex-col">
      <span className="font-medium">Boost activated successfully</span>
      <span className="text-sm text-foreground-secondary">
        {amount} BGT boost is now active
      </span>
    </div>
  </div>
);

export const ActivateBoostErrorToast = () => (
  <div className="flex items-center gap-3">
    <CrossCircledIcon className="w-5 h-5 text-error" />
    <div className="flex flex-col">
      <span className="font-medium">Activate boost failed</span>
      <span className="text-sm text-foreground-secondary">Please try again later</span>
    </div>
  </div>
);

// Queue Drop Boost Toasts
export const QueueDropBoostPendingToast = ({ amount }: { amount: string }) => (
  <div className="flex items-center gap-3">
    <UpdateIcon className="w-5 h-5 text-primary-default animate-spin" />
    <div className="flex flex-col">
      <span className="font-medium">Queueing boost drop</span>
      <span className="text-sm text-foreground-secondary">
        {amount} BGT
      </span>
    </div>
  </div>
);

export const QueueDropBoostSuccessToast = ({ amount }: { amount: string }) => (
  <div className="flex items-center gap-3">
    <CheckCircledIcon className="w-5 h-5 text-success" />
    <div className="flex flex-col">
      <span className="font-medium">Boost drop queued successfully</span>
      <span className="text-sm text-foreground-secondary">
        {amount} BGT added to drop queue
      </span>
    </div>
  </div>
);

export const QueueDropBoostErrorToast = () => (
  <div className="flex items-center gap-3">
    <CrossCircledIcon className="w-5 h-5 text-error" />
    <div className="flex flex-col">
      <span className="font-medium">Queue boost drop failed</span>
      <span className="text-sm text-foreground-secondary">Please try again later</span>
    </div>
  </div>
);

// Cancel Drop Boost Toasts
export const CancelDropBoostPendingToast = ({ amount }: { amount: string }) => (
  <div className="flex items-center gap-3">
    <UpdateIcon className="w-5 h-5 text-primary-default animate-spin" />
    <div className="flex flex-col">
      <span className="font-medium">Cancelling queued boost drop</span>
      <span className="text-sm text-foreground-secondary">
        {amount} BGT
      </span>
    </div>
  </div>
);

export const CancelDropBoostSuccessToast = ({ amount }: { amount: string }) => (
  <div className="flex items-center gap-3">
    <CheckCircledIcon className="w-5 h-5 text-success" />
    <div className="flex flex-col">
      <span className="font-medium">Boost drop cancelled successfully</span>
      <span className="text-sm text-foreground-secondary">
        {amount} BGT removed from drop queue
      </span>
    </div>
  </div>
);

export const CancelDropBoostErrorToast = () => (
  <div className="flex items-center gap-3">
    <CrossCircledIcon className="w-5 h-5 text-error" />
    <div className="flex flex-col">
      <span className="font-medium">Cancel boost drop failed</span>
      <span className="text-sm text-foreground-secondary">Please try again later</span>
    </div>
  </div>
);

// Drop Boost Toasts
export const DropBoostPendingToast = () => (
  <div className="flex items-center gap-3">
    <UpdateIcon className="w-5 h-5 text-primary-default animate-spin" />
    <div className="flex flex-col">
      <span className="font-medium">Dropping boost</span>
      <span className="text-sm text-foreground-secondary">
        Confirming your boost drop
      </span>
    </div>
  </div>
);

export const DropBoostSuccessToast = ({ amount }: { amount: string }) => (
  <div className="flex items-center gap-3">
    <CheckCircledIcon className="w-5 h-5 text-success" />
    <div className="flex flex-col">
      <span className="font-medium">Boost dropped successfully</span>
      <span className="text-sm text-foreground-secondary">
        {amount} BGT boost removed
      </span>
    </div>
  </div>
);

export const DropBoostErrorToast = () => (
  <div className="flex items-center gap-3">
    <CrossCircledIcon className="w-5 h-5 text-error" />
    <div className="flex flex-col">
      <span className="font-medium">Drop boost failed</span>
      <span className="text-sm text-foreground-secondary">Please try again later</span>
    </div>
  </div>
);

// Helper functions to create toast promises
export const createQueueBoostToast = (promise: Promise<void>, amount: string) => {
  return toast.promise(promise, {
    pending: {
      render() {
        return <QueueBoostPendingToast amount={amount} />;
      },
      icon: false,
    },
    success: {
      render() {
        return <QueueBoostSuccessToast amount={amount} />;
      },
      icon: false,
    },
    error: {
      render() {
        return <QueueBoostErrorToast />;
      },
      icon: false,
    },
  });
};

export const createCancelBoostToast = (promise: Promise<void>, amount: string) => {
  return toast.promise(promise, {
    pending: {
      render() {
        return <CancelBoostPendingToast amount={amount} />;
      },
      icon: false,
    },
    success: {
      render() {
        return <CancelBoostSuccessToast amount={amount} />;
      },
      icon: false,
    },
    error: {
      render() {
        return <CancelBoostErrorToast />;
      },
      icon: false,
    },
  });
};

export const createActivateBoostToast = (promise: Promise<void>, amount: string) => {
  return toast.promise(promise, {
    pending: {
      render() {
        return <ActivateBoostPendingToast />;
      },
      icon: false,
    },
    success: {
      render() {
        return <ActivateBoostSuccessToast amount={amount} />;
      },
      icon: false,
    },
    error: {
      render() {
        return <ActivateBoostErrorToast />;
      },
      icon: false,
    },
  });
};

export const createQueueDropBoostToast = (promise: Promise<void>, amount: string) => {
  return toast.promise(promise, {
    pending: {
      render() {
        return <QueueDropBoostPendingToast amount={amount} />;
      },
      icon: false,
    },
    success: {
      render() {
        return <QueueDropBoostSuccessToast amount={amount} />;
      },
      icon: false,
    },
    error: {
      render() {
        return <QueueDropBoostErrorToast />;
      },
      icon: false,
    },
  });
};

export const createCancelDropBoostToast = (promise: Promise<void>, amount: string) => {
  return toast.promise(promise, {
    pending: {
      render() {
        return <CancelDropBoostPendingToast amount={amount} />;
      },
      icon: false,
    },
    success: {
      render() {
        return <CancelDropBoostSuccessToast amount={amount} />;
      },
      icon: false,
    },
    error: {
      render() {
        return <CancelDropBoostErrorToast />;
      },
      icon: false,
    },
  });
};

export const createDropBoostToast = (promise: Promise<void>, amount: string) => {
  return toast.promise(promise, {
    pending: {
      render() {
        return <DropBoostPendingToast />;
      },
      icon: false,
    },
    success: {
      render() {
        return <DropBoostSuccessToast amount={amount} />;
      },
      icon: false,
    },
    error: {
      render() {
        return <DropBoostErrorToast />;
      },
      icon: false,
    },
  });
};

// Claim All Rewards Toasts
export const ClaimAllRewardsPendingToast = () => (
  <div className="flex items-center gap-3">
    <UpdateIcon className="w-5 h-5 text-primary-default animate-spin" />
    <div className="flex flex-col">
      <span className="font-medium">Claiming rewards</span>
      <span className="text-sm text-foreground-secondary">
        Processing your transaction
      </span>
    </div>
  </div>
);

export const ClaimAllRewardsSuccessToast = () => (
  <div className="flex items-center gap-3">
    <CheckCircledIcon className="w-5 h-5 text-success" />
    <div className="flex flex-col">
      <span className="font-medium">Rewards claimed successfully</span>
      <span className="text-sm text-foreground-secondary">
        All rewards have been claimed
      </span>
    </div>
  </div>
);

export const ClaimAllRewardsErrorToast = () => (
  <div className="flex items-center gap-3">
    <CrossCircledIcon className="w-5 h-5 text-error" />
    <div className="flex flex-col">
      <span className="font-medium">Claim rewards failed</span>
      <span className="text-sm text-foreground-secondary">Please try again later</span>
    </div>
  </div>
);

export const createClaimAllRewardsToast = (promise: Promise<void>) => {
  return toast.promise(promise, {
    pending: {
      render() {
        return <ClaimAllRewardsPendingToast />;
      },
      icon: false,
    },
    success: {
      render() {
        return <ClaimAllRewardsSuccessToast />;
      },
      icon: false,
    },
    error: {
      render() {
        return <ClaimAllRewardsErrorToast />;
      },
      icon: false,
    },
  });
};
