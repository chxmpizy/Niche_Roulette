"use client";

let audioCtx: AudioContext | null = null;
let master: GainNode | null = null;
let noiseBuf: AudioBuffer | null = null;

function getAudioContext() {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return null;
    
    audioCtx = new AudioContextClass();
    master = audioCtx.createGain();
    master.gain.value = 0.3; // slightly softer
    master.connect(audioCtx.destination);
  }
  if (audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
}

function getNoise(ctx: AudioContext) {
  if (!noiseBuf) {
    noiseBuf = ctx.createBuffer(1, ctx.sampleRate * 0.05, ctx.sampleRate);
    const d = noiseBuf.getChannelData(0);
    for (let i = 0; i < d.length; i++) {
      d[i] = Math.random() * 2 - 1;
    }
  }
  return noiseBuf;
}

export function playTick(timeOffset = 0) {
  const ctx = getAudioContext();
  if (!ctx || !master) return;
  const time = ctx.currentTime + timeOffset;

  const src = ctx.createBufferSource();
  src.buffer = getNoise(ctx);
  
  const bp = ctx.createBiquadFilter();
  bp.type = "bandpass";
  bp.frequency.value = 2400 + Math.random() * 800;
  bp.Q.value = 1.2;
  
  const g = ctx.createGain();
  g.gain.setValueAtTime(0.3, time);
  g.gain.exponentialRampToValueAtTime(0.001, time + 0.025);
  
  src.connect(bp);
  bp.connect(g);
  g.connect(master);
  
  src.start(time);
  src.stop(time + 0.03);
}

export function playThunk(timeOffset = 0) {
  const ctx = getAudioContext();
  if (!ctx || !master) return;
  const time = ctx.currentTime + timeOffset;

  const osc = ctx.createOscillator();
  osc.type = "sine";
  osc.frequency.setValueAtTime(110, time);
  osc.frequency.exponentialRampToValueAtTime(55, time + 0.09);
  
  const g = ctx.createGain();
  g.gain.setValueAtTime(0.5, time);
  g.gain.exponentialRampToValueAtTime(0.001, time + 0.12);
  
  osc.connect(g);
  g.connect(master);
  
  osc.start(time);
  osc.stop(time + 0.14);
}

export function scheduleReelSound(steps: number, durationMs: number) {
  const ctx = getAudioContext();
  if (!ctx) return;
  
  const t0 = ctx.currentTime + 0.02;
  const T = durationMs / 1000;
  
  // Expo-out easing curve for ticking
  for (let k = 1; k <= steps; k++) {
    const t = -0.1 * Math.log2(1 - 0.999 * (k / steps));
    playTick((t0 + t * T) - ctx.currentTime);
  }
  
  playThunk((t0 + T) - ctx.currentTime);
}
