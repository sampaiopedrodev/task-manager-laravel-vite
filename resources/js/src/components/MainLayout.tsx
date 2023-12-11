import React from "react";
import { Box, Paper } from "@mui/material";
import Topbar from "./TopBar";

const MainLayout = (props) => {
    return (
        <>
            <Topbar />
            <Box p={2} pt={'70px'}>
                {props.children}
            </Box>
        </>
    );
}
 
export default MainLayout;