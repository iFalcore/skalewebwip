"use client";

import { cn } from "@/lib/utils";

const Node = ({ cx, cy, label, className }: { cx: string, cy: string, label: string, className?: string }) => (
  <g className="group" role="img" aria-label={`Network node: ${label}`}>
    <circle
      cx={cx}
      cy={cy}
      r="45"
      className={cn("fill-background stroke-border group-hover:stroke-accent transition-all duration-300", className)}
      strokeWidth="2"
      aria-hidden="true"
    />
    <circle
      cx={cx}
      cy={cy}
      r="55"
      className="fill-none stroke-accent opacity-0 group-hover:opacity-50 transition-opacity duration-300"
      strokeWidth="1.5"
      strokeDasharray="3 3"
      aria-hidden="true"
    />
    <text
      x={cx}
      y={cy}
      textAnchor="middle"
      dy=".3em"
      className="font-semibold fill-foreground text-sm transition-colors duration-300 group-hover:fill-accent"
      aria-hidden="true"
    >
      {label}
    </text>
  </g>
);

const Line = ({ x1, y1, x2, y2 }: { x1: string, y1: string, x2: string, y2: string }) => (
  <line 
    x1={x1} y1={y1} x2={x2} y2={y2} 
    className="stroke-border" 
    strokeWidth="1.5" 
    strokeDasharray="4 4"
  />
);

export default function InteractiveDiagram() {
  return (
    <div className="w-full max-w-md mx-auto">
      <svg viewBox="0 0 300 250" className="w-full h-auto" role="img" aria-labelledby="diagram-title" aria-describedby="diagram-description">
        <title id="diagram-title">SKALE Expand Network Diagram</title>
        <desc id="diagram-description">A diagram showing SKALE connected to Ethereum and Base networks</desc>
        <Line x1="90" y1="75" x2="150" y2="175" />
        <Line x1="210" y1="75" x2="150" y2="175" />
        
        <Node cx="90" cy="75" label="Ethereum" />
        <Node cx="210" cy="75" label="Base" />
        <Node cx="150" cy="175" label="SKALE" className="stroke-accent" />
      </svg>
      <p className="text-center text-muted-foreground text-sm mt-4" id="diagram-description-text">
        SKALE Expand v1 connects to Base, with more chains to come.
      </p>
    </div>
  );
}
