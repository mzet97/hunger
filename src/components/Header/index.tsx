'use client';

import {
    Box,
    Flex,
    Text,
    IconButton,
    Button,
    Stack,
    Collapse,
    Icon,
    Popover,
    PopoverTrigger,
    PopoverContent,
    useColorModeValue,
    useBreakpointValue,
    useDisclosure,
    Badge,
    HStack,
} from '@chakra-ui/react';
import {
    HamburgerIcon,
    CloseIcon,
    ChevronDownIcon,
    ChevronRightIcon,
} from '@chakra-ui/icons';
import { FiShoppingCart } from 'react-icons/fi';
import SwitchTheme from '../SwitchTheme';
import { AuthContext } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { useContext } from 'react';

export default function Header() {
    const { isOpen, onToggle } = useDisclosure();
    const { user, signOut } = useContext(AuthContext);
    const { itemCount, total } = useCart();

    return (
        <Box>
            <Flex
                bg={useColorModeValue('gray.50', 'gray.800')}
                color={useColorModeValue('gray.600', 'white')}
                minH={'60px'}
                py={{ base: 2 }}
                px={{ base: 4 }}
                borderBottom={1}
                borderStyle={'solid'}
                borderColor={useColorModeValue('gray.200', 'gray.900')}
                align={'center'}
            >
                <Flex
                    flex={{ base: 1, md: 'auto' }}
                    ml={{ base: -2 }}
                    display={{ base: 'flex', md: 'none' }}
                >
                    <IconButton
                        onClick={onToggle}
                        icon={
                            isOpen ? (
                                <CloseIcon w={3} h={3} />
                            ) : (
                                <HamburgerIcon w={5} h={5} />
                            )
                        }
                        variant={'ghost'}
                        aria-label={'Toggle Navigation'}
                    />
                </Flex>
                <Flex
                    flex={{ base: 1 }}
                    justify={{ base: 'center', md: 'start' }}
                >
                    <Text
                        textAlign={useBreakpointValue({
                            base: 'center',
                            md: 'left',
                        })}
                        fontFamily={'heading'}
                        color={useColorModeValue('gray.800', 'white')}
                        fontWeight="bold"
                        fontSize="lg"
                    >
                        🍔 Hunger
                    </Text>
                    <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
                        <DesktopNav user={user} />
                    </Flex>
                </Flex>

                <Stack
                    flex={{ base: 1, md: 0 }}
                    justify={'flex-end'}
                    direction={'row'}
                    spacing={4}
                    align="center"
                >
                    <SwitchTheme />
                    {user?.success && (
                        <>
                            <Button
                                as="a"
                                href="/cart"
                                variant="ghost"
                                position="relative"
                                leftIcon={<FiShoppingCart />}
                                size="sm"
                            >
                                Cart
                                {itemCount > 0 && (
                                    <Badge
                                        colorScheme="green"
                                        borderRadius="full"
                                        position="absolute"
                                        top="-8px"
                                        right="-8px"
                                        fontSize="xs"
                                    >
                                        {itemCount}
                                    </Badge>
                                )}
                            </Button>
                            <Text
                                fontSize="sm"
                                color="green.400"
                                fontWeight="bold"
                            >
                                R$ {total.toFixed(2)}
                            </Text>
                            <Button
                                fontSize={'sm'}
                                fontWeight={400}
                                colorScheme="red"
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                    signOut();
                                    window.location.href = '/';
                                }}
                            >
                                SignOut
                            </Button>
                        </>
                    )}
                    {!user?.success && (
                        <>
                            <Button
                                as={'a'}
                                fontSize={'sm'}
                                fontWeight={400}
                                colorScheme="green"
                                href={'login'}
                                size="sm"
                            >
                                Login
                            </Button>
                            <Button
                                as={'a'}
                                fontSize={'sm'}
                                fontWeight={600}
                                color={'white'}
                                colorScheme="green"
                                href={'signUp'}
                                size="sm"
                            >
                                SignUp
                            </Button>
                        </>
                    )}
                </Stack>
            </Flex>

            <Collapse in={isOpen} animateOpacity>
                <MobileNav user={user} />
            </Collapse>
        </Box>
    );
}

const DesktopNav = (user: any) => {
    const linkColor = useColorModeValue('gray.600', 'gray.200');
    const linkHoverColor = useColorModeValue('gray.800', 'white');

    return (
        <Stack direction={'row'} spacing={4}>
            {getNavItems(user).map(navItem => (
                <Box key={navItem.label}>
                    <Box
                        as="a"
                        p={2}
                        href={navItem.href ?? '#'}
                        fontSize={'sm'}
                        fontWeight={500}
                        color={linkColor}
                        _hover={{
                            textDecoration: 'none',
                            color: linkHoverColor,
                        }}
                    >
                        {navItem.label}
                    </Box>
                </Box>
            ))}
        </Stack>
    );
};

const MobileNav = (user: any) => {
    const navBg = useColorModeValue('white', 'gray.800');
    const navColor = useColorModeValue('gray.600', 'gray.200');

    return (
        <Stack bg={navBg} p={4} display={{ md: 'none' }}>
            {getNavItems(user).map(navItem => (
                <Box
                    key={navItem.label}
                    py={2}
                    as="a"
                    href={navItem.href ?? '#'}
                >
                    <Text fontWeight={600} color={navColor}>
                        {navItem.label}
                    </Text>
                </Box>
            ))}
        </Stack>
    );
};

interface NavItem {
    label: string;
    subLabel?: string;
    children?: Array<NavItem>;
    href?: string;
}

const getNavItems = (user: any): Array<NavItem> => {
    if (user?.success) {
        return [
            { label: 'Dashboard', href: '/dashboard' },
            { label: 'Orders', href: '/orders' },
            { label: 'Profile', href: '/profile' },
        ];
    }
    return [{ label: 'Home', href: '/' }];
};
