"use client";
import { fetchImproved } from "@/app/server-actions/fetch-improved";
import { auth } from "@/commons/auth";
import { Avatar, Box, Button, Wrap, WrapItem, Text } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import React, { useState } from "react";

export default function ProfilePageButton({ imageUrl }: { imageUrl: string }) {

    const t = useTranslations('ProfilePageButton');
	const [isHovered, setIsHovered] = useState(false);

	function handleGoToProfilePage() {}

	return (
		<Box
			className="flex flex-col space-y-2 p-2 pl-2"
			textAlign="center"
			my={4}
			position="absolute" // Absolute positioning to anchor near the bottom
			bottom="55" // Not fully at the bottom, leave space for other components
			
			boxSize={14}
		>
			<Button
				onClick={handleGoToProfilePage}
				boxSize={14}
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
				borderRadius="full"
				bg="xblue.500"
				color="white"
				_hover={{ bg: "xorange.400", width: "200px" }}
				_active={{ bg: "xblue.600" }}
				width={isHovered ? "200px" : "14"}
				height="14"
				transition="width 0.3s ease-in-out, background-color 0.3s ease-in-out"
				padding={isHovered ? "6" : "0"}
				display="flex"
				justifyContent={isHovered ? "space-between" : "center"}
				alignItems="center"
				boxShadow="lg"
				overflow="hidden"
				position="absolute" // Keep absolute to avoid affecting other elements
				left="2" // Aligned within the parent container
			>
				<Avatar
					name="User Image"
					src={imageUrl}
					size={isHovered ? "md" : "lg"}
				/>

				{isHovered && (
					<Text
						ml={3}
						fontWeight="bold"
						fontSize="sm"
						transition="opacity 0.3s ease-in-out"
					>
						{t('Go-to-profile-button')}
					</Text>
				)}
			</Button>
		</Box>
	);
}
