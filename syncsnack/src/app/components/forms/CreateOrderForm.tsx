import React from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Radio,
  RadioGroup,
  Stack,
  Textarea,
  Button,
  VStack,
  Text,
} from "@chakra-ui/react";
import { useFormState } from "react-dom";
import { handleCreateOrder } from "@/app/server-actions/create-order";

const initialState: any = {
  message: "",
  errors: "",
};

export default function CreateOrderForm() {
  const [slider1Value, setSlider1Value] = React.useState(0);
  const [slider2Value, setSlider2Value] = React.useState(0);
  const [coffeeType, setCoffeeType] = React.useState("turkish");
  const [description, setDescription] = React.useState("");
  const [state, formAction] = useFormState(handleCreateOrder, initialState);

  return (
    <Box className="max-w-md mx-auto mt-8 rounded-lg">
      <form action={formAction}>
        <VStack spacing={6} align="stretch">
          <FormControl>
            <FormLabel>Milk</FormLabel>
            <Slider
              aria-label="slider-1"
              colorScheme="xblue"
              min={0}
              max={5}
              step={1}
              value={slider1Value}
              onChange={(v) => setSlider1Value(v)}
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
            <Text className="text-sm text-gray-600 mt-1">
              Value: {slider1Value}
            </Text>
          </FormControl>

          <FormControl>
            <FormLabel>Sugar</FormLabel>
            <Slider
              aria-label="slider-2"
              colorScheme="xorange"
              min={0}
              max={5}
              step={1}
              value={slider2Value}
              onChange={(v) => setSlider2Value(v)}
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
            <Text className="text-sm text-gray-600 mt-1">
              Value: {slider2Value}
            </Text>
          </FormControl>

          <FormControl as="fieldset">
            <RadioGroup value={coffeeType} onChange={setCoffeeType}>
              <Stack direction="row">
                <Radio value="turkish" colorScheme="xblue">
                  Turkish
                </Radio>
                <Radio value="latte" colorScheme="xorange">
                  Latte
                </Radio>
                <Radio value="macchiato" colorScheme="gray">
                  Macchiato
                </Radio>
              </Stack>
            </RadioGroup>
          </FormControl>

          <FormControl>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter your description here"
              size="sm"
              focusBorderColor="xblue.100"
            />
          </FormControl>

          <input type="hidden" value={slider1Value} name="milk" />
          <input type="hidden" value={slider2Value} name="sugar" />
          <input type="hidden" value={description} name="desc" />
          <input type="hidden" value={coffeeType} name="type" />

          <Button type="submit" colorScheme="xblue" className="w-full mb-2">
            Submit
          </Button>
          <Text>{state && state.message}</Text>
        </VStack>
      </form>
    </Box>
  );
}
