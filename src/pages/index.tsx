import { Button, Box } from '@chakra-ui/react';
import { useCallback, useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

export default function Home(): JSX.Element {
  const fetchImages = useCallback(
    ({ pageParam = 0 }) =>
      api.get(`http://localhost:3000/api/images?after=${pageParam}`),
    []
  );

  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery('images', fetchImages, {
    getNextPageParam: lastPage => lastPage.data.after ?? null,
  });

  const formattedData = useMemo(
    () => data?.pages.flatMap(page => page.data),
    [data]
  );

  if (isLoading) return <Loading />;
  if (isError) return <Error />;

  return (
    <>
      <Header />

      <Box maxW={1120} px={20} mx="auto" my={20}>
        <CardList cards={formattedData} />
        {hasNextPage && (
          <Button
            isLoading={isFetchingNextPage}
            onClick={() => fetchNextPage()}
          >
            {isFetchingNextPage ? 'Carregar mais' : 'Carregando...'}
          </Button>
        )}
      </Box>
    </>
  );
}
