import {
    AspectRatio,
    Box,
    Center,
    Heading,
    StackDivider,
    Text,
    VStack,
} from '@chakra-ui/react';
import { Link } from '@chakra-ui/next-js';
import styles from './styles.module.css';

const Home = () => {
    return (
        <div className={styles['box-center']}>
            <VStack spacing={10} align="stretch" mt={10}>
                <VStack align="center">
                    <Box>
                        <Heading>If you have hunger. Eat here.</Heading>
                    </Box>
                </VStack>
                <VStack align="center">
                    <Box>
                        <Heading>Do you have a account?</Heading>
                    </Box>
                    <Box>
                        <Link href="/login">
                            <Text fontSize="4xl">Login</Text>
                        </Link>
                    </Box>
                </VStack>
                <VStack align="center">
                    <Box>
                        <Heading>Or create a new account!</Heading>
                    </Box>
                    <Box>
                        <Link href="/register">
                            <Text fontSize="4xl">SingUp</Text>
                        </Link>
                    </Box>
                </VStack>
                <Heading>Come to our place</Heading>
                <AspectRatio w={1200} h={700} ratio={16 / 9}>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3675.2881477704623!2d-43.283411923035274!3d-22.90274037925795!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x997dbb297f3211%3A0x66f68ea58c293b6a!2sR.%20Dias%20da%20Cruz%2C%20135%20-%20M%C3%A9ier%2C%20Rio%20de%20Janeiro%20-%20RJ%2C%2020720-010!5e0!3m2!1spt-BR!2sbr!4v1705543076942!5m2!1spt-BR!2sbr"></iframe>
                </AspectRatio>
            </VStack>
        </div>
    );
};

export default Home;
