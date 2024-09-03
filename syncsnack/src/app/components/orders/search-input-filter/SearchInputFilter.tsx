'use client'
import { MagnifyingGlassIcon } from '@heroicons/react/16/solid';
import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { debounce } from 'lodash';
import { Box, Flex, Input, InputGroup, InputLeftElement, Select } from '@chakra-ui/react';

export default function SearchInputFilter({ setInput, setStatusFilter }: any) {
  const [inputValue, setInputValue] = useState('');

  const debouncedLog = useCallback(
    debounce((value: string) => {
      setInput(value);
    }, 700),
    []
  );

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    debouncedLog(newValue);
  };

  useEffect(() => {
    return () => {
      debouncedLog.cancel();
    };
  }, [debouncedLog]);

  function handleSelectChange(event: ChangeEvent<HTMLSelectElement>): void {
    setStatusFilter(event.target.value);
  }

  return (
    <Box className="relative mb-6">
      <Flex
        direction={{ base: "column", md: "row" }}
        className="w-full"
      >
        <InputGroup size="md" className="w-full md:w-2/3 mb-2 md:mb-0 md:mr-2">
          <InputLeftElement pointerEvents="none">
            <MagnifyingGlassIcon className="h-5 w-5 text-xblue-300" />
          </InputLeftElement>
          <Input
            type="text"
            placeholder="Search"
            value={inputValue}
            onChange={handleInputChange}
            borderRadius="md"
            borderColor="xblue.200"
            _hover={{ borderColor: "xblue.300" }}
            _focus={{ borderColor: "xblue.400", boxShadow: "0 0 0 1px #5078bf" }}
            _placeholder={{ color: "xblue.100" }}
            color="xblue.100"
            fontFamily="body"
          />
        </InputGroup>
        <Select
          onChange={handleSelectChange}
          size="md"
          borderRadius="md"
          borderColor="xblue.200"
          _hover={{ borderColor: "xblue.300" }}
          _focus={{ borderColor: "xblue.400", boxShadow: "0 0 0 1px #5078bf" }}
          color="xblue.100"
          fontFamily="body"
          fontWeight="semibold"
          className="w-full md:w-1/3"
        >
          <option value="" >All</option>
          <option value="COMPLETED" >Completed</option>
          <option value="IN_PROGRESS" >In Progress</option>
          <option value="CANCELLED" >Canceled</option>
        </Select>
      </Flex>
    </Box>
  );
}
