import { useEffect, useState } from 'react';
import { BiSolidEdit, BiSolidTrash } from 'react-icons/bi';
import PropTypes from 'prop-types';

import { Container, NoExpenses } from './styles';
import NewExpenseGrid from '../NewExpenseGrid';

export default function FinancialGrid({ userExpenses, setUserExpenses }) {
  const [total, setTotal] = useState(0);
  const [editIndex, setEditIndex] = useState(null);
  const [editVisibility, setEditVisibility] = useState(false);
  const [edit, setEdit] = useState({});

  useEffect(() => {
    setTotal(userExpenses.reduce((sum, entry) => {
      return sum = sum + entry.value * (entry.expense ? -1 : 1);
    }, 0));
  }, [userExpenses]);

  const openEditScreen = (index) => {
    console.log(userExpenses[index]);
    setEdit(userExpenses[index]);
    setEditIndex(index);
    setEditVisibility(true);
  };

  const handleDelete = (index) => {
    const newUserExpenses = [...userExpenses];
    newUserExpenses.splice(index, 1);

    console.log('Adicionar o local Storage para deletar o item');
    setUserExpenses(newUserExpenses);
  };

  const handleDeleteAll = () => {
    console.log('Adicionar o localStorage para limpar todos os dados do dia');
    setUserExpenses([]);
  };

  return userExpenses.length === 0 ? (
    <NoExpenses>
      <h3>Nenhum dado para exibir.</h3>
      <h3>Adicione receitas ou despesas para atualizar o relatório diário.</h3>
    </NoExpenses>
  ) : (
    <>
      <Container>
        <header>
          <h3>Título</h3>
          <h3>Categoria</h3>
          <h3>Valor</h3>
          <h3>Ações</h3>
        </header>
        {userExpenses.map(({ title, category, value, expense }, index) => (
          <div key={index}>
            <span>{title}</span>
            <span>{category}</span>
            <span style={{ color: expense ? 'red' : 'green' }}>
              {expense && '-'}
              {value.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
            </span>
            <span>
              <div>
                <BiSolidEdit
                  color="#ffa743"
                  onClick={() => openEditScreen(index)}
                />
                <BiSolidTrash
                  color="#ff5f5f"
                  onClick={() => handleDelete(index)}
                />
              </div>
            </span>
          </div>
        ))}
        <footer>
          <h3>Total</h3>
          <h3>{total > 0 ? 'Lucro' : total === 0 ? 'Neutro' : 'Despeza' }</h3>
          <h3 style={{ color: total > 0 ? 'green' : total === 0 ? '#333' : 'red' }}>
            {total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </h3>
          <h3>
            {userExpenses.length > 0 && <BiSolidTrash
              color="#ff5f5f"
              onClick={handleDeleteAll}
            />}
          </h3>
        </footer>
      </Container>
      {editVisibility &&
        <NewExpenseGrid
          visibility={editVisibility}
          setVisibility={setEditVisibility}
          setUserExpenses={setUserExpenses}
          editIndex={editIndex}
          edit={edit}
        />
      }
    </>
  );
}

FinancialGrid.propTypes = {
  userExpenses: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
      expense: PropTypes.bool.isRequired,
    }),
  ).isRequired,
  setUserExpenses: PropTypes.func.isRequired,
};
