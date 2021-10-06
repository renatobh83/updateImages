import { Button, Box } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

export default function Home(): JSX.Element {
  const fetchImages = async ({ pageParam = null }) => {
    const { data } = await api.get(`api/images`, {
      params: { after: pageParam },
    });
    return data;
  };

  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery('images', fetchImages, {
    getNextPageParam: lastPage => {
      return lastPage.after;
    },
  });

  const formattedData = useMemo(() => {
    let formattedData = [];
    if (data) {
      formattedData = data.pages
        .map(group => {
          return group.data.map(dados => {
            return dados;
          });
        })
        .flat();
    }

    return formattedData;
  }, [data]);
  return (
    <>
      {isLoading ? <Loading /> : isError && <Error />}
      <Header />

      <Box maxW={1120} px={20} mx="auto" my={20}>
        <CardList cards={formattedData} />
        <div>a</div>
        {hasNextPage && (
          <Button
            mt={8}
            onClick={() => fetchNextPage()}
            disabled={!hasNextPage || isFetchingNextPage}
          >
            {isFetchingNextPage
              ? 'Carregando...'
              : hasNextPage && 'Carregar mais'}
          </Button>
        )}
      </Box>
    </>
  );
}
