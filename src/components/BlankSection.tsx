import { useRef } from 'react';

const BlankSection = () => {
    const sectionRef = useRef<HTMLDivElement>(null);

    return (
        <section
            ref={sectionRef}
            className="relative min-h-screen w-full bg-[#0d0d0d] overflow-hidden flex items-center justify-center font-outfit"
        >
            <div className="relative z-10 text-center">
                <h2 className="text-white/10 text-4xl font-light tracking-widest uppercase selection:bg-white selection:text-black">
                    Blank Canvas
                </h2>
            </div>
        </section>
    );
};

export default BlankSection;
