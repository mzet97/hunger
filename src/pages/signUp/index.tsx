'use client';

import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { yupResolver } from '@hookform/resolvers/yup';
import { AuthContext } from '@/contexts/AuthContext';
import { useContext } from 'react';

import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Link,
    useToast,
    FormErrorMessage,
} from '@chakra-ui/react';
import { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import UserInput from '@/models/user/UserInput';

const schema = yup.object().shape({
    email: yup.string().email().required('E-mail is required'),
    password: yup.string().required('Password is required'),
    confirmPassword: yup
        .string()
        .required('Password confirmation is required')
        .oneOf([yup.ref('password')], 'Passwords must match'),
    name: yup.string().max(80).required('Name is required'),
    lastName: yup.string().max(80).required('Last name is required'),
    birthDate: yup.date().required('Birthdate is required'),
    street: yup.string().min(3).max(80).required('Street is required'),
    district: yup.string().min(3).max(8).required('District is required'),
    city: yup.string().min(3).max(80).required('City is required'),
    county: yup.string().min(3).max(8).required('County is required'),
    zipCode: yup.string().max(15).required('ZipCode is required'),
    latitude: yup.string().max(80).required('Latitude is required'),
    longitude: yup.string().max(80).required('Longitude is required'),
});

export default function SignUp() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<UserInput>({
        mode: 'onBlur',
        resolver: yupResolver(schema),
    });

    const toast = useToast();
    const router = useRouter();
    const { signUp } = useContext(AuthContext);

    const onSubmit = async (values: UserInput) => {
        try {
            console.log('input', values);
            await signUp({
                email: values.email,
                password: values.password,
                confirmPassword: values.confirmPassword,
                profile: {
                    name: values.name,
                    lastName: values.lastName,
                    birthDate: values.birthDate,
                    type: 2,
                },
                address: {
                    street: values.street,
                    district: values.district,
                    city: values.city,
                    county: values.county,
                    zipCode: values.zipCode,
                    latitude: values.latitude,
                    longitude: values.longitude,
                },
            });

            toast({
                title: 'Success singUp.',
                description: 'Can use the system',
                status: 'success',
                duration: 9000,
                isClosable: true,
            });

            router.push('/dashboard');
        } catch (err) {
            toast({
                title: 'Failure singUp.',
                description: 'Check password and e-mail',
                status: 'error',
                duration: 9000,
                isClosable: true,
            });
        }
    };

    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={8} mx={'auto'} maxW={'2xl'} py={1} px={1}>
                    <Stack align={'center'}>
                        <Heading fontSize={'4xl'} textAlign={'center'}>
                            Sign up
                        </Heading>
                    </Stack>
                    <Box
                        rounded={'xl'}
                        bg={useColorModeValue('white', 'gray.700')}
                        boxShadow={'xl'}
                        p={8}
                    >
                        <Stack>
                            <HStack spacing={4}>
                                <Box>
                                    <Text fontSize="2xl">Personal data</Text>
                                </Box>
                            </HStack>
                            <HStack spacing={4}>
                                <Box>
                                    <FormControl
                                        isInvalid={!!errors?.name?.message}
                                        errortext={errors?.name?.message}
                                        id="name"
                                        isRequired
                                    >
                                        <FormLabel>First Name</FormLabel>
                                        <Input
                                            type="text"
                                            placeholder="Name"
                                            {...register('name', {
                                                required: 'Required',
                                            })}
                                        />
                                        <FormErrorMessage>
                                            {errors?.name?.message}
                                        </FormErrorMessage>
                                    </FormControl>
                                </Box>
                                <Box>
                                    <FormControl
                                        isInvalid={!!errors?.lastName?.message}
                                        errortext={errors?.lastName?.message}
                                        id="lastName"
                                        isRequired
                                    >
                                        <FormLabel>Last Name</FormLabel>
                                        <Input
                                            type="text"
                                            placeholder="Last name"
                                            {...register('lastName', {
                                                required: 'Required',
                                            })}
                                        />
                                        <FormErrorMessage>
                                            {errors?.lastName?.message}
                                        </FormErrorMessage>
                                    </FormControl>
                                </Box>
                                <Box>
                                    <FormControl
                                        isInvalid={!!errors?.birthDate?.message}
                                        errortext={errors?.birthDate?.message}
                                        id="birthDate"
                                        isRequired
                                    >
                                        <FormLabel>Birth Date</FormLabel>
                                        <Input
                                            type="date"
                                            {...register('birthDate', {
                                                required: 'Required',
                                            })}
                                        />
                                        <FormErrorMessage>
                                            {errors?.birthDate?.message}
                                        </FormErrorMessage>
                                    </FormControl>
                                </Box>
                            </HStack>
                            <Stack spacing={4}>
                                <FormControl
                                    isInvalid={!!errors?.email?.message}
                                    errortext={errors?.email?.message}
                                    id="email"
                                    isRequired
                                >
                                    <FormLabel>Email address</FormLabel>
                                    <Input
                                        type="email"
                                        {...register('email', {
                                            required: 'Required',
                                        })}
                                    />
                                    <FormErrorMessage>
                                        {errors?.email?.message}
                                    </FormErrorMessage>
                                </FormControl>
                                <FormControl
                                    isInvalid={!!errors?.password?.message}
                                    errortext={errors?.password?.message}
                                    id="password"
                                    isRequired
                                >
                                    <FormLabel>Password</FormLabel>
                                    <InputGroup>
                                        <Input
                                            type={
                                                showPassword
                                                    ? 'text'
                                                    : 'password'
                                            }
                                            {...register('password', {
                                                required: 'Required',
                                            })}
                                        />
                                        <InputRightElement h={'full'}>
                                            <Button
                                                variant={'ghost'}
                                                onClick={() =>
                                                    setShowPassword(
                                                        showPassword =>
                                                            !showPassword,
                                                    )
                                                }
                                            >
                                                {showPassword ? (
                                                    <ViewIcon />
                                                ) : (
                                                    <ViewOffIcon />
                                                )}
                                            </Button>
                                        </InputRightElement>
                                    </InputGroup>
                                    <FormErrorMessage>
                                        {errors?.password?.message}
                                    </FormErrorMessage>
                                </FormControl>
                                <FormControl
                                    isInvalid={
                                        !!errors?.confirmPassword?.message
                                    }
                                    errortext={errors?.confirmPassword?.message}
                                    id="confirmPassword"
                                    isRequired
                                >
                                    <FormLabel>Confirm Password</FormLabel>
                                    <InputGroup>
                                        <Input
                                            type={
                                                showConfirmPassword
                                                    ? 'text'
                                                    : 'password'
                                            }
                                            {...register('confirmPassword', {
                                                required: 'Required',
                                            })}
                                        />
                                        <InputRightElement h={'full'}>
                                            <Button
                                                variant={'ghost'}
                                                onClick={() =>
                                                    setShowConfirmPassword(
                                                        showConfirmPassword =>
                                                            !showConfirmPassword,
                                                    )
                                                }
                                            >
                                                {showConfirmPassword ? (
                                                    <ViewIcon />
                                                ) : (
                                                    <ViewOffIcon />
                                                )}
                                            </Button>
                                        </InputRightElement>
                                    </InputGroup>
                                    <FormErrorMessage>
                                        {errors?.confirmPassword?.message}
                                    </FormErrorMessage>
                                </FormControl>
                            </Stack>
                            <HStack spacing={4}>
                                <Box>
                                    <Text fontSize="2xl">Address</Text>
                                </Box>
                            </HStack>
                            <HStack spacing={4}>
                                <Box>
                                    <FormControl
                                        isInvalid={!!errors?.street?.message}
                                        errortext={errors?.street?.message}
                                        id="street"
                                        isRequired
                                    >
                                        <FormLabel>Street</FormLabel>
                                        <Input
                                            type="text"
                                            placeholder="Street"
                                            {...register('street', {
                                                required: 'Required',
                                            })}
                                        />
                                        <FormErrorMessage>
                                            {errors?.street?.message}
                                        </FormErrorMessage>
                                    </FormControl>
                                </Box>
                                <Box>
                                    <FormControl
                                        isInvalid={!!errors?.district?.message}
                                        errortext={errors?.district?.message}
                                        id="district"
                                        isRequired
                                    >
                                        <FormLabel>District</FormLabel>
                                        <Input
                                            type="text"
                                            placeholder="District"
                                            {...register('district', {
                                                required: 'Required',
                                            })}
                                        />
                                        <FormErrorMessage>
                                            {errors?.district?.message}
                                        </FormErrorMessage>
                                    </FormControl>
                                </Box>
                                <Box>
                                    <FormControl
                                        isInvalid={!!errors?.city?.message}
                                        errortext={errors?.city?.message}
                                        id="city"
                                        isRequired
                                    >
                                        <FormLabel>City</FormLabel>
                                        <Input
                                            type="text"
                                            placeholder="City"
                                            {...register('city', {
                                                required: 'Required',
                                            })}
                                        />
                                        <FormErrorMessage>
                                            {errors?.city?.message}
                                        </FormErrorMessage>
                                    </FormControl>
                                </Box>
                            </HStack>
                            <HStack spacing={4}>
                                <Box>
                                    <FormControl
                                        isInvalid={!!errors?.county?.message}
                                        errortext={errors?.county?.message}
                                        id="county"
                                        isRequired
                                    >
                                        <FormLabel>County</FormLabel>
                                        <Input
                                            type="text"
                                            placeholder="County"
                                            {...register('county', {
                                                required: 'Required',
                                            })}
                                        />
                                        <FormErrorMessage>
                                            {errors?.county?.message}
                                        </FormErrorMessage>
                                    </FormControl>
                                </Box>
                                <Box>
                                    <FormControl
                                        isInvalid={!!errors?.zipCode?.message}
                                        errortext={errors?.zipCode?.message}
                                        id="zipCode"
                                        isRequired
                                    >
                                        <FormLabel>ZipCode</FormLabel>
                                        <Input
                                            type="text"
                                            placeholder="ZipCode"
                                            {...register('zipCode', {
                                                required: 'Required',
                                            })}
                                        />
                                        <FormErrorMessage>
                                            {errors?.zipCode?.message}
                                        </FormErrorMessage>
                                    </FormControl>
                                </Box>
                                <Box>
                                    <FormControl
                                        isInvalid={!!errors?.latitude?.message}
                                        errortext={errors?.latitude?.message}
                                        id="latitude"
                                        isRequired
                                    >
                                        <FormLabel>Latitude</FormLabel>
                                        <Input
                                            type="text"
                                            placeholder="Latitude"
                                            {...register('latitude', {
                                                required: 'Required',
                                            })}
                                        />
                                        <FormErrorMessage>
                                            {errors?.latitude?.message}
                                        </FormErrorMessage>
                                    </FormControl>
                                </Box>
                                <Box>
                                    <FormControl
                                        isInvalid={!!errors?.longitude?.message}
                                        errortext={errors?.longitude?.message}
                                        id="longitude"
                                        isRequired
                                    >
                                        <FormLabel>Longitude</FormLabel>
                                        <Input
                                            type="text"
                                            placeholder="Longitude"
                                            {...register('longitude', {
                                                required: 'Required',
                                            })}
                                        />
                                        <FormErrorMessage>
                                            {errors?.longitude?.message}
                                        </FormErrorMessage>
                                    </FormControl>
                                </Box>
                            </HStack>
                            <Stack spacing={4}>
                                <Stack spacing={10} pt={2}>
                                    <Button
                                        loadingText="Submitting"
                                        size="lg"
                                        bg={'blue.400'}
                                        color={'white'}
                                        _hover={{
                                            bg: 'blue.500',
                                        }}
                                        onClick={handleSubmit(onSubmit)}
                                    >
                                        Sign up
                                    </Button>
                                </Stack>
                                <Stack pt={6}>
                                    <Text align={'center'}>
                                        Already a user?{' '}
                                        <Link href="/login" color={'blue.400'}>
                                            Login
                                        </Link>
                                    </Text>
                                </Stack>
                            </Stack>
                        </Stack>
                    </Box>
                </Stack>
            </form>
        </Flex>
    );
}
