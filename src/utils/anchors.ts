export function setupAnchors(lenis: any) {
    const handleGlobalClick = (e: MouseEvent) => {
        const target = (e.target as HTMLElement).closest('a[href^="#"]');
        if (!target) return;

        const href = target.getAttribute("href");
        if (href && href.length > 1 && lenis.current) {
            e.preventDefault();
            lenis.current.scrollTo(href);
        }
    };

    document.addEventListener("click", handleGlobalClick);

    return () => {
        document.removeEventListener("click", handleGlobalClick);
    };
}
