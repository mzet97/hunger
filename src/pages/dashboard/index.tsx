import { Link } from '@chakra-ui/next-js';

export default function Dashboard() {
    return (
        <>
            <div>Home!</div>
            <Link href="/about" color="blue.400" _hover={{ color: 'blue.500' }}>
                About
            </Link>
            <Link href="/" color="blue.400" _hover={{ color: 'blue.500' }}>
                Index
            </Link>
        </>
    );
}
