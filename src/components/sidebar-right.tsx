import { Avatar } from '@/components/ui/avatar';
import CardSkeleton from '@/features/search/skeleton/card-skeleton';
import { SearchUser } from '@/features/search/types/search-user-types';
import { api } from '@/hooks/api';
import ButtonFollow from '@/hooks/button/button-follow';
import { useAuthStore } from '@/stores/auth.store';
import {
  Box,
  Button,
  Flex,
  HStack,
  Image,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';

const SidebarRight = () => {
  //
  const { pathname } = useLocation();
  const { data, isLoading } = useQuery<SearchUser[]>({
    queryKey: ['all-user'],
    queryFn: async () => {
      const response = await api.get(`/users/all`);
      return response.data.data;
    },
  });

  return (
    <Box p={'40px 20px'}>
      {pathname != '/profile' && <BoxProfile />}

      <Box bg="white/10" p="2" borderRadius="10px" my="20px">
        <Text textStyle={'xl'}>Suggested for you</Text>

        {isLoading ? (
          <CardSkeleton />
        ) : (
          <>
            {data?.length == 0
              ? 'tidak ada pengguna untuk Anda'
              : data
                  ?.slice(0, 4)
                  .map((datas) => (
                    <SuggestedCard key={datas.id} data={datas} />
                  ))}
          </>
        )}
      </Box>
    </Box>
  );
};
export default SidebarRight;

const BoxProfile = () => {
  const user = useAuthStore((state) => state.user);

  if (!user || !user.profile) {
    window.location.reload();
    return <Text>Loading....</Text>;
  }

  return (
    <Box bg={'white/10'} p={2} rounded={'xl'}>
      <Text textStyle={'2xl'} my={2}>
        My Profile
      </Text>
      <Box pos={'relative'}>
        <Image
          h="70px"
          rounded="xl"
          w="100%"
          src={
            user.profile.bannerUrl ||
            `https://api.dicebear.com/9.x/fun-emoji/svg?seed=${user.profile.bannerUrl}`
          }
        />
        <Box
          pos="absolute"
          rounded="50%"
          bottom="-20px"
          left="20px"
          border="5px solid black"
        >
          <Avatar
            w="50px"
            h="50px"
            name={user.profile.fullName}
            src={
              user.profile.avatarUrl ||
              `https://api.dicebear.com/9.x/fun-emoji/svg?seed=${user.profile.fullName}`
            }
          />
        </Box>
      </Box>
      <Text textStyle="xl" mt={5}>
        {user.profile.fullName}
      </Text>
      <Text textStyle="md" color={'white/60'}>
        @{user.username}
      </Text>

      <Text textStyle="md">{user.profile.bio}</Text>
      <Flex align={'center'} gap={2}>
        <Flex gap={1}>
          <Text>291</Text>
          <Text color={'white/60'}>Following</Text>
        </Flex>
        <Flex gap={1}>
          <Text>291</Text>
          <Text color={'white/60'}>Followers</Text>
        </Flex>
      </Flex>
    </Box>
  );
};

interface DataUser {
  data: SearchUser;
}

const SuggestedCard = ({ data }: DataUser) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const queryClient = useQueryClient();

  const handleUser = () => {
    navigate(`/profile/user/${data.id}`);
  };

  useEffect(() => {
    if (id) {
      queryClient.invalidateQueries({
        queryKey: ['user-profile'],
      });
      queryClient.invalidateQueries({
        queryKey: ['user-thread'],
      });
    }
  }, [id]);

  return (
    <Box display="flex" justifyContent="space-between" my="10px">
      <Stack gap="8">
        <HStack gap="4">
          <Avatar
            size="xs"
            name={data.profile.fullName}
            src={
              data.profile.avatarUrl ||
              `https://api.dicebear.com/9.x/glass/svg?seed=${data.profile.fullName}'`
            }
          />
          <Stack gap="0" onClick={handleUser} cursor={'pointer'}>
            <Text fontSize={'12px'}>{data.profile.fullName}</Text>
            <Text color="fg.muted" fontSize={'12px'}>
              @{data.username}
            </Text>
          </Stack>
        </HStack>
      </Stack>
      <ButtonFollow followData={data} />
    </Box>
  );
};
