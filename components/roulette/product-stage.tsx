export function ProductStage({ onComplete }: { onComplete: (val: string) => void }) {
  return <div onClick={() => onComplete("mock")}>Product Stage Mock</div>;
}
