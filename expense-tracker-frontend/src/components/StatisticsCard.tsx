import React from 'react';
import {
  Box,
  Text,
  Stat,
  StatLabel,
  StatNumber,
  StatGroup,
} from '@chakra-ui/react';

interface StatisticsCardProps {
  title: string;
  amount: number;
  color: string;
}

const StatisticsCard: React.FC<StatisticsCardProps> = ({ title, amount, color }) => {
  return (
    <Box p={6} bg="white" rounded="lg" shadow="sm">
      <StatGroup>
        <Stat>
          <StatLabel fontSize="sm" color="gray.500">
            {title}
          </StatLabel>
          <StatNumber fontSize="2xl" color={color} fontWeight="bold">
            ¥{amount.toFixed(2)}
          </StatNumber>
        </Stat>
      </StatGroup>
    </Box>
  );
};

export default StatisticsCard; 