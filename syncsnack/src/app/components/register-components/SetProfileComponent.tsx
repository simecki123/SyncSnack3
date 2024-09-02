"use client";
import React, { useState } from 'react'
import { Box, Button, Flex, useToast, Stepper, Step, StepIndicator, StepTitle, StepStatus, StepNumber, StepIcon, StepSeparator } from '@chakra-ui/react';
import UserProfile from './step-one/UserProfile';
import GroupInformation from './step-two/GroupInformation';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';



export default function SetProfileComponent() {

    const t = useTranslations("SetProfileComponentPage");

    const steps = [
      { title: t('stepOneTitle'), component: UserProfile },
      { title: t('stepTwoTitle'), component: GroupInformation },
      ];

    const [activeStep, setActiveStep] = useState(0);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        groupChoice: '',
        groupName: '',
        groupPassword: '',
        groupDescription: '',
    });

    const toast = useToast();
    const router = useRouter();
    const searchParams = useSearchParams();
    const handleNext = () => setActiveStep((prev) => prev + 1);
    const handleBack = () => setActiveStep((prev) => prev - 1);

    /**
     * automatically change value of the form when user changes input values
     */
    const handleInputChange = (e: any) => {
        if (e.target) {
          const { name, value } = e.target;
          setFormData({ ...formData, [name]: value });
        } else {
          setFormData({ ...formData, groupChoice: e });
        }
      };

    // Toast message --> possible to define in separate file that will hold toast for all cases where its needed
    const showToast = (title: string, description: string, status: 'success' | 'error' | 'warning' | 'info') => {
        toast({
          title,
          description,
          status,
          duration: 5000,
          isClosable: true,
          position: 'top',
        });
      };

    /**
     * Hndles submit of the button for setting the profile up
     */
    const handleSubmit = async () => {
        try {
          let groupId;
          if (formData.groupChoice === 'create') {
            groupId = await createGroup();
          } else {
            groupId = await joinGroup();
          }
    
          if (!groupId) {
            showToast('Error', 'Failed to create or join group', 'error');
            return;
          }
    
          const userId = searchParams.get('userId'); // Assuming userId is in the URL
          await createUserProfile(userId, groupId);
    
          showToast('Success', 'Profile setup successful!', 'success');
          setTimeout(() => {
            router.push('/login');
          }, 2000);
        } catch (error: any) {
          console.error('Profile setup error:', error);
    
        }
      };


      /**
       * Separate function for creating group for user
       */
      const createGroup = async () => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/groups/create`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: formData.groupName,
            password: formData.groupPassword,
            description: formData.groupDescription,
          }),
        });
    
        if (!response.ok) {
          throw new Error('Failed to create group');
        }
    
        const groupData = await response.json();
        return groupData.groupId;
      };

      /**
       * Separate function for user to join group
       */
      const joinGroup = async (): Promise<string> => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/groups/join`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: formData.groupName,
            password: formData.groupPassword,
          }),
        });
    
        if (response.status === 404) {
          showToast('Error', 'Group not found', 'error');
          throw new Error('Group not found'); // Ensure the error is thrown to halt further processing
        }
    
        if (!response.ok) {
          throw new Error('Failed to join group');
        }
    
        const groupData = await response.json();
        return groupData.groupId;
      };

      /**
       * Last step in our registration process. Creating user profile. If user didnt verify email backend will return forbidden. 
       */
      const createUserProfile = async (userId: string | null, groupId: string) => {
        const userProfileData = new FormData();
        const jsonBlob = new Blob([JSON.stringify({
          userId,
          groupId,
          firstName: formData.firstName,
          lastName: formData.lastName,
        })], { type: 'application/json' });
    
        userProfileData.append('body', jsonBlob, 'body.json');
    
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/profiles/create`, {
          method: 'POST',
          body: userProfileData,
        });
    
        if (!response.ok) {
          throw new Error('Failed to create user profile');
        }
      };

      /**
       * Function that checks if step is completed and allows user to make progress in his registration process
       */
      const isStepComplete = (step: number) => {
        switch (step) {
          case 0:
            return formData.firstName && formData.lastName;
          case 1:
            if (formData.groupChoice === 'join') {
              return formData.groupName && formData.groupPassword;
            } else if (formData.groupChoice === 'create') {
              return formData.groupName && formData.groupDescription && formData.groupPassword;
            }
            return false;
          default:
            return false;
        }
      };
    
      const CurrentStepComponent = steps[activeStep].component;

  return (
    
        <Box className="max-w-md mx-auto mt-10 p-6  rounded-lg shadow-md">
          <Stepper index={activeStep} className="mb-8">
            {steps.map((step, index) => (
              <Step key={index}>
                <StepIndicator>
                  <StepStatus
                    complete={<StepIcon />}
                    incomplete={<StepNumber />}
                    active={<StepNumber />}
                  />
                </StepIndicator>
                <Box flexShrink="0">
                  <StepTitle>{step.title}</StepTitle>
                </Box>
                <StepSeparator />
              </Step>
            ))}
          </Stepper>
          <CurrentStepComponent formData={formData} handleInputChange={handleInputChange} />
          <Flex justifyContent="space-between" mt={6}>
            <Button onClick={handleBack} isDisabled={activeStep === 0}>
              {t("BackButton")}
            </Button>
            {activeStep === steps.length - 1 ? (
              <Button
                colorScheme="xblue"
                onClick={handleSubmit}
                isDisabled={!isStepComplete(activeStep)}
              >
                {t('SetupProfile')}
              </Button>
            ) : (
              <Button colorScheme="xblue" onClick={handleNext} isDisabled={!isStepComplete(activeStep)}>
                {t('Next')}
              </Button>
            )}
          </Flex>
        </Box>
  )
}
