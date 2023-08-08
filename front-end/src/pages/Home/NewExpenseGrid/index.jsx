import { useContext, useState } from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';
import { PrimaryButton, SecondaryButton } from '../../../components/Buttons';
import Error from '../../../components/Error';
import { addExpense, updateExpense } from '../../../db/dataProcess';
import { validateNewExpense } from '../../../utils/validation';
import DateContext from '../../../contexts/DateContext';
import Loading from '../../../components/Loading';
// import { getDailyReportStorage, setDailyReportStorage } from '../../../db/localStorage';

export default function NewExpenseGrid({ setVisibility, setUserExpenses, edit, editIndex }) {
  const { date } = useContext(DateContext);

  const [title, setTitle] = useState(edit?.title ?? '');
  const [category, setCategory] = useState(edit?.category ?? '');
  const [value, setValue] = useState(edit?.value ?? '');
  const [expense, setExpense] = useState(edit?.expense ?? false);
  const [newExpenseErrors, setNewExpenseErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  const clearStates = () => {
    setVisibility(false);
    setTitle('');
    setCategory('');
    setValue('');
    setExpense(false);
  };

  const handleAddExpense = async () => {
    const expenseData = [date, { title, category, value, expense }, editIndex];
    const newExpenseErrors = validateNewExpense(expenseData[1]);
    const haveNoErrors = newExpenseErrors.reduce((acc, value) => acc && value.length === 0, true);

    if (haveNoErrors) {
      setLoading(true);

      setNewExpenseErrors([]);
      const { fullReport } = edit
        ? await updateExpense(...expenseData)
        : await addExpense(...expenseData);

      setLoading(false);

      setUserExpenses(fullReport?.[date.year]?.[date.month]?.[date.date] || []);
      // setDailyReportStorage(date, { title, category, value, expense }, editIndex);
      // setUserExpenses(getDailyReportStorage(date));
      clearStates();
    } else {
      setNewExpenseErrors(newExpenseErrors);
    }
  };

  const handleCancel = () => clearStates();

  return (
    <Container>
      <div>
        <div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Título"
          />
          <Error>{newExpenseErrors[0]}</Error>
        </div>
        <div>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Categoria"
          />
          <Error>{newExpenseErrors[1]}</Error>
        </div>
        <div>
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value !== '' ? Number(e.target.value) : '')}
            placeholder="Valor"
          />
          <Error>{newExpenseErrors[2]}</Error>
        </div>
        <div>
          <select
            value={expense}
            onChange={(e) => setExpense(e.target.value === 'true')}
          >
            <option value={false}>Receita</option>
            <option value={true}>Despesa</option>
          </select>
          <Error>{newExpenseErrors[3]}</Error>
        </div>
        <section>
          <PrimaryButton onClick={handleAddExpense}>
            {loading
              ? <Loading $sz={21} style={{ margin: '0 auto' }}/>
              : edit ? 'Salvar' : 'Adicionar'}
          </PrimaryButton>
          <SecondaryButton onClick={handleCancel}>Cancelar</SecondaryButton>
        </section>
      </div>
    </Container>
  );
}

NewExpenseGrid.propTypes = {
  setVisibility: PropTypes.func.isRequired,
  setUserExpenses: PropTypes.func.isRequired,
  edit: PropTypes.shape({
    title: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    expense: PropTypes.bool.isRequired,
  }),
  editIndex: PropTypes.number,
};
