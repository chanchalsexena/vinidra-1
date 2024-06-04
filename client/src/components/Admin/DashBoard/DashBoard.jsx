import { Grid } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import cursor from '../../../assets/images/cursor.png';
import { SideBar } from '../../../index';
const DashBoard = () => {
    return (
        <Grid
            minH="100vh"
            templateColumns={['1fr', '5fr', '1fr']}
            css={{
                cursor: `url(${cursor}), auto`,
            }}
        >
            <motion.div
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                border={"2px solid red"}
            >
                <SideBar />
            </motion.div>
        </Grid>
    );
};

export default DashBoard;
