"use client";
import { Tr, Td, Button, Box, Text, useColorModeValue } from "@chakra-ui/react";
import { useState } from "react";
import Modal from "../../modals/Modal";
import OrderTypePretty from "../order-type-preatty/OrderTypePretty";
import StatusPretty from "../status-preatty/StatusPretty";
import RatingPretty from "../rating-preatty/RatingPretty";
import OrderRateModalComponent from "../order-modal-component/OrderRateModalComponent";
import OrderDescriptionModalComponent from "../order-modal-component/OrderDescriptionModalComponent";

export default function OrderRowMobile({ order, accessToken }: any) {
  const [isRateModalOpened, setRateModalOpen] = useState(false);
  const [isDescriptionModalOpened, setDescriptionModalOpen] = useState(false);
  const [orderRating, setOrderRating] = useState(order.rating);

  const handleRateCloseModal = () => {
    setRateModalOpen(false);
  };

  const handleDescriptionCloseModal = () => {
    setDescriptionModalOpen(false);
  };

  const bgGradient = useColorModeValue(
    "linear(to-r, white.200, white.400)",
    "linear(to-r, gray.700, gray.900)"
  );
  const boxShadowColor = useColorModeValue("xorange.400", "xorange.600");
  const textColor = useColorModeValue("gray.900", "white");

  return (
    <>
      <Box
        className="p-6 mb-6 rounded-lg shadow-lg transition-transform duration-300 ease-in-out hover:scale-105 cursor-pointer"
        bgGradient={bgGradient}
        boxShadow={`0 6px 20px ${boxShadowColor}`}
        borderRadius="lg"
        _hover={{
          transform: "scale(1.05)",
          boxShadow: `0 8px 25px ${boxShadowColor}`,
        }}
        onClick={() => setDescriptionModalOpen(true)}
      >
        <Box className="flex justify-between items-center">
          <Text
            className="font-semibold text-2xl"
            color={textColor}
            fontFamily="heading"
          >
            <OrderTypePretty orderType={order.eventType} />
          </Text>
          <Text color={useColorModeValue("gray.600", "gray.400")}>
            {formatDate(order.createdAt)}
          </Text>
        </Box>

        <Box className="mt-4">
          <StatusPretty statusType={order.status} />
        </Box>

        <Text
          className="mt-4 text-lg leading-relaxed"
          color={useColorModeValue("gray.800", "gray.300")}
          fontFamily="body"
        >
          {order.additionalOptions?.orderDetails
            ? JSON.stringify(order.additionalOptions.orderDetails)
            : JSON.stringify(order.additionalOptions.description)}
        </Text>

        <Box className="mt-4 flex justify-end">
          {orderRating ? (
            <RatingPretty rating={orderRating} />
          ) : (
            <Button
              colorScheme="yellow"
              size="md"
              variant="solid"
              onClick={(e) => {
                e.stopPropagation();
                setRateModalOpen(true);
              }}
              fontFamily="heading"
            >
              Rate
            </Button>
          )}
        </Box>
      </Box>

      {isRateModalOpened && (
        <Modal isOpen={isRateModalOpened} onClose={handleRateCloseModal}>
          <OrderRateModalComponent
            setRating={setOrderRating}
            accessToken={accessToken}
            coffeeOrderId={order.orderId}
            onClose={handleRateCloseModal}
          />
        </Modal>
      )}

      
    </>
  );
}

function objectToString(obj: any): string {
  if (typeof obj !== "object" || obj === null) {
    return String(obj);
  }

  return Object.entries(obj)
    .map(([key, value]) => {
      if (typeof value === "object" && value !== null) {
        return `${key}:\n${objectToString(value)
          .split("\n")
          .map((line) => `  ${line}`)
          .join("\n")}`;
      }
      return `${key}: ${value}`;
    })
    .join("\n");
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const oneDay = 1000 * 60 * 60 * 24;

  if (diff < oneDay) return "Today";
  if (diff < 2 * oneDay) return "Yesterday";
  if (diff < 7 * oneDay) return "A few days ago";
  if (diff < 14 * oneDay) return "Last week";
  if (diff < 30 * oneDay) return "Last month";
  if (diff < 90 * oneDay) return "More than a month ago";
  if (diff < 140 * oneDay) return "More than 3 months ago";
  if (diff < 365 * oneDay) return "More than 6 months ago";
  return "More than a year ago";
}
