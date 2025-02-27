import { Avatar } from '@/components/ui/avatar';
import { UserEntity } from '@/entities/user.entities';
import ButtonFollow from '@/hooks/button/button-follow';
import { Box, HStack, Stack, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

interface DataUser {
  data: UserEntity;
}

const CardUser = ({ data }: DataUser) => {
  const navigate = useNavigate();
  const handleUser = () => {
    navigate(`/profile/user/${data.id}`);
  };

  return (
    <Box display="flex" justifyContent="space-between" my="10px">
      <Stack gap="8">
        <HStack gap="4">
          <Avatar
            size="xs"
            name={data.profile?.fullName}
            src={
              data.profile?.avatarUrl ||
              `https://api.dicebear.com/9.x/glass/svg?seed=${data.profile?.fullName}'`
            }
          />
          <Stack gap="0" onClick={handleUser} cursor={'pointer'}>
            <Text fontSize={'12px'}>{data.profile?.fullName}</Text>
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

export default CardUser;
