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
            // {
            //     id: "nav-particles-2",
            //     label: "Cloud",
            //     path: "/particles/cloud"
            // }
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
            },
            {
                id: "nav-others-2",
                label: "Dices",
                path: "/others/dices"
            }
        ]
    }
];