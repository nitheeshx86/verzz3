import { useState, useEffect, useRef } from "react";

const ICONS = {
    learn: (
        <svg width="100%" height="100%" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M60 25 C60 25 30 20 15 30 L15 95 C30 85 60 90 60 90" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M60 25 C60 25 90 20 105 30 L105 95 C90 85 60 90 60 90" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <line x1="60" y1="25" x2="60" y2="90" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <line x1="30" y1="42" x2="55" y2="44" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
            <line x1="30" y1="52" x2="55" y2="53" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
            <line x1="30" y1="62" x2="50" y2="63" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
            <line x1="65" y1="42" x2="90" y2="44" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
            <line x1="65" y1="52" x2="90" y2="53" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
            <line x1="65" y1="62" x2="85" y2="63" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
            <polygon points="60,8 62.5,15 70,15 64,19.5 66.5,27 60,22.5 53.5,27 56,19.5 50,15 57.5,15" stroke="currentColor" strokeWidth="1.2" fill="none" opacity="0.6" />
        </svg>
    ),
    discover: (
        <svg width="100%" height="100%" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="60" cy="60" r="42" stroke="currentColor" strokeWidth="2.2" />
            <circle cx="60" cy="60" r="4" stroke="currentColor" strokeWidth="1.8" />
            <line x1="60" y1="18" x2="60" y2="24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <line x1="60" y1="96" x2="60" y2="102" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <line x1="18" y1="60" x2="24" y2="60" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <line x1="96" y1="60" x2="102" y2="60" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <polygon points="60,22 64,58 60,64 56,58" stroke="currentColor" strokeWidth="1.5" fill="none" />
            <polygon points="60,98 64,62 60,56 56,62" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.4" />
            {[45, 135, 225, 315].map((deg, i) => (
                <line
                    key={i}
                    x1={60 + 38 * Math.cos((deg * Math.PI) / 180)}
                    y1={60 + 38 * Math.sin((deg * Math.PI) / 180)}
                    x2={60 + 43 * Math.cos((deg * Math.PI) / 180)}
                    y2={60 + 43 * Math.sin((deg * Math.PI) / 180)}
                    stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.5"
                />
            ))}
        </svg>
    ),
    connect: (
        <svg width="100%" height="100%" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="60" cy="60" r="8" stroke="currentColor" strokeWidth="2" />
            <circle cx="25" cy="30" r="5.5" stroke="currentColor" strokeWidth="1.8" />
            <circle cx="95" cy="30" r="5.5" stroke="currentColor" strokeWidth="1.8" />
            <circle cx="20" cy="82" r="5.5" stroke="currentColor" strokeWidth="1.8" />
            <circle cx="100" cy="82" r="5.5" stroke="currentColor" strokeWidth="1.8" />
            <circle cx="60" cy="105" r="5.5" stroke="currentColor" strokeWidth="1.8" />
            <line x1="52.5" y1="55" x2="29.5" y2="34" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity="0.7" />
            <line x1="67.5" y1="55" x2="90.5" y2="34" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity="0.7" />
            <line x1="52.5" y1="65" x2="24.5" y2="78" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity="0.7" />
            <line x1="67.5" y1="65" x2="95.5" y2="78" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity="0.7" />
            <line x1="60" y1="68" x2="60" y2="99.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity="0.7" />
            <line x1="25" y1="35.5" x2="20" y2="76.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.3" />
            <line x1="95" y1="35.5" x2="100" y2="76.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.3" />
            <line x1="25.5" y1="30" x2="89.5" y2="30" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.3" />
        </svg>
    ),
};

function seededRandom(seed: number) {
    let s = seed;
    return () => {
        s = (s * 16807 + 0) % 2147483647;
        return (s - 1) / 2147483646;
    };
}

function generateItems(kind: keyof typeof ICONS, seed: number = 42) {
    const rand = seededRandom(seed);
    const items = [];
    const count = 12; // Reduced count

    for (let i = 0; i < count; i++) {
        const size = 80 + rand() * 120;
        items.push({
            id: i,
            kind,
            x: 10 + rand() * 30, // Restrict to left half (10% to 40%)
            y: 10 + rand() * 80, // Restrict to safe vertical range (10% to 90%)
            size,
            rotation: rand() * 360,
            baseOpacity: 0.05 + rand() * 0.05, // Significantly reduced base visibility (5% to 10%)
        });
    }
    return items;
}

