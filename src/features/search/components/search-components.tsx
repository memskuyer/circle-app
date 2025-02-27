import CardUser from '@/components/card-user';
import { InputGroup } from '@/components/ui/input-group';
import { api } from '@/hooks/api';
import { Box, Input, Text } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { LuSearch } from 'react-icons/lu';
import { useDebounce } from 'use-debounce';
import CardSkeleton from '../skeleton/card-skeleton';
import { SearchUser } from '../types/search-user-types';

const SearchComponents = () => {
  const [search, setSearch] = useState<string>('');
  const [searchTextDebounce] = useDebounce(search, 300);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const { data, isLoading, refetch } = useQuery<SearchUser[]>({
    queryKey: ['search-user'],
    queryFn: async () => {
      const response = await api.get(`/users?search=${searchTextDebounce}`);

      return response.data.data;
    },
  });

  useEffect(() => {
    refetch();
  }, [searchTextDebounce, refetch]);

  return (
    <Box>
      <InputGroup startElement={<LuSearch />} w={'full'}>
        <Input
          onChange={handleChange}
          placeholder="Search contacts"
          rounded={'15px'}
        />
      </InputGroup>

      {isLoading ? (
        <CardSkeleton />
      ) : (
        <>
          {data?.length == 0 ? (
            <Text>User Not Found</Text>
          ) : (
            data?.map((user) => <CardUser data={user} key={user.id} />)
          )}
        </>
        // <></>
      )}
    </Box>
  );
};

export default SearchComponents;
