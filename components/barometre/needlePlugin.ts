import type { Plugin } from "chart.js";

export interface NeedlePluginOptions {
  score: number;
  color?: string;
  width?: number;
  pivotRadius?: number;
}

export const needlePlugin: Plugin<"doughnut"> = {
  id: "needlePlugin",
  afterDraw(chart, _args, pluginOptions) {
    const opts = (pluginOptions || {}) as NeedlePluginOptions;
    const score = Math.max(0, Math.min(100, opts.score ?? 0));
    const meta = chart.getDatasetMeta(0);
    const arc = meta?.data?.[0] as any;
    if (!arc) return;

    const { x, y, outerRadius } = arc;
    const rotation = chart.options.rotation ?? -Math.PI / 2;
    const circumference = chart.options.circumference ?? Math.PI * 2;
    const angle = rotation + (score / 100) * circumference;
    const needleLength = outerRadius - 10;

    const ctx = chart.ctx;
    ctx.save();
    ctx.translate(x, y);

    ctx.beginPath();
    ctx.lineWidth = opts.width ?? 2;
    ctx.strokeStyle = opts.color ?? "#1F2937";
    ctx.lineCap = "round";
    ctx.moveTo(0, 0);
    ctx.lineTo(Math.cos(angle) * needleLength, Math.sin(angle) * needleLength);
    ctx.stroke();

    ctx.beginPath();
    ctx.fillStyle = "#111827";
    ctx.arc(0, 0, opts.pivotRadius ?? 4, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  },
};
