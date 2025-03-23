import { CheckCircledIcon, CrossCircledIcon, UpdateIcon } from '@radix-ui/react-icons';
import { toast } from 'react-toastify';

// Deposit Toasts
export const DepositPendingToast = ({ token1Amount, token1Symbol, token2Amount, token2Symbol }: { token1Amount: string; token1Symbol: string; token2Amount: string; token2Symbol: string }) => (
  <div className="flex items-center gap-3">
    <UpdateIcon className="w-5 h-5 text-primary-default animate-spin" />
    <div className="flex flex-col">
      <span className="font-medium">Depositing liquidity</span>
      <span className="text-sm text-foreground-secondary">
        {token1Amount} {token1Symbol} + {token2Amount} {token2Symbol}
      </span>
    </div>
  </div>
);

export const DepositSuccessToast = ({ token1Amount, token1Symbol, token2Amount, token2Symbol }: { token1Amount: string; token1Symbol: string; token2Amount: string; token2Symbol: string }) => (
  <div className="flex items-center gap-3">
    <CheckCircledIcon className="w-5 h-5 text-success" />
    <div className="flex flex-col">
      <span className="font-medium">Deposit successful</span>
      <span className="text-sm text-foreground-secondary">
        Added {token1Amount} {token1Symbol} + {token2Amount} {token2Symbol}
      </span>
    </div>
  </div>
);

export const DepositErrorToast = () => (
  <div className="flex items-center gap-3">
    <CrossCircledIcon className="w-5 h-5 text-error" />
    <div className="flex flex-col">
      <span className="font-medium">Deposit failed</span>
      <span className="text-sm text-foreground-secondary">Please try again later</span>
    </div>
  </div>
);

// Withdraw Toasts
export const WithdrawPendingToast = ({ percentage, lpTokenAmount }: { percentage: number; lpTokenAmount: string }) => (
  <div className="flex items-center gap-3">
    <UpdateIcon className="w-5 h-5 text-primary-default animate-spin" />
    <div className="flex flex-col">
      <span className="font-medium">Withdrawing liquidity</span>
      <span className="text-sm text-foreground-secondary">
        {percentage}% ({lpTokenAmount} LP Tokens)
      </span>
    </div>
  </div>
);

export const WithdrawSuccessToast = ({ token1Amount, token1Symbol, token2Amount, token2Symbol }: { token1Amount: string; token1Symbol: string; token2Amount: string; token2Symbol: string }) => (
  <div className="flex items-center gap-3">
    <CheckCircledIcon className="w-5 h-5 text-success" />
    <div className="flex flex-col">
      <span className="font-medium">Withdraw successful</span>
      <span className="text-sm text-foreground-secondary">
        Received {token1Amount} {token1Symbol} + {token2Amount} {token2Symbol}
      </span>
    </div>
  </div>
);

export const WithdrawErrorToast = () => (
  <div className="flex items-center gap-3">
    <CrossCircledIcon className="w-5 h-5 text-error" />
    <div className="flex flex-col">
      <span className="font-medium">Withdraw failed</span>
      <span className="text-sm text-foreground-secondary">Please try again later</span>
    </div>
  </div>
);

// Stake Toasts
export const StakePendingToast = ({ amount }: { amount: string }) => (
  <div className="flex items-center gap-3">
    <UpdateIcon className="w-5 h-5 text-primary-default animate-spin" />
    <div className="flex flex-col">
      <span className="font-medium">Staking LP tokens</span>
      <span className="text-sm text-foreground-secondary">
        {amount} LP Tokens
      </span>
    </div>
  </div>
);

export const StakeSuccessToast = ({ amount }: { amount: string }) => (
  <div className="flex items-center gap-3">
    <CheckCircledIcon className="w-5 h-5 text-success" />
    <div className="flex flex-col">
      <span className="font-medium">Stake successful</span>
      <span className="text-sm text-foreground-secondary">
        {amount} LP Tokens staked
      </span>
    </div>
  </div>
);

export const StakeErrorToast = () => (
  <div className="flex items-center gap-3">
    <CrossCircledIcon className="w-5 h-5 text-error" />
    <div className="flex flex-col">
      <span className="font-medium">Stake failed</span>
      <span className="text-sm text-foreground-secondary">Please try again later</span>
    </div>
  </div>
);

// Unstake Toasts
export const UnstakePendingToast = ({ amount }: { amount: string }) => (
  <div className="flex items-center gap-3">
    <UpdateIcon className="w-5 h-5 text-primary-default animate-spin" />
    <div className="flex flex-col">
      <span className="font-medium">Unstaking LP tokens</span>
      <span className="text-sm text-foreground-secondary">
        {amount} LP Tokens
      </span>
    </div>
  </div>
);

