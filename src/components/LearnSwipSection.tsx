import ScrollVelocity from './ScrollVelocity';

const LearnSwipSection = () => {
    return (
        <section className="py-32 min-h-[60vh] flex items-center justify-center bg-white dark:bg-black w-full overflow-hidden">
            <div className="rotate-[-10deg] scale-150 -my-20 w-full">
                <ScrollVelocity
                    texts={['Learn Swip Connect', 'Learn Swip Connect']}
                    velocity={50}
                    className="text-black dark:text-white"
                    parallaxClassName="parallax my-4"
                />
            </div>
        </section>
    );
};

export default LearnSwipSection;
