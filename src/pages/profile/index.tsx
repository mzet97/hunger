import { useEffect, useState } from 'react';
import {
    Box,
    Container,
    VStack,
    HStack,
    Text,
    Button,
    Input,
    Spinner,
    Center,
    Divider,
    useToast,
} from '@chakra-ui/react';
import { api } from '@/services/apiClient';
import { useAuth } from '@/contexts/AuthContext';

type ProfileData = {
    name: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    type: string;
};

export default function Profile() {
    const { user } = useAuth();
    const toast = useToast();
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);
    const [saving, setSaving] = useState(false);
    const [profile, setProfile] = useState<ProfileData>({
        name: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        type: '',
    });

    useEffect(() => {
        api.get('profile')
            .then(response => {
                const data = response.data;
                setProfile({
                    name:
                        data.name ||
                        user?.data?.userToken?.email?.split('@')[0] ||
                        '',
                    lastName: data.lastName || '',
                    email: data.email || user?.data?.userToken?.email || '',
                    phoneNumber: data.phoneNumber || '',
                    type: data.type || '',
                });
            })
            .catch(() => {
                setProfile({
                    name: user?.data?.userToken?.email?.split('@')[0] || '',
                    lastName: '',
                    email: user?.data?.userToken?.email || '',
                    phoneNumber: '',
                    type: '',
                });
            })
            .finally(() => setLoading(false));
    }, [user]);

    const handleSave = async () => {
        setSaving(true);
        try {
            await api.put('profile', {
                name: profile.name,
                lastName: profile.lastName,
                email: profile.email,
                phoneNumber: profile.phoneNumber,
            });
            toast({
                title: 'Profile updated!',
                status: 'success',
                duration: 2000,
            });
            setEditing(false);
        } catch {
            toast({
                title: 'Error updating profile',
                status: 'error',
                duration: 3000,
            });
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <Center h="60vh">
                <Spinner size="xl" color="green.400" />
            </Center>
        );
    }

    return (
        <Container maxW="container.md" py={8}>
            <VStack
                spacing={6}
                align="stretch"
                borderWidth="1px"
                borderRadius="xl"
                p={8}
            >
                <Text fontSize="2xl" fontWeight="bold">
                    My Profile
                </Text>
                <Divider />

                <VStack align="stretch" spacing={4}>
                    <Box>
                        <Text fontSize="sm" color="gray.500" mb={1}>
                            Name
                        </Text>
                        {editing ? (
                            <Input
                                value={profile.name}
                                onChange={e =>
                                    setProfile({
                                        ...profile,
                                        name: e.target.value,
                                    })
                                }
                            />
                        ) : (
                            <Text fontSize="lg">{profile.name}</Text>
                        )}
                    </Box>
                    <Box>
                        <Text fontSize="sm" color="gray.500" mb={1}>
                            Last Name
                        </Text>
                        {editing ? (
                            <Input
                                value={profile.lastName}
                                onChange={e =>
                                    setProfile({
                                        ...profile,
                                        lastName: e.target.value,
                                    })
                                }
                            />
                        ) : (
                            <Text fontSize="lg">{profile.lastName}</Text>
                        )}
                    </Box>
                    <Box>
                        <Text fontSize="sm" color="gray.500" mb={1}>
                            Email
                        </Text>
                        {editing ? (
                            <Input
                                value={profile.email}
                                onChange={e =>
                                    setProfile({
                                        ...profile,
                                        email: e.target.value,
                                    })
                                }
                            />
                        ) : (
                            <Text fontSize="lg">{profile.email}</Text>
                        )}
                    </Box>
                    <Box>
                        <Text fontSize="sm" color="gray.500" mb={1}>
                            Phone
                        </Text>
                        {editing ? (
                            <Input
                                value={profile.phoneNumber}
                                onChange={e =>
                                    setProfile({
                                        ...profile,
                                        phoneNumber: e.target.value,
                                    })
                                }
                            />
                        ) : (
                            <Text fontSize="lg">
                                {profile.phoneNumber || 'Not set'}
                            </Text>
                        )}
                    </Box>
                    <Box>
                        <Text fontSize="sm" color="gray.500" mb={1}>
                            Account Type
                        </Text>
                        <Text
                            fontSize="lg"
                            color="green.400"
                            fontWeight="semibold"
                        >
                            {profile.type || 'Client'}
                        </Text>
                    </Box>
                </VStack>

                <HStack justify="flex-end" spacing={3}>
                    {editing ? (
                        <>
                            <Button
                                variant="outline"
                                onClick={() => setEditing(false)}
                            >
                                Cancel
                            </Button>
                            <Button
                                colorScheme="green"
                                onClick={handleSave}
                                isLoading={saving}
                            >
                                Save
                            </Button>
                        </>
                    ) : (
                        <Button
                            colorScheme="green"
                            onClick={() => setEditing(true)}
                        >
                            Edit Profile
                        </Button>
                    )}
                </HStack>
            </VStack>
        </Container>
    );
}
