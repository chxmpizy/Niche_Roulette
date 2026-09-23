export function SubNicheStage({ categoryName, onComplete }: { categoryName: string, onComplete: (val: string) => void }) {
  return <div onClick={() => onComplete("mock")}>Sub Niche Stage Mock for {categoryName}</div>;
}
