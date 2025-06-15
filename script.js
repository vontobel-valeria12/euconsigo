// Mostrar a categoria selecionada (ex: Frühstück, Mittagessen, etc.)
function mostrarCategoria(idCategoria) {
  // Esconde todas as categorias
  const categorias = document.querySelectorAll('.categoria');
  categorias.forEach(cat => {
    cat.style.display = 'none';
  });

  // Esconde todas as receitas
  const receitas = document.querySelectorAll('.receita');
  receitas.forEach(rec => {
    rec.style.display = 'none';
  });

  // Mostra a categoria escolhida
  const categoriaSelecionada = document.getElementById(idCategoria);
  if (categoriaSelecionada) {
    categoriaSelecionada.style.display = 'block';
  }
}

// Mostrar a receita escolhida
function mostrarReceita(idReceita) {
  // Esconde todas as receitas
  const receitas = document.querySelectorAll('.receita');
  receitas.forEach(rec => {
    rec.style.display = 'none';
  });

  // Mostra apenas a receita selecionada
  const receitaSelecionada = document.getElementById(idReceita);
  if (receitaSelecionada) {
    receitaSelecionada.style.display = 'block';
  }
}

// Abrir/Fechar menu lateral com botão ☰ (se você usar esse recurso)
document.addEventListener('DOMContentLoaded', function () {
  const toggleButton = document.querySelector('.buttontoggle');
  const seitenmenue = document.querySelector('.seitenmenü');

  if (toggleButton && seitenmenue) {
    toggleButton.addEventListener('click', function () {
      seitenmenue.classList.toggle('aberto');
    });
  }
});

