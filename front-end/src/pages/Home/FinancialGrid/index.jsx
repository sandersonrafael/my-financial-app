import { useContext, useEffect, useState } from 'react';
import { BiSolidCheckShield, BiSolidEdit, BiSolidTrash } from 'react-icons/bi';
import PropTypes from 'prop-types';

import NewExpenseGrid from '../NewExpenseGrid';
// import { deleteDailyReportStorage, getDailyReportStorage } from '../../../db/localStorage';
import { deleteExpense } from '../../../db/dataProcess';
import formatCurrency from '../../../utils/formatCurrency';
import { Container, NoExpenses } from './styles';
import DateContext from '../../../contexts/DateContext';
import Loading from '../../../components/Loading';

export default function FinancialGrid({ userExpenses, setUserExpenses }) {
  const { date } = useContext(DateContext);

  const [total, setTotal] = useState(0);
  const [editIndex, setEditIndex] = useState(null);
  const [editVisibility, setEditVisibility] = useState(false);
  const [edit, setEdit] = useState({});
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState({ active: false, index: null });
  const [interval, setInterval] = useState(null);

  useEffect(() => {
    setTotal(userExpenses.reduce((sum, entry) => {
      return sum = sum + entry.value * (entry.expense ? -1 : 1);
    }, 0));
  }, [userExpenses]);

  const openEditScreen = (index) => {
    setEdit(userExpenses[index]);
    setEditIndex(index);
    setEditVisibility(true);
  };

  const handleDelete = (index) => {
    clearInterval(interval);
    index = typeof index === 'number' ? index : undefined;
    setDeleting({ active: true, index });
    setInterval(setTimeout(() => setDeleting({ active: false, index: null }), 1200));
  };

  const handleDeleteConfirm = async (index) => {
    clearInterval(interval);

    index = typeof index === 'number' ? index : null;
    setLoading(true);

    const { fullReport } = await deleteExpense(date, index);
    setUserExpenses(fullReport?.[date.year]?.[date.month]?.[date.date] || []);

    setLoading(false);
    setDeleting({ active: false, index: null });
    // deleteDailyReportStorage(date, index);
    // setUserExpenses(getDailyReportStorage(date));
  };

  return (
    userExpenses.length === 0 ? (
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
              <span style={{ color: value !== 0 ? expense ? 'red': 'green' : '#555' }}>
                {expense && '-'}
                {formatCurrency(value)}
              </span>
              <span>
                {loading && deleting.index === index ?
                  <Loading $sz={24} $cl="#ff5f5f" />
                  : (
                    <div>
                      <BiSolidEdit
                        color="#ffa743"
                        onClick={() => openEditScreen(index)}
                      />
                      {deleting.active && deleting.index === index ? (
                        <BiSolidCheckShield
                          color="#ff5f5f"
                          onClick={() => handleDeleteConfirm(index)}
                        />
                      ) : (
                        <BiSolidTrash
                          color="#ff5f5f"
                          onClick={() => handleDelete(index)}
                        />
                      )}
                    </div>
                  )}
              </span>
            </div>
          ))}
          <footer>
            <h3>Total</h3>
            <h3>{total > 0 ? 'Lucro' : total === 0 ? 'Empate' : 'Despesa' }</h3>
            <h3 style={{ color: total > 0 ? 'green' : total === 0 ? '#333' : 'red' }}>
              {formatCurrency(total)}
            </h3>
            <h3>
              {userExpenses.length <= 0 ? '' : deleting.active && deleting.index === undefined ?
                <BiSolidCheckShield
                  color="#ff5f5f"
                  onClick={handleDeleteConfirm}
                />
                :
                <BiSolidTrash
                  color="#ff5f5f"
                  onClick={handleDelete}
                />
              }
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
    )
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
