import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select as ChakraSelect,
  VStack,
  useToast,
  FormErrorMessage,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { Transaction } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

const MotionModalContent = motion(ModalContent);

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<Transaction, 'id' | 'user'>) => Promise<void>;
}

const TransactionModal: React.FC<TransactionModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Omit<Transaction, 'id' | 'user'>>();
  const toast = useToast();

  const handleFormSubmit = async (data: Omit<Transaction, 'id' | 'user'>) => {
    try {
      await onSubmit(data);
      toast({
        title: '交易已添加',
        status: 'success',
        duration: 3000,
      });
      reset();
      onClose();
    } catch (error) {
      toast({
        title: '添加失败',
        status: 'error',
        duration: 3000,
      });
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <MotionModalContent
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
          >
            <ModalHeader>添加新交易</ModalHeader>
            <ModalCloseButton />
            <form onSubmit={handleSubmit(handleFormSubmit)}>
              <ModalBody>
                <VStack spacing={4}>
                  <FormControl isRequired isInvalid={!!errors.amount}>
                    <FormLabel>金额</FormLabel>
                    <Input
                      type="number"
                      step="0.01"
                      {...register('amount', {
                        required: '请输入金额',
                        min: {
                          value: 0.01,
                          message: '金额必须大于0',
                        },
                        valueAsNumber: true,
                      })}
                    />
                    <FormErrorMessage>
                      {errors.amount && errors.amount.message}
                    </FormErrorMessage>
                  </FormControl>

                  <FormControl isRequired isInvalid={!!errors.description}>
                    <FormLabel>描述</FormLabel>
                    <Input
                      {...register('description', {
                        required: '请输入描述',
                        minLength: {
                          value: 2,
                          message: '描述至少需要2个字符',
                        },
                      })}
                    />
                    <FormErrorMessage>
                      {errors.description && errors.description.message}
                    </FormErrorMessage>
                  </FormControl>

                  <FormControl isRequired isInvalid={!!errors.category}>
                    <FormLabel>类别</FormLabel>
                    <ChakraSelect
                      {...register('category', {
                        required: '请选择类别',
                      })}
                    >
                      <option value="">请选择类别</option>
                      <option value="餐饮">餐饮</option>
                      <option value="交通">交通</option>
                      <option value="购物">购物</option>
                      <option value="娱乐">娱乐</option>
                      <option value="工资">工资</option>
                      <option value="投资">投资</option>
                      <option value="其他">其他</option>
                    </ChakraSelect>
                    <FormErrorMessage>
                      {errors.category && errors.category.message}
                    </FormErrorMessage>
                  </FormControl>

                  <FormControl isRequired isInvalid={!!errors.type}>
                    <FormLabel>类型</FormLabel>
                    <ChakraSelect
                      {...register('type', {
                        required: '请选择类型',
                      })}
                    >
                      <option value="">请选择类型</option>
                      <option value="expense">支出</option>
                      <option value="income">收入</option>
                    </ChakraSelect>
                    <FormErrorMessage>
                      {errors.type && errors.type.message}
                    </FormErrorMessage>
                  </FormControl>

                  <FormControl isRequired isInvalid={!!errors.date}>
                    <FormLabel>日期</FormLabel>
                    <Input
                      type="datetime-local"
                      {...register('date', {
                        required: '请选择日期',
                      })}
                    />
                    <FormErrorMessage>
                      {errors.date && errors.date.message}
                    </FormErrorMessage>
                  </FormControl>
                </VStack>
              </ModalBody>

              <ModalFooter>
                <Button
                  type="submit"
                  colorScheme="blue"
                  mr={3}
                  isLoading={isSubmitting}
                >
                  保存
                </Button>
                <Button onClick={onClose}>取消</Button>
              </ModalFooter>
            </form>
          </MotionModalContent>
        </Modal>
      )}
    </AnimatePresence>
  );
};

export default TransactionModal; 