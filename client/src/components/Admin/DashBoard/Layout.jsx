/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from 'react';
import { Box, IconButton, useMediaQuery } from '@chakra-ui/react';
import { FiMenu } from 'react-icons/fi';
import SideBar from './SideBar';

const Layout = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Always open on larger devices
    const [isSmallerDevice] = useMediaQuery("(max-width: 768px)");
    const sidebarRef = useRef(null);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                setIsSidebarOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <Box display="flex" justifyContent="space-between" minH="100vh">
            {isSmallerDevice && (
                <IconButton
                    icon={<FiMenu />}
                    aria-label="Open Sidebar"
                    onClick={toggleSidebar}
                    variant={"solid"}
                    size="lg"
                    position={"fixed"}
                    top={20}
                    left={6}
                    zIndex={"overlay"}
                    colorScheme='yellow'
                    rounded={"full"}
                />
            )}
            <Box flex="1" > 
                {children}
            </Box>
            <Box
                ref={sidebarRef}
                position="fixed"
                top={0}
                left={isSmallerDevice ? (isSidebarOpen ? 0 : '-50%') : 0}
                bottom={0}
                zIndex={isSmallerDevice ? 9999 : 0}
                w={isSmallerDevice ? '50%' : '250px'}
                bg={isSmallerDevice ? 'blackAlpha.900' : 'transparent'}
                transition="left 0.3s ease"
                overflowY={"auto"}
            >
                <SideBar />
            </Box>
        </Box>
    );
};

export default Layout;
