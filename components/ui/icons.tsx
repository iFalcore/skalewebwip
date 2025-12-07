import { cn } from "@/lib/utils";

const IconBase = ({ children, className, ...props }: { children: React.ReactNode, className?: string, props?: React.SVGProps<SVGSVGElement> }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className={cn("h-8 w-8", className)} 
        {...props}
    >
        {children}
    </svg>
);


export const SkaleChainsIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <IconBase {...props}>
        <path d="M8.5 10.5l-5 3-3.5-2 5-3L8.5 6.5l3.5 2-3.5 2zM15.5 10.5l5 3 3.5-2-5-3-3.5 2 3.5 2zM12 14.5l-5 3-3.5-2 5-3 3.5 2 3.5-2 5 3 3.5 2-5 3-3.5-2-3.5 2z" />
    </IconBase>
);

export const HubChainsIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <IconBase {...props}>
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        <path d="M12 7a5 5 0 100 10 5 5 0 000-10z" />
        <path d="M12 2a10 10 0 100 20 10 10 0 000-20z" />
    </IconBase>
);

export const FairIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <IconBase {...props}>
        <path d="M3 3h18v18H3z" />
        <path d="M10 3v18" />
        <path d="M10 9h8" />
    </IconBase>
);
