import { QUICK_ACTIONS } from "../../data/mock";

type QuickActionChipsProps = {
  onSelect: (action: string) => void;
};

export default function QuickActionChips({ onSelect }: QuickActionChipsProps) {
  return (
    <div className="border-t border-[var(--color-border)] bg-white">
      <div className="max-w-[740px] mx-auto px-5 py-2.5">
        <div
          className="flex gap-2 overflow-x-auto scrollbar-hide"
          role="list"
          aria-label="Quick topic suggestions"
        >
          {QUICK_ACTIONS.map((action) => (
            <button
              key={action}
              role="listitem"
              onClick={() => onSelect(action)}
              className={[
                "shrink-0 px-3.5 py-1.5 rounded-full",
                "text-[12px] font-medium",
                "bg-white border border-[var(--color-border)]",
                "text-[var(--color-text-secondary)]",
                "hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] hover:bg-[var(--color-accent-light)]",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-1",
                "active:scale-95 transition-all duration-100",
              ].join(" ")}
            >
              {action}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
