import { Popover, PopoverContent, PopoverTrigger } from "@heroui/react";
import { GearIcon } from "@radix-ui/react-icons";
import { slippageOptions } from "../../features/swap/useSwap";

export const SwapSettings = ({ onSlipageChange, onDeadlineChange, slippage, deadline }: { onSlipageChange: (slippage: string) => void, onDeadlineChange: (deadline: string) => void, slippage: string, deadline: string }) => {
    return (
      <Popover>
        <PopoverTrigger>
          <button
            className="p-2 rounded-lg hover:bg-surface/80 transition-colors"
          >
            <GearIcon className="w-5 h-5 text-foreground-secondary hover:text-foreground-primary transition-colors" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="bg-surface border-2 border-border/40 rounded-xl p-4 shadow-xl max-w-[400px]">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Transaction Settings</h3>
            
            {/* Slippage Settings */}
            <div className="space-y-2">
              <label className="text-sm text-foreground-secondary">
                Slippage Tolerance
              </label>
              <div className="flex gap-2">
                {slippageOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => onSlipageChange(option)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                      slippage === option
                        ? "bg-primary-default/20 text-primary-default border border-primary-default/40"
                        : "bg-surface hover:bg-surface/80 border border-border/40"
                    }`}
                  >
                    {option}%
                  </button>
                ))}
                <input
                  type="number"
                  value={slippage}
                  onChange={(e) => onSlipageChange(e.target.value)}
                  className="w-20 px-3 py-1.5 rounded-lg text-sm font-medium bg-surface border border-border/40 focus:border-primary-default/40 transition-colors"
                  placeholder="Custom"
                />
              </div>
            </div>
  
            {/* Transaction Deadline */}
            <div className="space-y-2">
              <label className="text-sm text-foreground-secondary">
                Transaction Deadline
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={deadline}
                  onChange={(e) => onDeadlineChange(e.target.value)}
                  className="w-20 px-3 py-1.5 rounded-lg text-sm font-medium bg-surface border border-border/40 focus:border-primary-default/40 transition-colors"
                />
                <span className="text-sm text-foreground-secondary">seconds</span>
              </div>
            </div>
  
            <div className="text-xs text-foreground-secondary mt-4">
              Your transaction will revert if the price changes unfavorably by more than this percentage.
            </div>
          </div>
        </PopoverContent>
      </Popover>
    );
  };