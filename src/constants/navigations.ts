import type { INavigation } from "../interfaces/INavigation";

export const NAVIGATIONS: INavigation[] = [
    {
        id: "nav-intro",
        label: "Introduction",
        path: "/"
    },
    {
        id: "nav-get-started",
        label: "Get Started",
        path: "/get-started"
    },
    {
        id: "nav-particles",
        label: "Particles",
        subs: [
            {
                id: "nav-particles-1",
                label: "Archimedean Spiral",
                path: "/particles/archimedean-spiral"
            },
            {
                id: "nav-particles-2",
                label: "Explosion Click",
                path: "/particles/explosion-click"
            }
        ]
    },
    {
        id: "nav-others",
        label: "Others",
        subs: [
            {
                id: "nav-others-1",
                label: "Dashboard",
                path: "/others/dashboard"
            }
        ]
    }
];