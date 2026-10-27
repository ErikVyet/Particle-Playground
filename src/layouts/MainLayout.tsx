import { Box, Container, Stack } from '@mui/material';
import { Outlet } from 'react-router-dom';
import NavList from '../components/common/NavList';
import { NAVIGATIONS } from '../constants/navigations';
import { SCROLL_BAR } from '../constants/style';

export default function MainLayout() {

    return (
        <Container className="min-h-screen max-h-max overflow-hidden" maxWidth={false} disableGutters>
            <Stack className="w-full h-screen" direction={"row"}>
                <Box className={`flex-2 h-full border-r border-zinc-700 overflow-auto ${SCROLL_BAR}`}>
                    <NavList navigations={NAVIGATIONS}/>
                </Box>
                <Box className={`flex-5 h-full px-8 py-6 overflow-x-hidden overflow-y-auto ${SCROLL_BAR}`}>
                    <Outlet/>
                </Box>
            </Stack>
        </Container>
    );
}