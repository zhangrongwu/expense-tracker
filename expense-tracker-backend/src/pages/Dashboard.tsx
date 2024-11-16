// import React, { useState, useEffect } from 'react';
// import {
//   Box,
//   Grid,
//   Heading,
//   Button,
//   useDisclosure,
//   SimpleGrid,
// } from '@chakra-ui/react';
// import TransactionModal from '../components/TransactionModal';
// import TransactionList from '../components/TransactionList';
// import StatisticsCard from '../components/StatisticsCard';
// import ExpenseChart from '../components/ExpenseChart';

// const Dashboard = () => {
//   const { isOpen, onOpen, onClose } = useDisclosure();
//   const [transactions, setTransactions] = useState([]);
//   const [statistics, setStatistics] = useState({
//     totalIncome: 0,
//     totalExpense: 0,
//     balance: 0,
//   });

//   useEffect(() => {
//     fetchTransactions();
//     calculateStatistics();
//   }, []);

//   const fetchTransactions = async () => {
//     // API 调用获取交易记录
//   };

//   const calculateStatistics = () => {
//     // 计算统计数据
//   };

//   return (
//     <Box>
//       <Grid templateColumns="1fr auto" alignItems="center" mb={6}>
//         <Heading size="lg">Dashboard</Heading>
//         <Button colorScheme="blue" onClick={onOpen}>
//           添加交易
//         </Button>
//       </Grid>

//       <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mb={6}>
//         <StatisticsCard
//           title="总收入"
//           amount={statistics.totalIncome}
//           color="green.500"
//         />
//         <StatisticsCard
//           title="总支出"
//           amount={statistics.totalExpense}
//           color="red.500"
//         />
//         <StatisticsCard
//           title="结余"
//           amount={statistics.balance}
//           color="blue.500"
//         />
//       </SimpleGrid>

//       <Grid templateColumns={{ base: "1fr", lg: "1fr 300px" }} gap={6}>
//         <TransactionList transactions={transactions} />
//         <ExpenseChart transactions={transactions} />
//       </Grid>

//       <TransactionModal isOpen={isOpen} onClose={onClose} />
//     </Box>
//   );
// };

// export default Dashboard; 