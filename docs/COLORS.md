# Sistema de Cores - E-commerce

## Paleta Principal (cor 3)

### Cores Base

```css
/* Cores da Paleta */
--color-white: #FFFFFF;
--color-yellow: #FFD300;
--color-gray: #757B81;
--color-dark-gray: #262B32;
--color-black: #090C11;
```

## Guia de Uso

### 1. **Branco (#FFFFFF)**
- **Uso:** Fundo principal, cards, elementos claros
- **Texto sobre:** #262B32 (cinza escuro)
- **Exemplo:** Página inicial, seções de produtos

### 2. **Amarelo/Ouro (#FFD300)**
- **Uso:** Botões de ação, destaques, CTAs (Call-to-Action)
- **Texto sobre:** #262B32 ou #090C11
- **Exemplo:** Botão "Comprar", "Adicionar ao Carrinho", badges

### 3. **Cinza (#757B81)**
- **Uso:** Elementos secundários, bordas, separadores
- **Texto sobre:** #FFFFFF ou #262B32
- **Exemplo:** Inputs desabilitados, linhas divisórias, placeholders

### 4. **Cinza Escuro (#262B32)**
- **Uso:** Texto principal, backgrounds escuros, header
- **Texto sobre:** #FFFFFF
- **Exemplo:** Títulos, parágrafos, navbar

### 5. **Preto (#090C11)**
- **Uso:** Fundo, contraste máximo, footer
- **Texto sobre:** #FFFFFF
- **Exemplo:** Rodapé, fundos com máximo contraste

## Combinações Recomendadas

### Botão Primário
```css
background-color: #FFD300;
color: #262B32;
border: none;
```

### Botão Secundário
```css
background-color: #262B32;
color: #FFFFFF;
border: 2px solid #FFD300;
```

### Card/Container Claro
```css
background-color: #FFFFFF;
color: #262B32;
border: 1px solid #757B81;
```

### Card/Container Escuro
```css
background-color: #262B32;
color: #FFFFFF;
border: 1px solid #757B81;
```

### Link Ativo/Hover
```css
color: #FFD300;
text-decoration: none;
```

## Acessibilidade

✅ Contraste mínimo de 4.5:1 entre:
- Amarelo (#FFD300) + Cinza Escuro (#262B32)
- Branco (#FFFFFF) + Cinza Escuro (#262B32)
- Preto (#090C11) + Branco (#FFFFFF)

## Implementação em React

```jsx
// colors.js
export const colors = {
  white: '#FFFFFF',
  yellow: '#FFD300',
  gray: '#757B81',
  darkGray: '#262B32',
  black: '#090C11',
};

// Uso em componentes
const Button = styled.button`
  background-color: ${colors.yellow};
  color: ${colors.darkGray};
`;
```
