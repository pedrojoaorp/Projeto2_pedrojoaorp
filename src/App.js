import { useEffect, useState } from 'react';
import './App.css';
import { userData } from './userData';

function App() {
  const [currentPage, setCurrentPage] = useState(0)
  const usersPerPage = 5
  function mod(n, m){
    return ((n % m) + m) % m;
  }
  const usersPerPageArray = []
  for (let index = 0; index < usersPerPage; index++) {
    usersPerPageArray.push(index)
  }
  const numberOfPagesArray = []
  for (let index = 0; index < Math.ceil(userData.length/usersPerPage); index++) {
    numberOfPagesArray.push(index)
  }
  function findUserInfo(userNumber) {
    const Nome = userData[userNumber]['first_name'] + ' ' + userData[userNumber]['last_name']
    const Email = userData[userNumber]['email']
    const CadastradoEm = userData[userNumber]['created_at']
    return ({nome:Nome, email:Email, cadastrado_em:CadastradoEm})
  }
  function deleteUserInfo(userNumber) {
    userData.splice(userNumber, 1)
    }
  const prevPageText = '<<'
  const nextPageText = '>>'

  return (
    <>
      <header>
        <div class="site_menu">
            <h3>dinnerdash</h3>
            <nav class="header_links">
                <a href="#">backoffice</a>
                <a href="#">perfil</a>
                <a href="#">sair</a>
            </nav>
        </div>
        <div>
            <h1>Backoffice</h1>
            <p>Gerencie pedidos, refeições e mais.</p>
        </div>
    </header>
    <nav class="backoffice_menu">
        <a href="#">Pedidos</a> 
        <a href="#">Usuários</a>
        <a href="#">Refeições</a>
        <a href="#">Categorias de Refeição</a>
    </nav>
    <main>
      <table>
        <thead>
          <th>Nome</th>
          <th>Email</th>
          <th>Cadastrado em</th>
          <th></th>
        </thead>
        <tbody>
          {usersPerPageArray.map((ind) => {
              return (userData[ind+(currentPage*usersPerPage)] ? 
              <tr class={(ind+(currentPage*5)).toString()}>
                <td id='nome'>{findUserInfo(ind+(currentPage*usersPerPage))['nome']}</td> 
                <td id='email'>{findUserInfo(ind+(currentPage*usersPerPage))['email']}</td>
                <td id='cadastrado_em'>{findUserInfo(ind+(currentPage*usersPerPage))['cadastrado_em']}</td>
                <td class='action_buttons'>
                  <button class={'edit_button'} id={'text_button'}>editar</button>
                  <button class={'delete_button'} id={'text_button'} onClick={() => deleteUserInfo(ind)}>deletar</button>
                </td>
              </tr> :
              null)
            })}
        </tbody>
      </table>
      <div class='pagination'>
        <button onClick={() => setCurrentPage(mod(currentPage-1, Math.ceil(userData.length/usersPerPage)))}>{prevPageText}</button>
        {numberOfPagesArray.map((ind) => {
          return (
            <button onClick={() => setCurrentPage(ind)}>{(ind+1).toString()}</button>
          )
        })}
        <button onClick={() => setCurrentPage(mod(currentPage+1, Math.ceil(userData.length/usersPerPage)))}>{nextPageText}</button>
      </div>
    </main>
    <footer>
        <span>dinnerdash | todos os direitos reservados</span>
        <span>desenvolvido por Trainee Legal</span>
    </footer>
    </>
  );
}

export default App;