export const UnstakeSuccessToast = ({ amount }: { amount: string }) => (
  <div className="flex items-center gap-3">
    <CheckCircledIcon className="w-5 h-5 text-success" />
    <div className="flex flex-col">
      <span className="font-medium">Unstake successful</span>
      <span className="text-sm text-foreground-secondary">
        {amount} LP Tokens unstaked
      </span>
    </div>
  </div>
);

export const UnstakeErrorToast = () => (
  <div className="flex items-center gap-3">
    <CrossCircledIcon className="w-5 h-5 text-error" />
    <div className="flex flex-col">
      <span className="font-medium">Unstake failed</span>
      <span className="text-sm text-foreground-secondary">Please try again later</span>
    </div>
  </div>
);

// Claim BGT Toasts
export const ClaimBGTPendingToast = ({ amount }: { amount: string }) => (
  <div className="flex items-center gap-3">
    <UpdateIcon className="w-5 h-5 text-primary-default animate-spin" />
    <div className="flex flex-col">
      <span className="font-medium">Claiming BGT rewards</span>
      <span className="text-sm text-foreground-secondary">
        {amount} BGT
      </span>
    </div>
  </div>
);

export const ClaimBGTSuccessToast = ({ amount }: { amount: string }) => (
  <div className="flex items-center gap-3">
    <CheckCircledIcon className="w-5 h-5 text-success" />
    <div className="flex flex-col">
      <span className="font-medium">Claim successful</span>
      <span className="text-sm text-foreground-secondary">
        {amount} BGT claimed
      </span>
    </div>
  </div>
);

export const ClaimBGTErrorToast = () => (
  <div className="flex items-center gap-3">
    <CrossCircledIcon className="w-5 h-5 text-error" />
    <div className="flex flex-col">
      <span className="font-medium">Claim failed</span>
      <span className="text-sm text-foreground-secondary">Please try again later</span>
    </div>
  </div>
);

// Helper functions to create toast promises
export const createDepositToast = (
  promise: Promise<void>,
  token1Amount: string,
  token1Symbol: string,
  token2Amount: string,
  token2Symbol: string
) => {
  return toast.promise(promise, {
    pending: {
      render() {
        return <DepositPendingToast token1Amount={token1Amount} token1Symbol={token1Symbol} token2Amount={token2Amount} token2Symbol={token2Symbol} />;
      },
      icon: false,
    },
    success: {
      render() {
        return <DepositSuccessToast token1Amount={token1Amount} token1Symbol={token1Symbol} token2Amount={token2Amount} token2Symbol={token2Symbol} />;
      },
      icon: false,
    },
    error: {
      render() {
        return <DepositErrorToast />;
      },
      icon: false,
    },
  });
};

export const createWithdrawToast = (
  promise: Promise<void>,
  percentage: number,
  lpTokenAmount: string,
  token1Amount: string,
  token1Symbol: string,
  token2Amount: string,
  token2Symbol: string
) => {
  return toast.promise(promise, {
    pending: {
      render() {
        return <WithdrawPendingToast percentage={percentage} lpTokenAmount={lpTokenAmount} />;
      },
      icon: false,
    },
    success: {
      render() {
        return <WithdrawSuccessToast token1Amount={token1Amount} token1Symbol={token1Symbol} token2Amount={token2Amount} token2Symbol={token2Symbol} />;
      },
      icon: false,
    },
    error: {
      render() {
        return <WithdrawErrorToast />;
      },
      icon: false,
    },
  });
};

export const createStakeToast = (promise: Promise<void>, amount: string) => {
  return toast.promise(promise, {
    pending: {
      render() {
        return <StakePendingToast amount={amount} />;
      },
      icon: false,
    },
    success: {
      render() {
        return <StakeSuccessToast amount={amount} />;
      },
      icon: false,
    },
    error: {
      render() {
        return <StakeErrorToast />;
      },
      icon: false,
    },
  });
};

export const createUnstakeToast = (promise: Promise<void>, amount: string) => {
  return toast.promise(promise, {
    pending: {
      render() {
        return <UnstakePendingToast amount={amount} />;
      },
      icon: false,
    },
    success: {
      render() {
        return <UnstakeSuccessToast amount={amount} />;
      },
      icon: false,
    },
    error: {
      render() {
        return <UnstakeErrorToast />;
      },
      icon: false,
    },
  });
};

export const createClaimBGTToast = (promise: Promise<void>, amount: string) => {
  return toast.promise(promise, {
    pending: {
      render() {
        return <ClaimBGTPendingToast amount={amount} />;
      },
      icon: false,
    },
    success: {
      render() {
        return <ClaimBGTSuccessToast amount={amount} />;
      },
      icon: false,
    },
    error: {
      render() {
        return <ClaimBGTErrorToast />;
      },
      icon: false,
    },
  });
};
