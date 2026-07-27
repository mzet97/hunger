import { useEffect, useState } from 'react';
import {
    Box,
    Container,
    Grid,
    GridItem,
    Image,
    Text,
    Badge,
    HStack,
    VStack,
    Select,
    Spinner,
    Center,
    InputGroup,
    InputLeftElement,
    Input,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/router';
import { api } from '@/services/apiClient';
import Restaurant from '@/models/restaurant/Restaurant';
import Comment from '@/models/restaurant/Comment';
import CategoryRestaurant from '@/models/restaurant/CategoryRestaurant';

function averageRating(comments: Comment[]): number {
    if (!comments || comments.length === 0) return 0;
    return (
        comments.reduce((sum, c) => sum + Number(c.starts), 0) / comments.length
    );
}

export default function Dashboard() {
    const router = useRouter();
    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
    const [filtered, setFiltered] = useState<Restaurant[]>([]);
    const [categories, setCategories] = useState<CategoryRestaurant[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('');

    useEffect(() => {
        Promise.all([api.get('restaurants'), api.get('category-restaurants')])
            .then(([restRes, catRes]) => {
                setRestaurants(restRes.data || []);
                setFiltered(restRes.data || []);
                setCategories(catRes.data || []);
            })
            .catch(() => {})
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        let result = restaurants;
        if (search) {
            const s = search.toLowerCase();
            result = result.filter(
                r =>
                    r.name.toLowerCase().includes(s) ||
                    r.description?.toLowerCase().includes(s),
            );
        }
        if (category) {
            result = result.filter(
                r => r.categoryRestaurant?.name === category,
            );
        }
        setFiltered(result);
    }, [search, category, restaurants]);

    if (loading) {
        return (
            <Center h="60vh">
                <Spinner size="xl" color="green.400" />
            </Center>
        );
    }

    return (
        <Container maxW="container.xl" py={8}>
            <VStack spacing={6} align="stretch">
                <Text fontSize="3xl" fontWeight="bold">
                    Restaurants
                </Text>

                <HStack spacing={4}>
                    <InputGroup>
                        <InputLeftElement pointerEvents="none">
                            <SearchIcon color="gray.400" />
                        </InputLeftElement>
                        <Input
                            placeholder="Search restaurants..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                    </InputGroup>
                    <Select
                        placeholder="All Categories"
                        value={category}
                        onChange={e => setCategory(e.target.value)}
                        maxW="250px"
                    >
                        {categories.map(cat => (
                            <option key={cat.id} value={cat.name}>
                                {cat.name}
                            </option>
                        ))}
                    </Select>
                </HStack>

                {filtered.length === 0 ? (
                    <Center h="200px">
                        <Text color="gray.500">No restaurants found</Text>
                    </Center>
                ) : (
                    <Grid
                        templateColumns="repeat(auto-fill, minmax(350px, 1fr))"
                        gap={6}
                    >
                        {filtered.map(restaurant => (
                            <GridItem
                                key={restaurant.id}
                                cursor="pointer"
                                onClick={() =>
                                    router.push(`/restaurant/${restaurant.id}`)
                                }
                            >
                                <Box
                                    borderWidth="1px"
                                    borderRadius="xl"
                                    overflow="hidden"
                                    _hover={{
                                        shadow: 'lg',
                                        borderColor: 'green.400',
                                    }}
                                    transition="all 0.2s"
                                >
                                    <Image
                                        src={restaurant.image}
                                        alt={restaurant.name}
                                        h="200px"
                                        w="100%"
                                        objectFit="cover"
                                    />
                                    <Box p={4}>
                                        <HStack justify="space-between" mb={2}>
                                            <Text
                                                fontSize="xl"
                                                fontWeight="bold"
                                            >
                                                {restaurant.name}
                                            </Text>
                                            <Badge colorScheme="green">
                                                {
                                                    restaurant
                                                        .categoryRestaurant
                                                        ?.name
                                                }
                                            </Badge>
                                        </HStack>
                                        <Text
                                            color="gray.500"
                                            fontSize="sm"
                                            noOfLines={2}
                                            mb={2}
                                        >
                                            {restaurant.description}
                                        </Text>
                                        <HStack>
                                            <Text fontSize="sm">
                                                ⭐{' '}
                                                {averageRating(
                                                    restaurant.comments,
                                                ).toFixed(1)}
                                            </Text>
                                            <Text
                                                fontSize="sm"
                                                color="gray.500"
                                            >
                                                (
                                                {restaurant.comments?.length ||
                                                    0}{' '}
                                                reviews)
                                            </Text>
                                        </HStack>
                                    </Box>
                                </Box>
                            </GridItem>
                        ))}
                    </Grid>
                )}
            </VStack>
        </Container>
    );
}
