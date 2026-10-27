import { Box, Collapse, List, ListItem, OutlinedInput, Stack, Typography } from "@mui/material";
import { ExpandMore, Folder, FolderOpen, Search } from "@mui/icons-material";
import { OUTLINED_INPUT_COMMON_PROPS } from "../../constants/props";
import { FONT_FAMILY, ICON_SIZE, MUTUAL_TEXT_COLOR, PRIMARY_TEXT_COLOR } from "../../constants/style";
import type { INavigation } from "../../interfaces/INavigation";
import { useNavigate } from "react-router-dom";
import { useMemo, useState, type MouseEvent } from "react";
import { motion } from "motion/react";

type NavListItemProps = {
    navigation: INavigation
}

function NavListItem({ navigation }: NavListItemProps) {
    const navigate = useNavigate();

    const [openSubs, setOpenSubs] = useState(false);

    const hasSubs = useMemo(() => navigation.subs && navigation.subs.length, [navigation]);

    const handleNavigateClick = (event: MouseEvent<HTMLLIElement>) => {
        event.stopPropagation();
        if (navigation.path) {
            navigate(navigation.path);
        }
        else {
            setOpenSubs(prev => !prev);
        }
    };

    return (
        <ListItem className={"rounded-sm flex-col! hover:bg-zinc-800/50 duration-200 cursor-pointer"} onClick={handleNavigateClick}>
            <Stack className="size-full justify-between items-center" direction={"row"}>
                <Stack className="items-center" direction={"row"} spacing={1.5}>
                    {hasSubs! > 0 && (
                        openSubs ? (
                            <FolderOpen className={`${ICON_SIZE} ${PRIMARY_TEXT_COLOR}`} />
                        ) : (
                            <Folder className={`${ICON_SIZE} ${PRIMARY_TEXT_COLOR}`} />
                        )
                    )}
                    <Typography className={`${FONT_FAMILY} ${PRIMARY_TEXT_COLOR}`}>{navigation.label}</Typography>
                </Stack>
                {hasSubs && (
                    <ExpandMore className={`${ICON_SIZE} ${PRIMARY_TEXT_COLOR}`} component={motion.svg} initial={{ rotate: "0deg" }} animate={{ rotate: openSubs ? "180deg" : "0deg" }} />
                )}
            </Stack>
            {hasSubs && (
                <Collapse className="relative w-full pl-6.5" in={openSubs}>
                    <NavList navigations={navigation.subs} main={false} />
                    <Box className="absolute top-0 left-2.5 h-full pt-2 pb-0.5">
                        <Box className="h-full border-l border-zinc-400" />
                    </Box>
                </Collapse>
            )}
        </ListItem>
    );
}

type NavListProps = {
    navigations: INavigation[] | undefined,
    main?: boolean
}

export default function NavList({ navigations, main = true }: NavListProps) {
    return (
        <>
            {main && (
                <Box className="relative p-4">
                    <OutlinedInput className="pr-6!" placeholder={"Search..."} {...OUTLINED_INPUT_COMMON_PROPS}/>
                    <Search className={`absolute top-1/2 right-6.5 -translate-y-1/2 ${ICON_SIZE} ${MUTUAL_TEXT_COLOR}`}/>
                </Box>
            )}
            {navigations && navigations.length > 0 && (
                <List className={`${!main && 'pt-2!'}`} disablePadding>
                    {navigations.map(nav => 
                        <NavListItem navigation={nav} key={nav.id}/>
                    )}
                </List>
            )}
        </>
    );
}