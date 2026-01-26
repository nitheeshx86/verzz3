import { ComponentPropsWithoutRef, FC, ReactNode, useRef, useState } from "react"
import { motion, MotionValue, useScroll, useTransform, useMotionValueEvent } from "framer-motion"
import { cn } from "../../lib/utils"
import { Highlighter } from "./Highlighter"

export interface TextRevealProps extends ComponentPropsWithoutRef<"div"> {
    children: string
}

export const TextReveal: FC<TextRevealProps> = ({ children, className }) => {
    const targetRef = useRef<HTMLDivElement | null>(null)
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start end", "center center"]
    })

    if (typeof children !== "string") {
        throw new Error("TextReveal: children must be a string")
    }

    const words = children.split(" ")

    return (
        <div ref={targetRef} className={cn("relative z-0 h-[120vh]", className)}>
            <div
                className={
                    "sticky top-0 mx-auto flex h-screen max-w-4xl items-center bg-transparent px-[1rem]"
                }
            >
                <span
                    className={cn(
                        "flex flex-wrap p-5 font-bold text-white/20 md:p-8 lg:p-10 leading-tight",
                        className
                    )}
                >
                    {words.map((word, i) => {
                        const totalWords = words.length;
                        // Map the reveal to finish by 80% of the progress
                        const start = (i / totalWords) * 0.8;
                        const end = start + (0.8 / totalWords);
                        return (
                            <Word key={i} progress={scrollYProgress} range={[start, end]}>
                                {word}
                            </Word>
                        )
                    })}
                </span>
            </div>
        </div>
    )
}

interface WordProps {
    children: ReactNode
    progress: MotionValue<number>
    range: [number, number]
}

const Word: FC<WordProps> = ({ children, progress, range }) => {
    const opacity = useTransform(progress, range, [0, 1])
    const [isActive, setIsActive] = useState(false)

    // Clean string for word matching (remove dots/commas)
    const cleanWord = typeof children === 'string'
        ? children.toLowerCase().replace(/[.,]/g, '')
        : '';

    const isSpecial = ['discover', 'learn', 'connect', 'safely'].includes(cleanWord);

    // Trigger highlighter when the word is mostly visible
    useMotionValueEvent(opacity, "change", (latest) => {
        if (isSpecial && latest > 0.9) {
            setIsActive(true)
        } else if (isSpecial && latest < 0.1) {
            setIsActive(false)
        }
    })

    return (
        <span className="xl:lg-3 relative mx-1 lg:mx-1.5 inline-block">
            <span className="absolute opacity-30 text-white">{children}</span>
            <motion.span
                style={{ opacity: opacity }}
                className={cn(
                    "relative text-white",
                    isSpecial && "px-1"
                )}
            >
                {isSpecial ? (
                    <Highlighter
                        active={isActive}
                        action={cleanWord === 'safely' ? 'underline' : 'highlight'}
                        color={cleanWord === 'safely' ? 'rgba(99, 102, 241, 0.4)' : 'rgba(0, 102, 255, 0.4)'}
                        strokeWidth={3}
                        iterations={3}
                    >
                        {children}
                    </Highlighter>
                ) : (
                    children
                )}
            </motion.span>
        </span>
    )
}
