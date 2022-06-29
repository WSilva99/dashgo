import { FormControl, FormErrorMessage, FormLabel, Input as ChakraInput, InputProps as ChakraInputProps } from "@chakra-ui/react";
import { forwardRef, ForwardRefRenderFunction, useEffect } from "react";
import { FieldError } from 'react-hook-form'

interface InputProps extends ChakraInputProps{
  name: string;
  label?: string;
  error?: FieldError;
}



const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = ({name, label, error, ...rest}, ref) => {

  useEffect(() => {
    console.log(error);
  }, [error])

  return (
    <FormControl isInvalid={!!error}>
      { !!label && <FormLabel htmlFor={name}>{label}</FormLabel>}
      <ChakraInput
        id={name}
        name={name}
        focusBorderColor='teal.500'
        bgColor="gray.900"
        size="lg"
        variant="filled"
        _hover={{
          bgColor: 'gray.900'
        }}
        ref={ref}
        {...rest}
      />
      { !!error && (
        <FormErrorMessage>
          { error.message }
        </FormErrorMessage>
      )}
    </FormControl>
  )
}

export const Input = forwardRef(InputBase)