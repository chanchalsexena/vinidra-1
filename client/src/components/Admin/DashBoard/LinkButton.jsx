/* eslint-disable react/prop-types */
import { Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const LinkButton = ({ url, Icon, name, active }) => (
    <Link to={`/admin/${url}`}>
        <Button
            colorScheme={active ? 'purple' : 'gray'}
            variant={active ? 'solid' : 'ghost'}
            size="lg"
            leftIcon={<Icon />}
            style={{ justifyContent: 'flex-start', paddingLeft: '20px', width: '100%', textAlign: 'left' }}
            _hover={{ bg: 'purple' }}
        >
            {name}
        </Button>
    </Link>
);

export default LinkButton;