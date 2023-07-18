import { useState } from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';
import { PrimaryButton, SecondaryButton } from '../../../components/Buttons';
import { getDailyReportStorage, setDailyReportStorage } from '../../../db/localStorage';

export default function NewExpenseGrid({
  setVisibility,
  setUserExpenses,
  edit,
  editIndex,
  date,
}) {
  const [title, setTitle] = useState(edit?.title ?? '');
  const [category, setCategory] = useState(edit?.category ?? '');
  const [value, setValue] = useState(edit?.value ?? '');
  const [expense, setExpense] = useState(edit?.expense ?? false);

  const clearStates = () => {
    setVisibility(false);
    setTitle('');
    setCategory('');
    setValue('');
    setExpense(false);
  };

  console.log('Fazer avisos para quando o usuário digitar algum valor incorreto ou em branco');
  console.log('Estilizar melhor o newExpenseGrid');

  const handleAddExpense = () => {
    setDailyReportStorage(date, { title, category, value, expense }, editIndex);
    setUserExpenses(getDailyReportStorage(date));
    // if (title !== '' && category !== '' && value !== '') {
    //   if (edit) {
    //     setUserExpenses((expenses) => {
    //       const newExpenses = [...expenses];
    //       newExpenses[editIndex] = {
    //         title,
    //         category,
    //         value,
    //         expense,
    //       };
    //       return newExpenses;
    //     });
    //   } else {
    //     setUserExpenses((expenses) => [
    //       ...expenses,
    //       { title, category, value, expense },
    //     ]);
    //   }
    // }
    clearStates();
  };

  const handleCancel = () => {
    setVisibility(false);
    clearStates();
  };

  return (
    <Container>
      <div>
        <div>
          <h3>Título</h3>
          <h3>Categoria</h3>
          <h3>Valor</h3>
          <h3>Tipo</h3>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(Number(e.target.value))}
          />
          <select
            value={expense}
            onChange={(e) => setExpense(e.target.value === 'true')}
          >
            <option value={false}>Receita</option>
            <option value={true}>Despeza</option>
          </select>
        </div>
        <section>
          <PrimaryButton onClick={handleAddExpense}>
            {edit ? 'Salvar' : 'Adicionar'}
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
  date: PropTypes.shape({
    year: PropTypes.number.isRequired,
    month: PropTypes.number.isRequired,
    date: PropTypes.number.isRequired,
  }),
};
