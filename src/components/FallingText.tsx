import { useRef, useState, useEffect } from 'react';
import Matter from 'matter-js';

interface FallingTextProps {
    text?: string;
    highlightWords?: string[];
    trigger?: 'auto' | 'scroll' | 'click' | 'hover';
    backgroundColor?: string;
    wireframes?: boolean;
    gravity?: number;
    mouseConstraintStiffness?: number;
    fontSize?: string;
    threshold?: number;
}

const FallingText: React.FC<FallingTextProps> = ({
    text = '',
    highlightWords = [],
    trigger = 'auto',
    backgroundColor = 'transparent',
    wireframes = false,
    gravity = 1,
    mouseConstraintStiffness = 0.2,
    fontSize = '1rem',
    threshold = 0.1
}) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const textRef = useRef<HTMLDivElement | null>(null);
    const canvasContainerRef = useRef<HTMLDivElement | null>(null);

    const [effectStarted, setEffectStarted] = useState(false);

    useEffect(() => {
        if (!textRef.current) return;
        const words = text.split(' ');

        const newHTML = words
            .map(word => {
                const isHighlighted = highlightWords.some(hw => word.startsWith(hw));
                return `<span
          class="inline-block mx-[2px] select-none ${isHighlighted ? 'text-cyan-500 font-bold' : ''}"
        >
          ${word}
        </span>`;
            })
            .join(' ');

        textRef.current.innerHTML = newHTML;
    }, [text, highlightWords]);

    useEffect(() => {
        if (trigger === 'auto') {
            setEffectStarted(true);
            return;
        }
        if (trigger === 'scroll' && containerRef.current) {
            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        setEffectStarted(true);
                        observer.disconnect();
                    }
                },
                { threshold }
            );
            observer.observe(containerRef.current);
            return () => observer.disconnect();
        }
    }, [trigger, text]);

    useEffect(() => {
        if (!effectStarted) return;

        const { Engine, Render, World, Bodies, Runner, Mouse, MouseConstraint } = Matter;

        if (!containerRef.current || !canvasContainerRef.current || !textRef.current) return;

        const containerRect = containerRef.current.getBoundingClientRect();
        const width = containerRect.width;
        const height = containerRect.height;

        if (width <= 0 || height <= 0) return;

        const engine = Engine.create();
        engine.world.gravity.y = gravity;

        const render = Render.create({
            element: canvasContainerRef.current,
            engine,
            options: {
                width,
                height,
                background: backgroundColor,
                wireframes
            }
        });

        const boundaryOptions = {
            isStatic: true,
            render: { fillStyle: 'transparent' }
        };
        const floor = Bodies.rectangle(width / 2, height + 25, width, 50, boundaryOptions);
        const leftWall = Bodies.rectangle(-25, height / 2, 50, height, boundaryOptions);
        const rightWall = Bodies.rectangle(width + 25, height / 2, 50, height, boundaryOptions);
        const ceiling = Bodies.rectangle(width / 2, -25, width, 50, boundaryOptions);

        const wordSpans = textRef.current.querySelectorAll('span');
        const wordBodies = Array.from(wordSpans).map(elem => {
            const rect = elem.getBoundingClientRect();

            const x = rect.left - containerRect.left + rect.width / 2;
            const y = rect.top - containerRect.top + rect.height / 2;

            const body = Bodies.rectangle(x, y, rect.width, rect.height, {
                render: { fillStyle: 'transparent' },
                restitution: 0.8,
                frictionAir: 0.005,
                friction: 0.1
            });

            Matter.Body.setVelocity(body, {
                x: (Math.random() - 0.5) * 4,
                y: 0
            });
            Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.05);

            return { elem, body };
        });

        // Prepare elements for absolute positioning
        wordBodies.forEach(({ elem }) => {
            elem.style.position = 'absolute';
            elem.style.visibility = 'visible';
        });

        const mouse = Mouse.create(containerRef.current);
        const mouseConstraint = MouseConstraint.create(engine, {
            mouse,
            constraint: {
                stiffness: mouseConstraintStiffness,
                render: { visible: false }
            }
        });

        World.add(engine.world, [floor, leftWall, rightWall, ceiling, mouseConstraint, ...wordBodies.map(wb => wb.body)]);

        const runner = Runner.create();
        Runner.run(runner, engine);
        Render.run(render);

        let animationId: number;
        const updateLoop = () => {
            wordBodies.forEach(({ body, elem }) => {
                const { x, y } = body.position;
                elem.style.left = `${x}px`;
                elem.style.top = `${y}px`;
                elem.style.transform = `translate(-50%, -50%) rotate(${body.angle}rad)`;
            });
            animationId = requestAnimationFrame(updateLoop);
        };
        updateLoop();

        return () => {
            cancelAnimationFrame(animationId);
            Render.stop(render);
            Runner.stop(runner);
            if (render.canvas && canvasContainerRef.current) {
                canvasContainerRef.current.removeChild(render.canvas);
            }
            World.clear(engine.world, false);
            Engine.clear(engine);
        };
    }, [effectStarted, gravity, wireframes, backgroundColor, mouseConstraintStiffness]);

    const handleTrigger = () => {
        if (!effectStarted && (trigger === 'click' || trigger === 'hover')) {
            setEffectStarted(true);
        }
    };

    return (
        <div
            ref={containerRef}
            className="relative z-[1] w-full h-full cursor-default text-center pt-12 overflow-hidden"
            onClick={trigger === 'click' ? handleTrigger : undefined}
            onMouseEnter={trigger === 'hover' ? handleTrigger : undefined}
        >
            <div
                ref={textRef}
                className="inline-block"
                style={{
                    fontSize,
                    lineHeight: 1.6
                }}
            />
            <div className="absolute top-0 left-0 z-0 pointer-events-none" ref={canvasContainerRef} />
        </div>
    );
};

export default FallingText;
