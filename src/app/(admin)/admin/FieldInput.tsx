"use client";

import { useState } from "react";
import type { Field } from "./schema";

/** One control per field type, so the page can be about loading and saving. */

const labelCls = "block text-[0.72rem] font-bold uppercase tracking-[0.09em] text-fern";
const box =
  "w-full rounded-xl border border-mint bg-white px-3 py-2 text-sm text-ink outline-none transition-colors focus:border-amber focus:ring-2 focus:ring-amber/30";

const asString = (v: unknown) => (v === undefined || v === null ? "" : String(v));
const asArray = (v: unknown) => (Array.isArray(v) ? v : []);

function Hint({ children }: { children?: string }) {
  return children ? <p className="mt-1 text-xs leading-relaxed text-ink/55">{children}</p> : null;
}

function Row({ field, children }: { field: Field; children: React.ReactNode }) {
  return (
    <div>
      <label className={labelCls}>
        {field.label}
        {"required" in field && field.required ? <span className="text-amber"> *</span> : null}
      </label>
      <div className="mt-1.5">{children}</div>
      <Hint>{field.hint}</Hint>
    </div>
  );
}

function SubField({
  sub,
  value,
  onChange,
}: {
  sub: { name: string; label: string; type: "text" | "textarea" };
  value: unknown;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <span className="text-[0.66rem] font-bold uppercase tracking-wider text-ink/45">{sub.label}</span>
      {sub.type === "textarea" ? (
        <textarea className={box} rows={2} value={asString(value)} onChange={(e) => onChange(e.target.value)} dir="auto" />
      ) : (
        <input className={box} value={asString(value)} onChange={(e) => onChange(e.target.value)} dir="auto" />
      )}
    </div>
  );
}

/** Live length against a recommended maximum, for SEO titles and descriptions. */
export function Count({ value, limit }: { value: string; limit: number }) {
  const n = value.length;
  return (
    <p className={`mt-1 text-xs font-semibold ${n === 0 ? "text-ink/40" : n > limit ? "text-red-600" : "text-fern"}`}>
      {n} / {limit} characters{n > limit ? " — Google will cut this off" : ""}
    </p>
  );
}

/**
 * Where a writer's HTML goes: paste it, or pick the .html file. The preview is
 * a rough one — it shows the markup on its own, without the site's styles or
 * animations — but it is enough to catch a paste that went wrong.
 */
function HtmlField({ field, value, onChange }: { field: Field; value: string; onChange: (next: unknown) => void }) {
  const [preview, setPreview] = useState(false);
  const words = value.replace(/<style[\s\S]*?<\/style>|<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <span className={labelCls}>{field.label}</span>
        <label className="cursor-pointer rounded-full border border-mint bg-white px-3 py-1 text-xs font-bold text-forest transition-colors hover:border-fern">
          Upload .html file
          <input
            type="file"
            accept=".html,.htm,text/html"
            className="sr-only"
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (file) onChange(await file.text());
              e.target.value = "";
            }}
          />
        </label>
        {value && (
          <>
            <button
              type="button"
              onClick={() => setPreview((p) => !p)}
              className="rounded-full border border-mint bg-white px-3 py-1 text-xs font-bold text-forest transition-colors hover:border-fern"
            >
              {preview ? "Hide preview" : "Rough preview"}
            </button>
            <button
              type="button"
              onClick={() => onChange("")}
              className="rounded-full border border-mint bg-white px-3 py-1 text-xs font-bold text-ink/60 transition-colors hover:border-red-300 hover:text-red-600"
            >
              Clear
            </button>
            <span className="text-xs text-ink/50">{words.toLocaleString()} words</span>
          </>
        )}
      </div>
      <textarea
        className={`${box} mt-1.5 font-mono text-xs leading-relaxed`}
        rows={value ? 14 : 4}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="<section class=&quot;band&quot;>…</section>"
        spellCheck={false}
        dir="ltr"
      />
      {preview && value && (
        <iframe
          title="HTML preview"
          sandbox=""
          srcDoc={value}
          className="mt-2 h-96 w-full rounded-xl border border-mint bg-white"
        />
      )}
      <Hint>{field.hint}</Hint>
    </div>
  );
}

const addLabel = (label: string) => `Add ${label.toLowerCase().replace(/s$/, "")}`;

