"use client";
import React, { useState } from "react";
import {
	Box,
	Button,
	Flex,
	useToast,
	Stepper,
	Step,
	StepIndicator,
	StepTitle,
	StepStatus,
	StepNumber,
	StepIcon,
	StepSeparator,
} from "@chakra-ui/react";
import UserProfile from "./step-one/UserProfile";
import GroupInformation from "./step-two/GroupInformation";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";

export default function SetProfileComponent() {
	const t = useTranslations("SetProfileComponentPage");

	const steps = [
		{ title: t("stepOneTitle"), component: UserProfile },
		{ title: t("stepTwoTitle"), component: GroupInformation },
	];

	const [activeStep, setActiveStep] = useState(0);
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		groupChoice: "",
		groupName: "",
		groupPassword: "",
		groupDescription: "",
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
	const showToast = (
		title: string,
		description: string,
		status: "success" | "error" | "warning" | "info"
	) => {
		toast({
			title,
			description,
			status,
			duration: 5000,
			isClosable: true,
			position: "top",
		});
	};

	/**
	 * Hndles submit of the button for setting the profile up
	 */
	const handleSubmit = async () => {
		try {
			const userId = searchParams.get("userId"); // Assuming userId is in the URL
			await createUserProfile(userId);

			let groupId;
			if (formData.groupChoice === "create") {
				groupId = await createGroup();
			} else {
				groupId = await joinGroup(userId);
			}

			console.log("groupId ", groupId);

			if (!groupId) {
				showToast("Error", "Failed to create or join group", "error");
				return;
			}

			showToast("Success", "Profile setup successful!", "success");
			setTimeout(() => {
				router.push("/login");
			}, 2000);
		} catch (error: any) {
			console.error("Profile setup error:", error);
		}
	};

	const handleSubmitWithoutGroup = async () => {
		try {
			const userId = searchParams.get("userId"); // Assuming userId is in the URL
			await createUserProfile(userId);
			router.push("/login");
		} catch (error: any) {
			console.error("Profile setup error:", error);
		}
	};

	/**
	 * Separate function for creating group for user
	 */
	const createGroup = async () => {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/groups/create`,
			{
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					name: formData.groupName,
					password: formData.groupPassword,
					description: formData.groupDescription,
				}),
			}
		);

		if (!response.ok) {
			throw new Error("Failed to create group");
		}

		const groupData = await response.json();
		return groupData.groupId;
	};

	/**
	 * Separate function for user to join group
	 */
	const joinGroup = async (userId: string | null): Promise<string> => {
		try {
			console.log("groupName: ", formData.groupName);
			console.log("groupPassword: ", formData.groupPassword);

			const response = await fetch(
				`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/groups/join`,
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						userId: userId,
						name: formData.groupName,
						password: formData.groupPassword,
					}),
				}
			);

			console.log("response ", response);

			if (response.status === 400) {
				// handle all errors when backend is done with return of specific errors
			}

			if (!response.ok) {
				throw new Error("Failed to join group");
			}

			const groupData = await response.json();
			return groupData.groupId;
		} catch (error: any) {
			console.error("Error joining group:", error.message);
			showToast(
				"Error",
				error.message || "An unexpected error occurred",
				"error"
			);
			throw error;
		}
	};

	/**
	 * Last step in our registration process. Creating user profile. If user didnt verify email backend will return forbidden.
	 */
	const createUserProfile = async (userId: string | null) => {
		const userProfileData = new FormData();
		const jsonBlob = new Blob(
			[
				JSON.stringify({
					userId,
					firstName: formData.firstName,
					lastName: formData.lastName,
				}),
			],
			{ type: "application/json" }
		);

		userProfileData.append("body", jsonBlob, "body.json");

		const response = await fetch(
			`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/profiles/create`,
			{
				method: "POST",
				body: userProfileData,
			}
		);

		console.log("userCreation response ", response);

		if (response.status === 409) {
			showToast("Error", "User profile already exists", "error");
		}

		if (!response.ok && response.status !== 409) {
			throw new Error("Failed to create user profile");
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
				if (formData.groupChoice === "join") {
					return formData.groupName && formData.groupPassword;
				} else if (formData.groupChoice === "create") {
					return (
						formData.groupName &&
						formData.groupDescription &&
						formData.groupPassword
					);
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
			<CurrentStepComponent
				formData={formData}
				handleInputChange={handleInputChange}
			/>
			<Flex
				flexDirection={{ base: "column", md: "row" }}
				justifyContent={{ base: "center", md: "space-between" }}
				alignItems={{ base: "stretch", md: "center" }}
				mt={6}
				gap={{ base: 4, md: 0 }}
				position="relative" // Ensure positioning is relative for absolute positioning on md screens
			>
				<Button
					onClick={handleBack}
					isDisabled={activeStep === 0}
					width={{ base: "100%", md: "auto" }} // Full width on small screens, auto on medium
					position={{ md: "absolute" }}
					left={{ md: 0 }}
				>
					{t("BackButton")}
				</Button>

				{activeStep === 0 && (
					<Button
						colorScheme="xorange"
						onClick={handleSubmitWithoutGroup}
						mb={{ base: 4, md: 0 }} // Margin bottom on small screens
						mx={{ md: "auto" }} // Center the button on medium screens
						width={{ base: "100%", md: "auto" }} // Full width on small screens, auto on medium
					>
						{t("SubmitWithoutGroupButton")}
					</Button>
				)}

				{activeStep === steps.length - 1 ? (
					<Button
						colorScheme="xblue"
						onClick={handleSubmit}
						isDisabled={!isStepComplete(activeStep)}
						width={{ base: "100%", md: "auto" }} // Full width on small screens, auto on medium
						position={{ md: "absolute" }}
						right={{ md: 0 }}
					>
						{t("SetupProfile")}
					</Button>
				) : (
					<Button
						colorScheme="xblue"
						onClick={handleNext}
						isDisabled={!isStepComplete(activeStep)}
						width={{ base: "100%", md: "auto" }} // Full width on small screens, auto on medium
						position={{ md: "absolute" }}
						right={{ md: 0 }}
					>
						{t("Next")}
					</Button>
				)}
			</Flex>
		</Box>
	);
}