function ScatterIcon({ item, mousePos }: { item: any; mousePos: { x: number; y: number } }) {
    const [hovered, setHovered] = useState(false);
    const [ripple, setRipple] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const [proximity, setProximity] = useState(0);

    useEffect(() => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dist = Math.sqrt((mousePos.x - cx) ** 2 + (mousePos.y - cy) ** 2);
        const maxDist = 280;
        const prox = Math.max(0, 1 - dist / maxDist);
        setProximity(prox);
    }, [mousePos]);

    const handleEnter = () => {
        setHovered(true);
        setRipple(true);
        setTimeout(() => setRipple(false), 700);
    };

    const opacity = hovered
        ? 0.65 // Reduced hover opacity (was 0.9)
        : item.baseOpacity + proximity * 0.2; // Reduced proximity gain (was 0.4)

    const scale = hovered ? 1.3 : 1 + proximity * 0.2;

    const glowColor =
        item.kind === "learn"
            ? "rgba(160,210,255,0.4)"
            : item.kind === "discover"
                ? "rgba(200,170,255,0.4)"
                : "rgba(150,255,200,0.4)";

    const hoverColor =
        item.kind === "learn"
            ? "#a8d8ff"
            : item.kind === "discover"
                ? "#d4b8ff"
                : "#96ffce";

    return (
        <div
            ref={ref}
            onMouseEnter={handleEnter}
            onMouseLeave={() => setHovered(false)}
            style={{
                position: "absolute",
                left: `${item.x}%`,
                top: `${item.y}%`,
                width: item.size,
                height: item.size,
                // Center the element on its x,y coordinates to prevent clipping
                transform: `translate(-50%, -50%) rotate(${item.rotation + (hovered ? 12 : 0)}deg) scale(${scale})`,
                transition: hovered
                    ? "transform 0.25s cubic-bezier(0.34,1.56,0.64,1), opacity 0.2s ease, filter 0.2s ease"
                    : "transform 0.6s ease, opacity 0.5s ease, filter 0.5s ease",
                opacity,
                color: hovered ? hoverColor : "#fff",
                filter: hovered
                    ? `drop-shadow(0 0 25px ${glowColor}) drop-shadow(0 0 10px ${glowColor})`
                    : proximity > 0.1
                        ? `drop-shadow(0 0 ${proximity * 15}px ${glowColor})`
                        : "none",
                cursor: "pointer",
                zIndex: hovered ? 100 : 10,
                userSelect: "none",
                pointerEvents: "auto",
            }}
        >
            {ICONS[item.kind as keyof typeof ICONS]}

            {ripple && (
                <div
                    style={{
                        position: "absolute",
                        inset: -15,
                        borderRadius: "50%",
                        border: `2px solid ${hoverColor}`,
                        animation: "rippleOut 0.7s ease-out forwards",
                        pointerEvents: "none",
                        opacity: 0.5,
                    }}
                />
            )}
        </div>
    );
}

export const ScatterBackground = ({ kind }: { kind: keyof typeof ICONS }) => {
    const [mousePos, setMousePos] = useState({ x: -999, y: -999 });
    const [items] = useState(() => generateItems(kind, kind === "learn" ? 42 : kind === "discover" ? 84 : 126));

    useEffect(() => {
        const onMove = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
        window.addEventListener("mousemove", onMove);
        return () => window.removeEventListener("mousemove", onMove);
    }, []);

    return (
        <div
            className="absolute inset-x-0 top-0 bottom-0 pointer-events-none"
            style={{ width: '100%', zIndex: 15 }} // Limit container to left half
        >
            <style>{`
                @keyframes rippleOut {
                    from { transform: scale(0.85); opacity: 0.6; }
                    to   { transform: scale(1.6);  opacity: 0; }
                }
            `}</style>
            {items.map((item) => (
                <ScatterIcon key={item.id} item={item} mousePos={mousePos} />
            ))}
        </div>
    );
};
