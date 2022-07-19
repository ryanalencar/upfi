import { SimpleGrid, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
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
  const { isOpen, onClose, onOpen } = useDisclosure();

  // TODO SELECTED IMAGE URL STATE
  const [selectedImage, setSelectedImage] = useState('');

  // TODO FUNCTION HANDLE VIEW IMAGE
  const handleViewImage = (imgUrl: string): void => {
    setSelectedImage(imgUrl);
    onOpen();
  };

  return (
    <SimpleGrid columns={3} spacing="40px">
      {/* TODO CARD GRID */}
      {cards.map(card => (
        <Card viewImage={() => handleViewImage(card.url)} data={card} />
      ))}

      {/* TODO MODALVIEWIMAGE */}
      <ModalViewImage
        isOpen={isOpen}
        onClose={onClose}
        imgUrl={selectedImage}
      />
    </SimpleGrid>
  );
}
