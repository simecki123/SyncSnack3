"use client";

import { Box, Button, Input, Text, VStack, useToast } from '@chakra-ui/react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import React from 'react'

export default function PasswordResetForm({ searchParams }: { searchParams: any }) {
  const t = useTranslations('ChangePasswordPage');
  const toast = useToast();
  const router = useRouter();

  /**
   * Handle submit is function that handles update of users password 
   * */  
  async function handleSubmit(formData: FormData) {


    const newPassword = formData.get('newPassword') as string;
    const confirmPassword = formData.get('confirmPassword') as string;

    console.log("new password: ", newPassword);
    console.log("confirm password: ", confirmPassword);
    console.log(searchParams)


    if (newPassword === confirmPassword) {
      try {
        const { passwordResetTokenId, resetCode } = searchParams;
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/resetPassword`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            passwordResetTokenId,
            resetCode,
            newPassword,
          }),
        });

        console.log("Response ", response);

        if (response.ok) {
          toast({
            title: "Success",
            description: "Your new password has been successfully updated",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "top",
          });
          router.push('/login');

        } else {
          toast({
            title: "Server error",
            description: "Your new password cant be updated please try again later",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "top",
          });
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Something went wrong, please try again",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      }
    } else {
      toast({
        title: "Error",
        description: "Your new password and confirm password must be the same",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }


  }

  return (
    <form action={handleSubmit}>
      <VStack spacing={4}>
        <Box width="100%">
          <Text mb={2} fontWeight="medium">{t('enterPassword')}:</Text>
          <Input
            type="password"
            name="newPassword"
            bg="gray.100"
            border="none"
            _focus={{ bg: "gray.200" }}
          />
        </Box>
        <Box width="100%">
          <Text mb={2} fontWeight="medium">{t('confirmPassword')}:</Text>
          <Input
            type="password"
            name="confirmPassword"
            bg="gray.100"
            border="none"
            _focus={{ bg: "gray.200" }}
          />
        </Box>
        <Button
          type="submit"
          colorScheme="xblue"
          width="100%"
          mt={4}
        >
          {t('resetPasswdButton')}
        </Button>
      </VStack>
    </form>
  )
}
