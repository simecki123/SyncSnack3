"use client";
import { Box, Button, FormControl, FormLabel, Input, Text, VStack, useToast } from '@chakra-ui/react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useFormState } from 'react-dom';
import { handleChangePassword } from '@/app/server-actions/changePassword';
import CustomPasswordInput from './changePasswordInput';

const initialState: any = {
  message: null,
  errors: null,
};

export default function PasswordResetForm({ searchParams }: { searchParams: any }) {
  const t = useTranslations('ChangePasswordPage');
  
  const [state, formAction] = useFormState(handleChangePassword, initialState);

  return (
    <form action={formAction}>
      <VStack spacing={4}>
        <Box width="100%">
          <FormControl className="mb-4">
            <FormLabel>
              {t('enterPassword')}:
            </FormLabel>
            <CustomPasswordInput name="newPassword" id="newPassword" />
          </FormControl>
        </Box>

        <Box width="100%">
          <FormControl className="mb-4">
            <FormLabel>
              {t('confirmPassword')}:
            </FormLabel>
            <CustomPasswordInput name="confirmPassword" id="confirmPassword" />
          </FormControl>
        </Box>

        {state && <Text textColor={"red.500"}>{state.message}</Text>}

        <Button
          type="submit"
          colorScheme="xblue"
          width="100%"
          mt={4}
        >
          {t('resetPasswdButton')}
        </Button>
      </VStack>
      <Input type="hidden" name="passwordResetTokenId" value={searchParams.passwordResetTokenId} />
      <Input type="hidden" name="resetCode" value={searchParams.resetCode} />
    </form>
  );
}
