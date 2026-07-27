import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
    Box,
    Container,
    VStack,
    HStack,
    Text,
    Image,
    Button,
    Badge,
    Spinner,
    Center,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    Textarea,
    Select,
    Divider,
    useToast,
} from '@chakra-ui/react';
import { api } from '@/services/apiClient';
import Restaurant from '@/models/restaurant/Restaurant';
import Product from '@/models/product/Product';
import { useCart } from '@/contexts/CartContext';

export default function RestaurantDetail() {
    const router = useRouter();
    const { id } = router.query;
    const toast = useToast();
    const { addItem } = useCart();

    const [restaurant, setRestaurant] = useState<Restaurant>();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [quantities, setQuantities] = useState<Record<string, number>>({});
    const [commentText, setCommentText] = useState('');
    const [commentRating, setCommentRating] = useState(5);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (!id) return;
        setLoading(true);
        Promise.all([
            api.get(`restaurants/${id}`),
            api.get(`restaurants/${id}/products`),
        ])
            .then(([restRes, prodRes]) => {
                setRestaurant(restRes.data);
                setProducts(prodRes.data || []);
            })
            .catch(() => {
                toast({
                    title: 'Error loading restaurant',
                    status: 'error',
                    duration: 3000,
                });
            })
            .finally(() => setLoading(false));
    }, [id, toast]);

    const handleAddToCart = (product: Product) => {
        const qty = quantities[product.id] || 0;
        if (qty === 0) return;
        addItem({
            idProduct: product.id,
            name: product.name,
            price: product.price,
            quantity: qty,
            image: product.image,
        });
        toast({
            title: `${qty}x ${product.name} added to cart`,
            status: 'success',
            duration: 2000,
        });
        setQuantities(prev => ({ ...prev, [product.id]: 0 }));
    };

    const handleSubmitComment = async () => {
        if (!commentText.trim()) return;
        setSubmitting(true);
        try {
            await api.post(`restaurants/${id}/comments`, {
                text: commentText,
                starts: commentRating,
            });
            toast({
                title: 'Review submitted!',
                status: 'success',
                duration: 2000,
            });
            setCommentText('');
            setCommentRating(5);
            // Refresh data
            const [restRes, prodRes] = await Promise.all([
                api.get(`restaurants/${id}`),
                api.get(`restaurants/${id}/products`),
            ]);
            setRestaurant(restRes.data);
            setProducts(prodRes.data || []);
        } catch {
            toast({
                title: 'Error submitting review',
                status: 'error',
                duration: 3000,
            });
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <Center h="60vh">
                <Spinner size="xl" color="green.400" />
            </Center>
        );
    }

    const avgRating =
        restaurant?.comments && restaurant.comments.length > 0
            ? restaurant.comments.reduce(
                  (sum, c) => sum + Number(c.starts),
                  0,
              ) / restaurant.comments.length
            : 0;

    return (
        <Container maxW="container.lg" py={8}>
            <VStack spacing={6} align="stretch">
                <Box borderWidth="1px" borderRadius="xl" overflow="hidden">
                    <Image
                        src={restaurant?.image}
                        alt={restaurant?.name}
                        h="250px"
                        w="100%"
                        objectFit="cover"
                    />
                    <Box p={6}>
                        <HStack justify="space-between" mb={2}>
                            <VStack align="start" spacing={1}>
                                <Text fontSize="2xl" fontWeight="bold">
                                    {restaurant?.name}
                                </Text>
                                <Badge colorScheme="green">
                                    {restaurant?.categoryRestaurant?.name}
                                </Badge>
                            </VStack>
                            <HStack>
                                <Text>⭐ {avgRating.toFixed(1)}</Text>
                                <Text color="gray.500">
                                    ({restaurant?.comments?.length || 0}{' '}
                                    reviews)
                                </Text>
                            </HStack>
                        </HStack>
                        <Text color="gray.500" mb={2}>
                            {restaurant?.description}
                        </Text>
                        <Text fontSize="sm">
                            📍 {restaurant?.addressRestaurant?.street},{' '}
                            {restaurant?.addressRestaurant?.city} -{' '}
                            {restaurant?.addressRestaurant?.county}
                        </Text>
                    </Box>
                </Box>

                <Text fontSize="xl" fontWeight="bold">
                    Menu
                </Text>
                {products.length === 0 ? (
                    <Text color="gray.500" textAlign="center">
                        No products available
                    </Text>
                ) : (
                    products.map(product => (
                        <HStack
                            key={product.id}
                            p={4}
                            borderWidth="1px"
                            borderRadius="lg"
                            justify="space-between"
                        >
                            <HStack spacing={4}>
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    boxSize="60px"
                                    objectFit="cover"
                                    borderRadius="full"
                                />
                                <VStack align="start" spacing={0}>
                                    <Text fontWeight="semibold">
                                        {product.name}
                                    </Text>
                                    <Text fontSize="sm" color="gray.500">
                                        {product.description}
                                    </Text>
                                    <Text color="green.400" fontWeight="bold">
                                        R$ {product.price.toFixed(2)}
                                    </Text>
                                </VStack>
                            </HStack>
                            <HStack spacing={2}>
                                <NumberInput
                                    size="sm"
                                    w="70px"
                                    min={0}
                                    max={99}
                                    value={quantities[product.id] || 0}
                                    onChange={(_, val) =>
                                        setQuantities(prev => ({
                                            ...prev,
                                            [product.id]: val,
                                        }))
                                    }
                                >
                                    <NumberInputField />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                                <Button
                                    colorScheme="green"
                                    size="sm"
                                    onClick={() => handleAddToCart(product)}
                                    isDisabled={!quantities[product.id]}
                                >
                                    Add
                                </Button>
                            </HStack>
                        </HStack>
                    ))
                )}

                <Divider />

                <Text fontSize="xl" fontWeight="bold">
                    Reviews ({restaurant?.comments?.length || 0})
                </Text>

                <Box bg="gray.700" p={4} borderRadius="lg">
                    <Text mb={2} fontWeight="semibold">
                        Write a Review
                    </Text>
                    <HStack mb={3}>
                        <Text fontSize="sm">Rating:</Text>
                        <Select
                            value={commentRating}
                            onChange={e =>
                                setCommentRating(Number(e.target.value))
                            }
                            w="100px"
                            size="sm"
                        >
                            <option value={5}>5 ⭐</option>
                            <option value={4}>4 ⭐</option>
                            <option value={3}>3 ⭐</option>
                            <option value={2}>2 ⭐</option>
                            <option value={1}>1 ⭐</option>
                        </Select>
                    </HStack>
                    <Textarea
                        value={commentText}
                        onChange={e => setCommentText(e.target.value)}
                        placeholder="Share your experience..."
                        mb={3}
                    />
                    <Button
                        colorScheme="green"
                        onClick={handleSubmitComment}
                        isLoading={submitting}
                        isDisabled={!commentText.trim()}
                    >
                        Submit Review
                    </Button>
                </Box>

                {restaurant?.comments && restaurant.comments.length > 0 ? (
                    restaurant.comments.map(comment => (
                        <Box
                            key={comment.id}
                            p={3}
                            bg="gray.700"
                            borderRadius="lg"
                        >
                            <HStack mb={1}>
                                <Text fontSize="sm">
                                    {'⭐'.repeat(Number(comment.starts))}
                                </Text>
                                <Text fontSize="xs" color="gray.500">
                                    {new Date(
                                        comment.createdAt,
                                    ).toLocaleDateString()}
                                </Text>
                            </HStack>
                            <Text fontSize="sm">{comment.text}</Text>
                        </Box>
                    ))
                ) : (
                    <Text color="gray.500" textAlign="center">
                        No reviews yet. Be the first!
                    </Text>
                )}
            </VStack>
        </Container>
    );
}
