import { Link } from '@chakra-ui/next-js';
import styles from './styles.module.css';
import SwitchTheme from '../SwitchTheme';
import DrawerCustom from '../DrawerCustom';
import {
    Box,
    Button,
    ButtonGroup,
    Flex,
    Heading,
    Spacer,
    HStack,
} from '@chakra-ui/react';

export default function Header() {
    return (
        <>
            <header className={styles.nav}>
                <Flex minWidth="max-content" alignItems="center" gap="2">
                    <HStack spacing="24px">
                        <Box>
                            <DrawerCustom />
                        </Box>
                        <Box>
                            <Heading size="lg">Hunger App</Heading>
                        </Box>
                    </HStack>
                    <Spacer />
                    <ButtonGroup gap="2">
                        <Button colorScheme="facebook">Sign Up</Button>
                        <Button colorScheme="whatsapp">Log in</Button>
                    </ButtonGroup>
                    <SwitchTheme />
                </Flex>
            </header>
        </>
    );
}
