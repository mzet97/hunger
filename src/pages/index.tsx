import { Heading } from '@chakra-ui/react';
import { Link } from '@chakra-ui/next-js';
const Home = () => {
    return (
        <>
            <Heading>Welcome to Chakra + Next.js</Heading>
            <Link href="/about" color="blue.400" _hover={{ color: 'blue.500' }}>
                About
            </Link>
            <Link href="/home" color="blue.400" _hover={{ color: 'blue.500' }}>
                Home
            </Link>
        </>
    );
};

export default Home;
