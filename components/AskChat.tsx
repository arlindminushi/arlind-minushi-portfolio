"use client";

import { useEffect, useRef, useState } from "react";
import { content as C } from "@/lib/content";
import type { ChatQA } from "@/lib/content";

type Msg = { from: "bot" | "user"; text: string };

// Scripted demo chat. Swap `ask` for a call to a real LLM endpoint when it's wired up.
export default function AskChat() {
  const [messages, setMessages] = useState<Msg[]>([{ from: "bot", text: C.chat.intro }]);
  const [typing, setTyping] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, typing]);

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  function ask(q: ChatQA) {
    if (typing) return;
    setMessages((m) => [...m, { from: "user", text: q.label }]);
    setTyping(true);
    timer.current = setTimeout(() => {
      setMessages((m) => [...m, { from: "bot", text: q.a }]);
      setTyping(false);
    }, 850);
  }

  return (
    <div className="chat">
      <div className="chat-head">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/brand/am-monogram-on-black.svg" alt="" width={34} height={34} />
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <span style={{ fontWeight: 600, fontSize: 14.5 }}>Arlind’s AI</span>
          <span className="mono-xs dim" style={{ fontSize: 10.5 }}>Demo — wiring it up soon</span>
        </div>
      </div>
      <div ref={listRef} className="chat-list" aria-live="polite">
        {messages.map((m, i) => (
          <div key={i} className={m.from === "bot" ? "msg-bot" : "msg-user"}>{m.text}</div>
        ))}
        {typing && <div className="chat-typing">typing…</div>}
      </div>
      <div className="chat-chips">
        {C.chat.qa.map((q) => (
          <button key={q.label} type="button" className="chip" onClick={() => ask(q)}>{q.label}</button>
        ))}
      </div>
    </div>
  );
}