export function FieldInput({
  field,
  value,
  onChange,
}: {
  field: Field;
  value: unknown;
  onChange: (next: unknown) => void;
}) {
  if (field.type === "html") {
    return <HtmlField field={field} value={asString(value)} onChange={onChange} />;
  }

  if (field.type === "boolean") {
    return (
      <div>
        <label className="flex w-fit cursor-pointer items-center gap-3">
          <input type="checkbox" checked={Boolean(value)} onChange={(e) => onChange(e.target.checked)} className="h-4 w-4 accent-amber" />
          <span className={labelCls}>{field.label}</span>
        </label>
        <Hint>{field.hint}</Hint>
      </div>
    );
  }

  if (field.type === "select") {
    return (
      <Row field={field}>
        <select className={box} value={asString(value)} onChange={(e) => onChange(e.target.value)}>
          {field.options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      </Row>
    );
  }

  if (field.type === "number") {
    return (
      <Row field={field}>
        <input
          type="number"
          className={box}
          value={asString(value)}
          onChange={(e) => onChange(e.target.value === "" ? null : Number(e.target.value))}
        />
      </Row>
    );
  }

  if (field.type === "textarea" || field.type === "markdown") {
    return (
      <Row field={field}>
        <textarea
          className={`${box} leading-relaxed ${field.type === "markdown" ? "font-mono" : ""}`}
          rows={field.type === "markdown" ? 20 : 3}
          value={asString(value)}
          onChange={(e) => onChange(e.target.value)}
          dir="auto"
        />
        {"limit" in field && field.limit ? <Count value={asString(value)} limit={field.limit} /> : null}
      </Row>
    );
  }

  if (field.type === "list") {
    const items = asArray(value) as string[];
    return (
      <Row field={field}>
        <div className="space-y-2">
          {items.map((item, i) => (
            <div key={i} className="flex gap-2">
              {field.item === "textarea" ? (
                <textarea
                  className={box}
                  rows={3}
                  value={item}
                  onChange={(e) => onChange(items.map((x, n) => (n === i ? e.target.value : x)))}
                  dir="auto"
                />
              ) : (
                <input
                  className={box}
                  value={item}
                  onChange={(e) => onChange(items.map((x, n) => (n === i ? e.target.value : x)))}
                  dir="auto"
                />
              )}
              <button
                type="button"
                onClick={() => onChange(items.filter((_, n) => n !== i))}
                className="shrink-0 self-start rounded-lg border border-mint px-2.5 py-2 text-xs font-semibold text-ink/60 hover:border-red-300 hover:text-red-600"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => onChange([...items, ""])}
            className="rounded-full border border-fern/40 px-3.5 py-1.5 text-xs font-bold text-fern hover:bg-mint"
          >
            {addLabel(field.label)}
          </button>
        </div>
      </Row>
    );
  }

  if (field.type === "objectList") {
    const items = asArray(value) as Record<string, string>[];
    return (
      <Row field={field}>
        <div className="space-y-3">
          {items.map((item, i) => (
            <div key={i} className="rounded-xl border border-mint bg-mint/20 p-3">
              <div className="space-y-2">
                {field.fields.map((sub) => (
                  <SubField
                    key={sub.name}
                    sub={sub}
                    value={item?.[sub.name]}
                    onChange={(v) => onChange(items.map((x, n) => (n === i ? { ...x, [sub.name]: v } : x)))}
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={() => onChange(items.filter((_, n) => n !== i))}
                className="mt-2 text-xs font-semibold text-ink/55 hover:text-red-600"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => onChange([...items, Object.fromEntries(field.fields.map((f) => [f.name, ""]))])}
            className="rounded-full border border-fern/40 px-3.5 py-1.5 text-xs font-bold text-fern hover:bg-mint"
          >
            {addLabel(field.label)}
          </button>
        </div>
      </Row>
    );
  }

  if (field.type === "object") {
    const obj = (value ?? {}) as Record<string, string>;
    const filled = field.fields.some((f) => asString(obj[f.name]).trim());
    return (
      <Row field={field}>
        <div className="space-y-2 rounded-xl border border-mint bg-mint/20 p-3">
          {field.fields.map((sub) => (
            <SubField key={sub.name} sub={sub} value={obj[sub.name]} onChange={(v) => onChange({ ...obj, [sub.name]: v })} />
          ))}
          {filled && (
            <button type="button" onClick={() => onChange(null)} className="text-xs font-semibold text-ink/55 hover:text-red-600">
              Clear
            </button>
          )}
        </div>
      </Row>
    );
  }

  return (
    <Row field={field}>
      <input
        type={field.type === "date" ? "date" : "text"}
        className={box}
        value={asString(value)}
        onChange={(e) => onChange(e.target.value)}
        dir="auto"
      />
      {"limit" in field && field.limit ? <Count value={asString(value)} limit={field.limit} /> : null}
    </Row>
  );
}
