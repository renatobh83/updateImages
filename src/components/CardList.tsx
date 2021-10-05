import { Button, SimpleGrid, useDisclosure } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Card } from './Card';
import { ModalViewImage } from './Modal/ViewImage';

interface Card {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

interface CardsProps {
  cards: Card[];
}

export function CardList({ cards }: CardsProps): JSX.Element {
  // TODO MODAL USEDISCLOSURE
  const { isOpen, onOpen, onClose } = useDisclosure();
  // TODO SELECTED IMAGE URL STATE
  const [urlImage, setUrlImage] = useState('');
  // TODO FUNCTION HANDLE VIEW IMAGE
  function handleViewImage(url: string) {
    setUrlImage(url);
    onOpen();
  }
  return (
    <>
      {/* TODO CARD GRID */}
      <SimpleGrid columns={3} spacing="40px">
        {cards.map(card => (
          <Card
            key={card.id}
            data={card}
            viewImage={url => handleViewImage(url)}
          />
        ))}
      </SimpleGrid>

      {/* TODO MODALVIEWIMAGE */}
      <ModalViewImage imgUrl={urlImage} isOpen={isOpen} onClose={onClose} />
    </>
  );
}
