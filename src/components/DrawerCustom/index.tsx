import {
    Button,
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    Link,
    useDisclosure,
    Text,
    Heading,
} from '@chakra-ui/react';

import { HamburgerIcon } from '@chakra-ui/icons';

import styles from './styles.module.css';

export default function DrawerCustom() {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <Button colorScheme="teal" variant="outline" onClick={onOpen}>
                <HamburgerIcon boxSize={6} />
            </Button>
            <Drawer placement={'left'} onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerHeader borderBottomWidth="1px">
                        <Heading>Menu</Heading>
                    </DrawerHeader>
                    <DrawerBody className={styles.itens}>
                        <div>
                            <ul>
                                <li>
                                    <Link
                                        href="/home"
                                        color="blue.400"
                                        _hover={{ color: 'blue.500' }}
                                    >
                                        <Text fontSize="4xl">Home</Text>
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/about"
                                        color="blue.400"
                                        _hover={{ color: 'blue.500' }}
                                    >
                                        <Text fontSize="4xl">About</Text>
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/"
                                        color="blue.400"
                                        _hover={{ color: 'blue.500' }}
                                    >
                                        <Text fontSize="4xl">Index</Text>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    );
}
