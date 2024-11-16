import React from 'react';
import {
  Box,
  TableContainer,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  Badge,
  IconButton,
  useToast,
  useDisclosure,
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import { Transaction } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { deleteTransaction } from '../services/api';
import ConfirmDialog from './ConfirmDialog';

const MotionTr = motion(Tr);

interface TransactionListProps {
  transactions: Transaction[];
  onDelete?: () => void;
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions, onDelete }) => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedId, setSelectedId] = React.useState<number | null>(null);

  const handleDeleteClick = (id: number) => {
    setSelectedId(id);
    onOpen();
  };

  const handleConfirmDelete = async () => {
    if (selectedId) {
      try {
        await deleteTransaction(selectedId);
        toast({
          title: '删除成功',
          status: 'success',
          duration: 2000,
        });
        onDelete?.();
      } catch (error) {
        toast({
          title: '删除失败',
          status: 'error',
          duration: 2000,
        });
      }
      onClose();
    }
  };

  return (
    <Box bg="white" rounded="lg" shadow="sm" overflow="hidden">
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>日期</Th>
              <Th>描述</Th>
              <Th>类别</Th>
              <Th>类型</Th>
              <Th isNumeric>金额</Th>
              <Th width="50px"></Th>
            </Tr>
          </Thead>
          <Tbody>
            <AnimatePresence>
              {transactions.map((transaction) => (
                <MotionTr
                  key={transaction.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.2 }}
                  whileHover={{ backgroundColor: 'gray.50' }}
                >
                  <Td>{new Date(transaction.date).toLocaleDateString()}</Td>
                  <Td>{transaction.description}</Td>
                  <Td>
                    <Badge colorScheme="blue">{transaction.category}</Badge>
                  </Td>
                  <Td>
                    <Badge
                      colorScheme={transaction.type === 'income' ? 'green' : 'red'}
                    >
                      {transaction.type === 'income' ? '收入' : '支出'}
                    </Badge>
                  </Td>
                  <Td isNumeric>
                    <Text
                      color={transaction.type === 'income' ? 'green.500' : 'red.500'}
                      fontWeight="bold"
                    >
                      ¥{transaction.amount.toFixed(2)}
                    </Text>
                  </Td>
                  <Td>
                    <IconButton
                      aria-label="删除交易"
                      icon={<DeleteIcon />}
                      size="sm"
                      variant="ghost"
                      colorScheme="red"
                      onClick={() => handleDeleteClick(transaction.id)}
                    />
                  </Td>
                </MotionTr>
              ))}
            </AnimatePresence>
          </Tbody>
        </Table>
      </TableContainer>

      <ConfirmDialog
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={handleConfirmDelete}
        title="删除交易"
        message="确定要删除这条交易记录吗？此操作无法撤销。"
      />
    </Box>
  );
};

export default TransactionList; 