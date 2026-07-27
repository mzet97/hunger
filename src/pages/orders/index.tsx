import { useEffect, useState } from 'react';
import {
    Box,
    Container,
    VStack,
    HStack,
    Text,
    Badge,
    Spinner,
    Center,
    Button,
    Icon,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { FiPackage } from 'react-icons/fi';
import { api } from '@/services/apiClient';
import Order from '@/models/order/Order';
import {
    OrderStatusLabels,
    OrderStatusColors,
} from '@/models/order/OrderStatus';

export default function Orders() {
    const router = useRouter();
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get('orders')
            .then(response => setOrders(response.data || []))
            .catch(() => {})
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <Center h="60vh">
                <Spinner size="xl" color="green.400" />
            </Center>
        );
    }

    if (orders.length === 0) {
        return (
            <Container maxW="container.md" py={8}>
                <Center h="300px" flexDirection="column">
                    <Icon as={FiPackage} boxSize={16} color="gray.500" mb={4} />
                    <Text fontSize="xl" color="gray.500">
                        No orders yet
                    </Text>
                    <Button
                        mt={4}
                        colorScheme="green"
                        onClick={() => router.push('/dashboard')}
                    >
                        Browse Restaurants
                    </Button>
                </Center>
            </Container>
        );
    }

    return (
        <Container maxW="container.md" py={8}>
            <VStack spacing={4} align="stretch">
                <Text fontSize="2xl" fontWeight="bold">
                    My Orders
                </Text>

                {orders.map(order => (
                    <Box
                        key={order.id}
                        p={5}
                        bg="gray.700"
                        borderRadius="lg"
                        borderWidth="1px"
                    >
                        <HStack justify="space-between" mb={3}>
                            <VStack align="start" spacing={0}>
                                <Text fontSize="sm" color="gray.500">
                                    Order #
                                    {order.id.substring(0, 8).toUpperCase()}
                                </Text>
                                <Text fontSize="xs" color="gray.500">
                                    {new Date(
                                        order.createdAt,
                                    ).toLocaleDateString()}{' '}
                                    {new Date(
                                        order.createdAt,
                                    ).toLocaleTimeString()}
                                </Text>
                            </VStack>
                            <Badge
                                colorScheme={
                                    OrderStatusColors[order.orderStatus] ||
                                    'gray'
                                }
                                px={3}
                                py={1}
                                borderRadius="full"
                            >
                                {OrderStatusLabels[order.orderStatus] ||
                                    'Unknown'}
                            </Badge>
                        </HStack>

                        <VStack align="stretch" spacing={2} mb={3}>
                            {order.items?.map(item => (
                                <HStack
                                    key={item.id}
                                    justify="space-between"
                                    px={2}
                                >
                                    <Text fontSize="sm">
                                        {item.quantity}x Product #
                                        {item.idProduct.substring(0, 8)}
                                    </Text>
                                    <Text fontSize="sm" color="green.400">
                                        R$ {item.price.toFixed(2)}
                                    </Text>
                                </HStack>
                            ))}
                        </VStack>

                        <HStack
                            justify="space-between"
                            borderTopWidth="1px"
                            pt={3}
                        >
                            <Text fontWeight="bold">Total</Text>
                            <Text
                                fontWeight="bold"
                                color="green.400"
                                fontSize="lg"
                            >
                                R$ {order.price.toFixed(2)}
                            </Text>
                        </HStack>
                    </Box>
                ))}
            </VStack>
        </Container>
    );
}
