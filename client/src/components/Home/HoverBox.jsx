import React, { useState } from 'react';
import { Box, Heading, Text, Flex, Image } from '@chakra-ui/react';

const HoverBox = ({ children, bgColor, imageSrc }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Box
      bg={isHovered ? bgColor : 'themecolor'}
      borderRadius='lg'
      p='5'
      boxShadow='lg'
      textAlign='center'
      w='100%'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
      {isHovered && (
        <Flex
          bg='blue.100'
          borderRadius='lg'
          p='1'
          w='100%'
          alignItems='center'
          justifyContent='center'
          transition='all 0.3s ease-in-out'
          transitionDelay='0.2s' // Add this line to increase the hover delay
          transform={isHovered ? 'scale(1.1)' : 'none'}
        >
          <Image
            src={imageSrc}
            alt='card photo'
            borderRadius='lg'
            boxSize='200px'
            transition='all 0.5s ease-in-out'
            transform={isHovered ? 'scale(1.1)' : 'none'}
          />
        </Flex>
      )}
    </Box>
    



    
  );
};

export default HoverBox;