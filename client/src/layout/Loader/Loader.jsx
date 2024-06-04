import { Spinner, VStack } from '@chakra-ui/react';
import PropTypes from 'prop-types';

const Loader = ({ color = 'green.500' }) => (
    <VStack justifyContent="center" h="100vh">
        <div style={{ transform: 'scale(4)' }}>
            <Spinner speed="0.65s" thickness="2px" emptyColor="transparent" color={color} size="xl" />
        </div>
    </VStack>
);
Loader.propTypes = {
    color: PropTypes.string,
};
export default Loader;