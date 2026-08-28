"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight, Copy, Check, Code2 } from "lucide-react";

interface Endpoint {
  method: "GET" | "POST" | "PATCH" | "DELETE";
  path: string;
  description: string;
  when: string;
  request?: string;
  response?: string;
  statusCode?: string;
}

interface ApiDocsCardProps {
  title: string;
  subtitle?: string;
  endpoints: Endpoint[];
}

const METHOD_COLORS: Record<string, string> = {
  GET: "bg-[#5BA3D9]/15 text-[#5BA3D9] border-[#5BA3D9]/20",
  POST: "bg-[#4CAF7D]/15 text-[#4CAF7D] border-[#4CAF7D]/20",
  PATCH: "bg-[#E8A838]/15 text-[#E8A838] border-[#E8A838]/20",
  DELETE: "bg-[#D65F5F]/15 text-[#D65F5F] border-[#D65F5F]/20",
};

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button onClick={handleCopy} className="p-1 rounded hover:bg-white/50 transition-colors" title="Copier">
      {copied ? <Check className="w-3 h-3 text-[#4CAF7D]" /> : <Copy className="w-3 h-3 text-text-muted" />}
    </button>
  );
}

export function ApiDocsCard({ title, subtitle, endpoints }: ApiDocsCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [openEndpoint, setOpenEndpoint] = useState<number | null>(null);

  if (process.env.NODE_ENV === "production") return null;

  return (
    <div className="glass-strong rounded-2xl border border-[#4A6FA5]/5 overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-5 hover:bg-white/30 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#4A6FA5]/10 flex items-center justify-center">
            <Code2 className="w-5 h-5 text-[#4A6FA5]" />
          </div>
          <div className="text-left">
            <h3 className="text-sm font-bold text-text-primary">{title}</h3>
            {subtitle && <p className="text-xs text-text-muted mt-0.5">{subtitle}</p>}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono text-text-muted bg-white/50 px-2 py-1 rounded-lg">
            {endpoints.length} endpoint{endpoints.length > 1 ? "s" : ""}
          </span>
          {expanded ? (
            <ChevronDown className="w-4 h-4 text-text-muted" />
          ) : (
            <ChevronRight className="w-4 h-4 text-text-muted" />
          )}
        </div>
      </button>

      {/* Endpoints list */}
      {expanded && (
        <div className="border-t border-[#4A6FA5]/5">
          {endpoints.map((ep, i) => {
            const isOpen = openEndpoint === i;
            return (
              <div key={i} className="border-b border-[#4A6FA5]/5 last:border-b-0">
                <button
                  onClick={() => setOpenEndpoint(isOpen ? null : i)}
                  className="w-full flex items-center gap-3 px-5 py-3 hover:bg-white/30 transition-colors"
                >
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${METHOD_COLORS[ep.method]}`}>
                    {ep.method}
                  </span>
                  <code className="text-xs font-mono text-text-primary flex-1 text-left">{ep.path}</code>
                  <span className="text-[10px] text-text-muted hidden sm:block max-w-[200px] truncate">{ep.description}</span>
                  {isOpen ? (
                    <ChevronDown className="w-3.5 h-3.5 text-text-muted" />
                  ) : (
                    <ChevronRight className="w-3.5 h-3.5 text-text-muted" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-5 pb-4 space-y-3 animate-fade-in-up" style={{ animationDuration: "0.2s" }}>
                    {/* When */}
                    <div className="flex items-start gap-2">
                      <span className="text-[10px] font-bold text-[#4A6FA5] bg-[#4A6FA5]/10 px-2 py-0.5 rounded-md shrink-0 mt-0.5">
                        QUAND
                      </span>
                      <p className="text-xs text-text-secondary leading-relaxed">{ep.when}</p>
                    </div>

                    {/* Request */}
                    {ep.request && (
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-[10px] font-bold text-[#4CAF7D] bg-[#4CAF7D]/10 px-2 py-0.5 rounded-md">
                            REQUEST {ep.statusCode && `→ ${ep.statusCode}`}
                          </span>
                          <CopyButton text={ep.request} />
                        </div>
                        <pre className="text-[11px] font-mono text-text-secondary bg-white/60 rounded-xl p-3 overflow-x-auto border border-[#4A6FA5]/5">
                          {ep.request}
                        </pre>
                      </div>
                    )}

                    {/* Response */}
                    {ep.response && (
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-[10px] font-bold text-[#5BA3D9] bg-[#5BA3D9]/10 px-2 py-0.5 rounded-md">
                            RESPONSE
                          </span>
                          <CopyButton text={ep.response} />
                        </div>
                        <pre className="text-[11px] font-mono text-text-secondary bg-white/60 rounded-xl p-3 overflow-x-auto border border-[#4A6FA5]/5">
                          {ep.response}
                        </pre>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
