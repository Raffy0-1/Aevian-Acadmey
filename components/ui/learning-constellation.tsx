"use client";

import { motion } from "framer-motion";

// SIGNATURE ELEMENT
// A curriculum is, structurally, a graph: skills unlock other skills, and a
// student's path lights up node by node. This isn't decoration — it's a
// literal (simplified) diagram of how an Aevian course tree connects, and
// it's the one recurring visual motif across the site (hero, section
// dividers, loading states) instead of a generic blob/gradient shape.

const nodes = [
  { id: "a", x: 40, y: 190, r: 5, label: "Foundations" },
  { id: "b", x: 140, y: 90, r: 4 },
  { id: "c", x: 140, y: 260, r: 4 },
  { id: "d", x: 250, y: 40, r: 7, label: "Core Skill" },
  { id: "e", x: 250, y: 160, r: 4 },
  { id: "f", x: 250, y: 300, r: 5 },
  { id: "g", x: 370, y: 100, r: 4 },
  { id: "h", x: 370, y: 220, r: 8, label: "Certificate" },
];

const edges: [string, string][] = [
  ["a", "b"],
  ["a", "c"],
  ["b", "d"],
  ["b", "e"],
  ["c", "e"],
  ["c", "f"],
  ["d", "g"],
  ["e", "g"],
  ["e", "h"],
  ["f", "h"],
];

function find(id: string) {
  return nodes.find((n) => n.id === id)!;
}

export function LearningConstellation({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 420 340"
      className={className}
      fill="none"
      role="img"
      aria-label="Diagram of connected lessons forming a course path, leading to a certificate"
    >
      {edges.map(([from, to], i) => {
        const a = find(from);
        const b = find(to);
        return (
          <motion.line
            key={i}
            x1={a.x}
            y1={a.y}
            x2={b.x}
            y2={b.y}
            stroke="currentColor"
            strokeOpacity={0.35}
            strokeWidth={1}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.35 }}
            transition={{ duration: 0.9, delay: 0.15 + i * 0.06, ease: "easeOut" }}
          />
        );
      })}
      {nodes.map((n, i) => (
        <motion.g
          key={n.id}
          initial={{ opacity: 0, scale: 0.4 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.5 + i * 0.07 }}
        >
          <circle
            cx={n.x}
            cy={n.y}
            r={n.r}
            fill={n.label ? "var(--gold)" : "currentColor"}
            fillOpacity={n.label ? 1 : 0.6}
          />
          {n.label && (
            <text
              x={n.x}
              y={n.y - n.r - 10}
              textAnchor="middle"
              className="font-mono"
              fontSize={11}
              fill="currentColor"
              fillOpacity={0.8}
            >
              {n.label}
            </text>
          )}
        </motion.g>
      ))}
    </svg>
  );
}
