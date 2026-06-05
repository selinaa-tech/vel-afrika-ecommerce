import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { producers } from "@/lib/data";
import { Mic, MicOff, PhoneOff, Video, VideoOff, MessageCircle, Sparkles, X } from "lucide-react";

export const Route = createFileRoute("/call/$id")({
  head: () => ({
    meta: [{ title: `Video call · Vel'Afrika` }],
  }),
  component: CallScreen,
});

type Peer = { name: string; subtitle: string; avatar?: string };

function findPeer(id: string): Peer {
  const producer = producers.find((p) => p.id === id);
  if (producer) {
    return { name: producer.name, subtitle: `${producer.craft} · ${producer.country}`, avatar: producer.avatar };
  }
  return { name: decodeURIComponent(id), subtitle: "On Vel'Afrika" };
}

function CallScreen() {
  const { id } = Route.useParams();
  const router = useRouter();
  const peer = findPeer(id);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [status, setStatus] = useState<"connecting" | "ringing" | "live" | "ended" | "denied">("connecting");
  const [muted, setMuted] = useState(false);
  const [camOff, setCamOff] = useState(false);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let cancelled = false;
    async function start() {
      try {
        const s = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" }, audio: true });
        if (cancelled) {
          s.getTracks().forEach((t) => t.stop());
          return;
        }
        streamRef.current = s;
        if (videoRef.current) {
          videoRef.current.srcObject = s;
          videoRef.current.muted = true;
          await videoRef.current.play().catch(() => {});
        }
        setStatus("ringing");
        setTimeout(() => !cancelled && setStatus("live"), 1800);
      } catch {
        if (!cancelled) setStatus("denied");
      }
    }
    start();
    return () => {
      cancelled = true;
      streamRef.current?.getTracks().forEach((t) => t.stop());
    };
  }, []);

  useEffect(() => {
    if (status !== "live") return;
    const i = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(i);
  }, [status]);

  useEffect(() => {
    const s = streamRef.current;
    if (!s) return;
    s.getAudioTracks().forEach((t) => (t.enabled = !muted));
    s.getVideoTracks().forEach((t) => (t.enabled = !camOff));
  }, [muted, camOff]);

  const endCall = () => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    setStatus("ended");
    setTimeout(() => router.history.back(), 600);
  };

  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");

  return (
    <div className="fixed inset-0 z-[60] flex flex-col bg-ink text-background">
      {/* Remote / hero */}
      <div className="relative flex-1 overflow-hidden">
        {peer.avatar ? (
          <img
            src={peer.avatar}
            alt={peer.name}
            className="absolute inset-0 h-full w-full scale-110 object-cover blur-md opacity-60"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-primary/40 via-clay/40 to-leaf/30" />
        )}
        <div className="absolute inset-0 bg-ink/40" />

        <div className="relative flex h-full flex-col items-center justify-center px-6 text-center">
          <div className="relative">
            {peer.avatar ? (
              <img
                src={peer.avatar}
                alt={peer.name}
                className="h-32 w-32 rounded-full border-4 border-background/20 object-cover shadow-2xl"
              />
            ) : (
              <div className="grid h-32 w-32 place-items-center rounded-full bg-primary text-5xl font-display font-semibold">
                {peer.name[0]}
              </div>
            )}
            {status === "ringing" && (
              <span className="absolute inset-0 -m-2 animate-ping rounded-full border-2 border-background/40" />
            )}
          </div>
          <h2 className="mt-5 font-display text-2xl font-semibold">{peer.name}</h2>
          <p className="mt-1 text-sm text-background/70">{peer.subtitle}</p>

          <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-background/15 px-3 py-1.5 text-xs font-medium backdrop-blur">
            {status === "connecting" && <>Connecting…</>}
            {status === "ringing" && <>Ringing…</>}
            {status === "live" && (
              <>
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-leaf" />
                Live · {mm}:{ss}
              </>
            )}
            {status === "ended" && <>Call ended</>}
            {status === "denied" && <>Camera blocked</>}
          </div>

          {status === "denied" && (
            <p className="mt-4 max-w-xs text-xs text-background/75">
              Allow camera and microphone permissions in your browser to start a video call.
            </p>
          )}
        </div>

        {/* Self preview */}
        <div className="absolute right-4 top-4 h-40 w-28 overflow-hidden rounded-2xl border border-background/20 bg-ink/80 shadow-xl">
          <video ref={videoRef} playsInline autoPlay className="h-full w-full scale-x-[-1] object-cover" />
          {camOff && (
            <div className="absolute inset-0 grid place-items-center bg-ink/80 text-[10px] uppercase tracking-wider">
              Camera off
            </div>
          )}
        </div>

        <button
          onClick={endCall}
          className="absolute left-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-background/15 backdrop-blur"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Controls */}
      <div className="border-t border-background/10 bg-ink/95 px-6 pb-[calc(1.25rem+env(safe-area-inset-bottom))] pt-5">
        <div className="mx-auto flex max-w-sm items-center justify-between">
          <CtrlBtn label={muted ? "Unmute" : "Mute"} onClick={() => setMuted((v) => !v)} active={muted}>
            {muted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
          </CtrlBtn>
          <CtrlBtn label={camOff ? "Camera on" : "Camera off"} onClick={() => setCamOff((v) => !v)} active={camOff}>
            {camOff ? <VideoOff className="h-5 w-5" /> : <Video className="h-5 w-5" />}
          </CtrlBtn>
          <CtrlBtn label="Chat">
            <MessageCircle className="h-5 w-5" />
          </CtrlBtn>
          <CtrlBtn label="Gift">
            <Sparkles className="h-5 w-5" />
          </CtrlBtn>
          <button
            onClick={endCall}
            aria-label="End call"
            className="grid h-14 w-14 place-items-center rounded-full bg-destructive text-destructive-foreground shadow-lg transition active:scale-95"
          >
            <PhoneOff className="h-6 w-6" />
          </button>
        </div>
        <p className="mt-3 text-center text-[11px] text-background/50">
          End-to-end encrypted call · Vel'Afrika Connect
        </p>
      </div>
    </div>
  );
}

function CtrlBtn({
  children,
  label,
  onClick,
  active,
}: {
  children: React.ReactNode;
  label: string;
  onClick?: () => void;
  active?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className={`grid h-12 w-12 place-items-center rounded-full transition active:scale-95 ${
        active ? "bg-background text-foreground" : "bg-background/15 text-background hover:bg-background/25"
      }`}
    >
      {children}
    </button>
  );
}
