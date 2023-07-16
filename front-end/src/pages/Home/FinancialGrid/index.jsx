import { useState } from 'react';
import { BiSolidEdit, BiSolidTrash } from 'react-icons/bi';

import { Container } from './styles';

const valueChangeNameAfter = [
  { title: 'Compra de celular novo', category: 'Eletrônicos', value: 1150.5, expense: true },
  { title: 'Salário', category: 'Salário', value: 1320, expense: false },
  { title: 'Compra de carne', category: 'Alimentação', value: 50.70, expense: true },
  { title: 'Venda de brinco', category: 'Vendas', value: 149.9, expense: false },
];

export default function FinancialGrid() {
  const [entries, setEntries] = useState(valueChangeNameAfter);

  const openEditScreen = (index) => {
    const newEntries = [...entries];

    setEntries({ ...newEntries });
  };

  const handleDelete = (index) => {
    const newEntries = [...entries];
    newEntries.splice(index, 1);

    console.log('Adicionar o local Storage para deletar o item');
    setEntries(newEntries);
  };

  return (
    <Container>
      <div>
        <h3>Título</h3>
        <h3>Categoria</h3>
        <h3>Valor</h3>
        <h3>Opções</h3>
      </div>
      {entries.map(({ title, category, value, expense }, index) => (
        <div key={index}>
          <span>{title}</span>
          <span>{category}</span>
          <span style={{ color: expense ? 'red' : 'green' }}>
            {expense && '- '}
            {value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </span>
          <span>
            <div>
              <BiSolidEdit color="#ffa743" onClick={() => openEditScreen(index)} />
              <BiSolidTrash color="#ff5f5f" onClick={() => handleDelete(index)} />
            </div>
          </span>
        </div>
      ))}
    </Container>
  );
}
