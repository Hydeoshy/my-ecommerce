# ⚠️ LEGACY FOLDER

Esta pasta contém arquivos antigos em JavaScript que **NÃO DEVEM SER USADOS**.

## Por que está aqui?
- Migração de JavaScript para TypeScript
- Substituídos por versões `.tsx` em `src/`
- Código legado mantido apenas para referência histórica

## Estrutura
```
_legacy/
├── components/
│   └── ui/           (Componentes UI antigos em .js)
└── features/
    └── shared/       (Features compartilhadas antigas em .js)
```

## ✅ Use em vez disso
- **Componentes UI**: `src/components/ui/*.tsx`
- **Features**: `src/features/*/components/*.tsx`

## 📝 Notas
- Todos os componentes foram portados para TypeScript
- Cores foram atualizadas (verde → amarelo)
- Novo sistema com Carousel, CountdownTimer, etc
- Se precisar de algo antigo, porte para .tsx em vez de usar isso
