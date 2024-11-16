import { extendTheme, ThemeConfig, theme as baseTheme } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  colors: {
    ...baseTheme.colors,
    brand: {
      50: '#E6F6FF',
      100: '#BAE3FF',
      200: '#7CC4FA',
      300: '#47A3F3',
      400: '#2186EB',
      500: '#0967D2',
      600: '#0552B5',
      700: '#03449E',
      800: '#01337D',
      900: '#002159',
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'semibold',
      },
      defaultProps: {
        colorScheme: 'brand',
      },
    },
    Link: {
      baseStyle: {
        _hover: {
          textDecoration: 'none',
        },
      },
    },
    Table: {
      variants: {
        simple: {
          th: {
            borderBottom: '1px',
            borderColor: 'gray.200',
            padding: '1rem',
            textTransform: 'none',
            letterSpacing: 'normal',
            fontWeight: 'semibold',
          },
          td: {
            borderBottom: '1px',
            borderColor: 'gray.200',
            padding: '1rem',
          },
        },
      },
    },
  },
});

export default theme; 