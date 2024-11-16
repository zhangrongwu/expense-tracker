import React from 'react';
import {
  Box,
  Heading,
  useColorModeValue,
} from '@chakra-ui/react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts';
import { Transaction } from '../types';

interface ExpenseChartProps {
  transactions: Transaction[];
}

interface ChartData {
  name: string;
  value: number;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const ExpenseChart: React.FC<ExpenseChartProps> = ({ transactions }) => {
  const bgColor = useColorModeValue('white', 'gray.800');

  const calculateCategoryData = (): ChartData[] => {
    const expensesByCategory = transactions
      .filter((t) => t.type === 'expense')
      .reduce((acc, curr) => {
        acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
        return acc;
      }, {} as Record<string, number>);

    return Object.entries(expensesByCategory).map(([name, value]) => ({
      name,
      value,
    }));
  };

  const data = calculateCategoryData();

  return (
    <Box bg={bgColor} p={6} rounded="lg" shadow="sm">
      <Heading size="md" mb={4}>
        支出分类
      </Heading>
      <Box h="300px">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) =>
                `${name} ${(percent * 100).toFixed(0)}%`
              }
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number) => [`¥${value.toFixed(2)}`, '金额']}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};

export default ExpenseChart; 