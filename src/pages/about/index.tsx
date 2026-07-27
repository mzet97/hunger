import {
    Box,
    Container,
    Heading,
    Text,
    VStack,
    Icon,
    HStack,
} from '@chakra-ui/react';
import { FiMapPin, FiClock, FiPhone } from 'react-icons/fi';

export default function About() {
    return (
        <Container maxW="container.md" py={12}>
            <VStack spacing={8} align="stretch">
                <Heading textAlign="center">🍔 About Hunger</Heading>

                <Text fontSize="lg" textAlign="center" color="gray.500">
                    Your favorite food delivery platform. Order from the best
                    restaurants near you!
                </Text>

                <Box p={6} borderWidth="1px" borderRadius="xl">
                    <VStack spacing={6} align="stretch">
                        <HStack>
                            <Icon as={FiMapPin} color="green.400" boxSize={6} />
                            <VStack align="start" spacing={0}>
                                <Text fontWeight="bold">Location</Text>
                                <Text color="gray.500">
                                    Available in your city
                                </Text>
                            </VStack>
                        </HStack>

                        <HStack>
                            <Icon as={FiClock} color="green.400" boxSize={6} />
                            <VStack align="start" spacing={0}>
                                <Text fontWeight="bold">Delivery Time</Text>
                                <Text color="gray.500">
                                    30-60 minutes average
                                </Text>
                            </VStack>
                        </HStack>

                        <HStack>
                            <Icon as={FiPhone} color="green.400" boxSize={6} />
                            <VStack align="start" spacing={0}>
                                <Text fontWeight="bold">Support</Text>
                                <Text color="gray.500">
                                    24/7 customer support
                                </Text>
                            </VStack>
                        </HStack>
                    </VStack>
                </Box>
            </VStack>
        </Container>
    );
}
