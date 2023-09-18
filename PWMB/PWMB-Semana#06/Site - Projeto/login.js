function login() {
    let nome = document.getElementById('username').value;
    let res = document.getElementById('resultado');

    let mensagem = document.createElement('p');
    mensagem.innerHTML = `Olá <strong>${nome}</strong>! Bem-vindo à PurpleCat`;

    res.innerHTML = '';
    res.appendChild(mensagem);
}
