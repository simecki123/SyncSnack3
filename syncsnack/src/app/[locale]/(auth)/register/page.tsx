import RegisterComponent from '@/app/components/register-components/RegisterComponent';
import { Box, Container, Heading, Flex } from '@chakra-ui/react'
import { useTranslations } from 'next-intl';
import React from 'react'

export default function RegisterPage() {
    const t = useTranslations('RegisterPage');
    
    return (
        <Flex 
            minHeight="100vh" 
            width="100%" 
            alignItems="center" 
            justifyContent="center"
        >
            <Container maxW="container.md">
                <Box textAlign="center" mb={8}>
                    <Heading as="h1" size="xl">
                        {t('title')}
                    </Heading> 
                </Box>
            
                <RegisterComponent />
            
            </Container>
        </Flex>
    )
}