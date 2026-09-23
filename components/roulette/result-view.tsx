import { RouletteState } from "@/app/roulette/page";

export function ResultView({ selections, onReset }: { selections: RouletteState, onReset: () => void }) {
  return <div>Result Mock {selections.category} <button onClick={onReset}>Reset</button></div>;
}
