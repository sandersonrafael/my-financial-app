import { useState } from 'react';
import { Form } from './styles';
import { PrimaryButton, SecondaryButton } from '../../../components/Buttons';
import Error from '../../../components/Error';
import { attUserData } from '../../../db/dataProcess';

const getName = () => {
  const userAccess = localStorage.getItem('userAccess')?.split(' ');
  if (userAccess) {
    userAccess.splice(0, 2);
    return userAccess.join(' ');
  }
  return '';
};

export default function UserData() {
  const [editingUserData, setEditingUserData] = useState(false);
  const [editingPassword, setEditingPassword] = useState(false);
  const [name, setName] = useState(getName());
  const [email, setEmail] = useState('');
  console.log(
    'Fazer o context para obter o nome de usuário, id e e-mail\n' +
    'Tirar os completes manuais do componente UserData',
  );
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [repeatNewPassword, setRepeatNewPassword] = useState('');

  const handlePrimaryButton = async () => {
    attUserData(name, email, password, newPassword, repeatNewPassword);
  };

  const handleSecondaryButton = () => {
    if (editingUserData || editingPassword) {
      setEditingUserData(false);
      setEditingPassword(false);
    }
    if (!editingUserData && !editingPassword) {
      setEditingPassword(true);
    }
  };

  return (
    <>
      <h2>Dados de Usuário</h2>
      <div>
        <Form>
          <h3>Edite ou atualize os seus dados</h3>
          {editingPassword || <>
            <input
              disabled={!editingUserData}
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nome Completo"
            />
            <Error>ok</Error>
          </>}
          {editingPassword || <>
            <input
              disabled={!editingUserData}
              type="text"
              value=""
              placeholder="E-mail de Usuário"
            />
          </>}
          <input
            disabled={!editingUserData && !editingPassword}
            type="password"
            placeholder={
              editingUserData ? 'Digite sua senha para confirmar' :
                editingPassword ? 'Digite sua Senha Atual' : '••••••••••'
            }
          />
          {editingPassword && <>
            <input type="password" placeholder="Digite sua Nova Senha" />
            <input type="password" placeholder="Confirme sua Nova Senha" />
          </>}
          <div>
            <PrimaryButton onClick={handlePrimaryButton}>
              {editingUserData || editingPassword ? 'Salvar' : 'Editar Dados'}
            </PrimaryButton>
            <SecondaryButton onClick={handleSecondaryButton}>
              {editingUserData || editingPassword ? 'Cancelar' : 'Mudar Senha'}
            </SecondaryButton>
          </div>
        </Form>
      </div>
    </>
  );
}
