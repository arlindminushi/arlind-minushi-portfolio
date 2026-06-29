"use client";

import { useEffect, useRef, useState } from "react";
import { chatQA, chatIntro, chatFallback, type ChatQA } from "@/lib/data";

type Msg = { from: "bot" | "user"; text: string };

const MONO = "var(--font-jetbrains-mono)";
const SERIF = "var(--font-instrument-serif)";

function matchAnswer(input: string): string {
  const q = input.toLowerCase();
  let best: ChatQA | null = null;
  let bestScore = 0;
  for (const item of chatQA) {
    const score = item.keywords.reduce((n, k) => (q.includes(k) ? n + 1 : n), 0);
    if (score > bestScore) {
      bestScore = score;
      best = item;
    }
  }
  return bestScore > 0 && best ? best.a : chatFallback;
}

export default function AskAI() {
  const [messages, setMessages] = useState<Msg[]>([{ from: "bot", text: chatIntro }]);
  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState("");
  const threadRef = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Keep the conversation scrolled to the latest message (within the panel only).
  useEffect(() => {
    const el = threadRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, typing]);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  function send(question: string, answer: string) {
    if (typing) return;
    setMessages((m) => [...m, { from: "user", text: question }]);
    setTyping(true);
    timer.current = setTimeout(() => {
      setMessages((m) => [...m, { from: "bot", text: answer }]);
      setTyping(false);
    }, 650);
  }

  function onSubmit() {
    const q = input.trim();
    if (!q || typing) return;
    setInput("");
    send(q, matchAnswer(q));
  }

  return (
    <section id="ask" style={{ padding: 'clamp(80px,14vh,170px) clamp(20px,5vw,64px)', background: 'var(--paper2)', borderBlock: '1px solid var(--line)' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <span data-reveal style={{ fontFamily: MONO, fontSize: '12px', letterSpacing: '.22em', color: 'var(--muted)', display: 'block', marginBottom: '16px' }}>08 — ASK</span>
        <h2 data-reveal style={{ margin: '0 0 14px', fontSize: 'clamp(40px,8vw,110px)', fontWeight: 700, letterSpacing: '-.03em', lineHeight: '.9', color: 'var(--ink)' }}>Ask my <em style={{ fontFamily: SERIF, fontWeight: 400, color: 'var(--accent)' }}>AI</em></h2>
        <p data-reveal style={{ margin: '0 0 clamp(36px,5vh,52px)', fontSize: '16.5px', color: 'var(--ink2)', fontWeight: 300, maxWidth: '560px' }}>A little assistant trained on my background — tap a question below and it answers instantly. <span style={{ color: 'var(--muted)' }}>(Free-text chat is an upcoming feature.)</span></p>
        <div data-reveal style={{ border: '1px solid var(--line)', borderRadius: '10px', background: 'var(--paper)', overflow: 'hidden', boxShadow: '0 30px 60px -34px rgba(22,21,15,.25)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '18px 22px', borderBottom: '1px solid var(--line)' }}>
            <span style={{ position: 'relative', display: 'flex', width: '11px', height: '11px' }}><span style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: '#1f9d57' }}></span><span style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: '#1f9d57', animation: 'pulse 2s ease-in-out infinite' }}></span></span>
            <div><div style={{ fontWeight: 600, fontSize: '15px', color: 'var(--ink)' }}>Arlind&rsquo;s AI</div><div style={{ fontFamily: MONO, fontSize: '11px', color: 'var(--muted)' }}>typically replies instantly</div></div>
          </div>

          <div ref={threadRef} style={{ padding: '26px 22px', display: 'flex', flexDirection: 'column', gap: '16px', minHeight: '230px', maxHeight: '380px', overflowY: 'auto' }}>
            {messages.map((m, i) =>
              m.from === "user" ? (
                <div key={i} style={{ alignSelf: 'flex-end', maxWidth: '80%', background: 'var(--accent)', color: '#fff', borderRadius: '14px 4px 14px 14px', padding: '13px 17px', fontSize: '15px', lineHeight: '1.5', animation: 'fadeIn .25s ease both' }}>{m.text}</div>
              ) : (
                <div key={i} style={{ alignSelf: 'flex-start', maxWidth: '80%', background: 'var(--paper2)', border: '1px solid var(--line)', borderRadius: '4px 14px 14px 14px', padding: '13px 17px', fontSize: '15px', lineHeight: '1.5', color: 'var(--ink)', animation: 'fadeIn .25s ease both' }}>{m.text}</div>
              )
            )}
            {typing && (
              <div aria-label="Assistant is typing" style={{ alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: '5px', background: 'var(--paper2)', border: '1px solid var(--line)', borderRadius: '4px 14px 14px 14px', padding: '15px 17px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--muted)', animation: 'blink 1s ease-in-out infinite' }} />
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--muted)', animation: 'blink 1s ease-in-out .2s infinite' }} />
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--muted)', animation: 'blink 1s ease-in-out .4s infinite' }} />
              </div>
            )}
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', padding: '0 22px 18px' }}>
            {chatQA.map((item) => (
              <button key={item.q} type="button" onClick={() => send(item.q, item.a)} disabled={typing} style={{ fontFamily: MONO, fontSize: '12px', color: 'var(--ink2)', background: 'transparent', border: '1px solid var(--line)', borderRadius: '20px', padding: '8px 14px', cursor: typing ? 'default' : 'pointer', transition: 'border-color .3s,color .3s' }} data-style-hover="border-color:var(--accent);color:var(--accent);">{item.q}</button>
            ))}
          </div>

          <form
            onSubmit={(e) => { e.preventDefault(); onSubmit(); }}
            style={{ display: 'flex', gap: '10px', padding: '16px 18px', borderTop: '1px solid var(--line)', alignItems: 'center' }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              aria-label="Ask the assistant a question"
              placeholder="Ask me anything…"
              style={{ flex: 1, background: 'var(--paper2)', border: '1px solid var(--line)', borderRadius: '8px', padding: '13px 16px', fontFamily: 'var(--font-space-grotesk)', fontSize: '15px', color: 'var(--ink)', outline: 'none' }}
            />
            <button type="submit" disabled={typing || !input.trim()} style={{ flex: 'none', background: 'var(--ink)', color: 'var(--paper)', border: 'none', borderRadius: '8px', padding: '13px 22px', fontFamily: MONO, fontSize: '13px', letterSpacing: '.06em', cursor: (typing || !input.trim()) ? 'not-allowed' : 'pointer', opacity: (typing || !input.trim()) ? '.55' : '1', transition: 'opacity .3s' }}>SEND</button>
          </form>
        </div>
      </div>
    </section>
  );
}
