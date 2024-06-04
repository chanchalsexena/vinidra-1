import React from 'react';
import { Box, Container, Stack, Text, Link, useColorModeValue } from '@chakra-ui/react';
import { FaTwitter, FaYoutube, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    
    <Box
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}
      borderTopWidth={1}
      borderStyle={'solid'}
      borderColor={useColorModeValue('gray.200', 'gray.700')}>
      <Container as={Stack} maxW={'6xl'} py={10}>
        <Stack direction={{ base: 'column', md: 'row' }} spacing={4} justify={{ md: 'space-between' }} align={{ md: 'center' }}>
        <Text
  bgGradient='linear(to-l, #7928CA, #FF0080)'
  bgClip='text'
  fontSize='5xl'
  fontWeight='extrabold'
>
  VINIDRA
</Text>

          <Stack direction={'column'} spacing={2}>
            <Text  bgGradient='linear(to-l, #7928CA, #FF0080)'
  bgClip='text'
  fontSize='1xl'
  fontWeight='extrabold'>© 2023 VINIDRA .All rights reserved</Text>
            <Text >1 Main St, bengaluru, INDIA , 560064</Text>
            <Text >(123) 456-7890</Text>
            <Text><Link href="mailto:support@vinidra.com" isExternal>support@vinidra.com</Link></Text>
          </Stack>
          
          <Stack direction={'row'} spacing={6}>
            <Link href={'#'} isExternal>
              <FaTwitter />
            </Link>
            <Link href={'#'} isExternal>
              <FaYoutube />
            </Link>
            
            <Link href={'#'} isExternal>
              <FaInstagram />
            </Link>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;