import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Heading,
  Button,
  useDisclosure,
  SimpleGrid,
  useToast,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import TransactionModal from '../components/TransactionModal';
import TransactionList from '../components/TransactionList';
import StatisticsCard from '../components/StatisticsCard';
import ExpenseChart from '../components/ExpenseChart';
import { getTransactions, createTransaction } from '../services/api';
import { Transaction } from '../types';
import FadeIn from '../components/animations/FadeIn';
import SlideIn from '../components/animations/SlideIn';
import LoadingSpinner from '../components/LoadingSpinner';

const MotionSimpleGrid = motion(SimpleGrid);
const MotionGrid = motion(Grid);

const Dashboard = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [statistics, setStatistics] = useState({
    totalIncome: 0,
    totalExpense: 0,
    balance: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const toast = useToast();

  const fetchTransactions = async () => {
    try {
      const data = await getTransactions();
      setTransactions(data);
      calculateStatistics(data);
    } catch (error) {
      toast({
        title: '获取交易记录失败',
        status: 'error',
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const calculateStatistics = (transactions: Transaction[]) => {
    const totalIncome = transactions
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);

    const totalExpense = transactions
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    setStatistics({
      totalIncome,
      totalExpense,
      balance: totalIncome - totalExpense,
    });
  };

  const handleCreateTransaction = async (data: Omit<Transaction, 'id' | 'user'>) => {
    try {
      await createTransaction(data);
      await fetchTransactions();
      onClose();
      toast({
        title: '交易记录已添加',
        status: 'success',
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: '添加交易记录失败',
        status: 'error',
        duration: 3000,
      });
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <FadeIn>
      <Box>
        <Grid templateColumns="1fr auto" alignItems="center" mb={6}>
          <SlideIn direction="left">
            <Heading size="lg">Dashboard</Heading>
          </SlideIn>
          <SlideIn direction="right">
            <Button colorScheme="blue" onClick={onOpen}>
              添加交易
            </Button>
          </SlideIn>
        </Grid>

        <MotionSimpleGrid
          columns={{ base: 1, md: 3 }}
          spacing={6}
          mb={6}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <StatisticsCard
            title="总收入"
            amount={statistics.totalIncome}
            color="green.500"
          />
          <StatisticsCard
            title="总支出"
            amount={statistics.totalExpense}
            color="red.500"
          />
          <StatisticsCard
            title="结余"
            amount={statistics.balance}
            color="blue.500"
          />
        </MotionSimpleGrid>

        <MotionGrid
          templateColumns={{ base: "1fr", lg: "1fr 300px" }}
          gap={6}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <TransactionList transactions={transactions} />
          <ExpenseChart transactions={transactions} />
        </MotionGrid>

        <TransactionModal
          isOpen={isOpen}
          onClose={onClose}
          onSubmit={handleCreateTransaction}
        />
      </Box>
    </FadeIn>
  );
};

export default Dashboard; 