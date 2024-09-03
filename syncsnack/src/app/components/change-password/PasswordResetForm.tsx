"use client";
import { Box, Button, FormControl, FormLabel, Input, Text, VStack, useToast } from '@chakra-ui/react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { useFormState } from 'react-dom';
import { handleChangePassword } from '@/app/server-actions/change-password';
import CustomPasswordInput from './CustomPasswordInput';

const initialState: any = {
  message: null,
  errors: null,
};

export default function PasswordResetForm({ searchParams }: { searchParams: any }) {
  const t = useTranslations('ChangePasswordPage');
  
  const [state, formAction] = useFormState(handleChangePassword, initialState);

  // State to manage input values and button enabled state
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  // Effect to check if the button should be enabled
  useEffect(() => {
    if (newPassword && confirmPassword && newPassword === confirmPassword) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [newPassword, confirmPassword]);

  return (
    <form action={formAction}>
      <VStack spacing={4}>
        <Box width="100%">
          <FormControl className="mb-4">
            <FormLabel>
              {t('enterPassword')}:
            </FormLabel>
            <CustomPasswordInput 
              name="newPassword" 
              id="newPassword" 
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </FormControl>
        </Box>

        <Box width="100%">
          <FormControl className="mb-4">
            <FormLabel>
              {t('confirmPassword')}:
            </FormLabel>
            <CustomPasswordInput 
              name="confirmPassword" 
              id="confirmPassword" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </FormControl>
        </Box>

        {state && <Text textColor={"red.500"}>{state.message}</Text>}

        <Button
          type="submit"
          colorScheme="xblue"
          width="100%"
          mt={4}
          isDisabled={isButtonDisabled} // Button is disabled if passwords don't match
        >
          {t('resetPasswdButton')}
        </Button>
      </VStack>
      <Input type="hidden" name="passwordResetTokenId" value={searchParams.passwordResetTokenId} />
      <Input type="hidden" name="resetCode" value={searchParams.resetCode} />
    </form>
  );
}
