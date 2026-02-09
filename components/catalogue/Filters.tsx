"use client";

import { useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type Family = {
  id: string;
  name: string;
};

const formatsAllowed = [
  { key: "formation", label: "Formations" },
  { key: "atelier", label: "Ateliers" },
  { key: "conseil", label: "Conseil" },
];

export function Filters({ families }: { families: Family[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const q = searchParams.get("q") ?? "";
  const family = searchParams.get("family") ?? "all";
  const format = searchParams.get("format") ?? "all";

  const familyOptions = useMemo(
    () => [{ id: "all", name: "Toutes les familles" }, ...families],
    [families]
  );

  function setParam(key: string, value: string) {
    const next = new URLSearchParams(searchParams.toString());

    if (value === "all" || value.trim() === "") {
      next.delete(key);
    } else {
      next.set(key, value);
    }

    router.push(`/catalogue?${next.toString()}`);
  }

  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-3">
        <input
          value={q}
          onChange={(e) => setParam("q", e.target.value)}
          placeholder="Rechercher une offre"
          className="w-full rounded-xl border border-neutral-300 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-neutral-900"
        />

        <div className="flex flex-wrap gap-2">
          <select
            value={family}
            onChange={(e) => setParam("family", e.target.value)}
            className="rounded-xl border border-neutral-300 px-3 py-2 text-sm bg-white"
          >
            {familyOptions.map((f) => (
              <option
                key={f.id}
                value={f.name === "Toutes les familles" ? "all" : f.name}
              >
                {f.name}
              </option>
            ))}
          </select>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setParam("format", "all")}
              className={`rounded-xl px-3 py-2 text-sm border ${
                format === "all"
                  ? "bg-neutral-900 text-white border-neutral-900"
                  : "border-neutral-300 hover:bg-neutral-50"
              }`}
            >
              Tout
            </button>

            {formatsAllowed.map((f) => (
              <button
                key={f.key}
                onClick={() => setParam("format", f.key)}
                className={`rounded-xl px-3 py-2 text-sm border ${
                  format === f.key
                    ? "bg-neutral-900 text-white border-neutral-900"
                    : "border-neutral-300 hover:bg-neutral-50"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className="text-xs text-neutral-500">
          Tarification sur demande. Programmes transmis après échange.
        </div>
      </div>
    </div>
  );
}
