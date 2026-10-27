import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import IntroductionView from './views/IntroductionView';
import ArchimedeanSpiralView from './views/ArchimedeanSpiralView';
import DashBoardView from './views/DashboardView';

export default function App() {
    const browserRouter = createBrowserRouter(
        createRoutesFromElements(
            <Route>
                <Route element={<MainLayout/>}>
                    <Route index element={<IntroductionView/>}/>
                    <Route path={"particles"}>
                        <Route path={"archimedean-spiral"} element={<ArchimedeanSpiralView/>}/>
                    </Route>
                    <Route path={"others"}>
                        <Route path={"dashboard"} element={<DashBoardView/>}/>
                    </Route>
                </Route>
            </Route>
        )
    );

    return (
        <RouterProvider router={browserRouter}/>
    );
}