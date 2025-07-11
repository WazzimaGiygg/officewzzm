// Selecionando os elementos HTML
const canvas = document.getElementById('paintCanvas');
const ctx = canvas.getContext('2d'); // Contexto 2D para desenhar no canvas
const colorPicker = document.getElementById('colorPicker');
const pencilBtn = document.getElementById('pencilBtn');
const eraserBtn = document.getElementById('eraserBtn');
const clearBtn = document.getElementById('clearBtn');

// Variáveis de estado
let isDrawing = false; // Indica se o mouse está pressionado e desenhando
let currentColor = '#000000'; // Cor inicial: preto
let currentTool = 'pencil'; // Ferramenta inicial: lápis
let penSize = 2; // Tamanho da linha para lápis e borracha

// --- Funções de Eventos ---

// Função chamada quando o mouse é pressionado no canvas
canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    // Inicia um novo caminho de desenho
    ctx.beginPath();
    // Move o "cursor" de desenho para a posição atual do mouse
    // ajustando para a posição do canvas
    ctx.moveTo(e.offsetX, e.offsetY);
});

// Função chamada quando o mouse se move sobre o canvas
canvas.addEventListener('mousemove', (e) => {
    if (!isDrawing) return; // Só desenha se o mouse estiver pressionado

    // Define a cor e a espessura da linha
    ctx.lineWidth = penSize;
    ctx.lineCap = 'round'; // Pontas da linha arredondadas
    ctx.strokeStyle = currentColor;

    // Desenha uma linha até a posição atual do mouse
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke(); // Efetivamente desenha a linha
});

// Função chamada quando o mouse é solto ou sai do canvas
canvas.addEventListener('mouseup', () => {
    isDrawing = false;
    ctx.closePath(); // Fecha o caminho de desenho atual
});

canvas.addEventListener('mouseout', () => {
    isDrawing = false;
    ctx.closePath(); // Fecha o caminho de desenho se o mouse sair do canvas
});

// --- Funções da Barra de Ferramentas ---

// Evento para o seletor de cores
colorPicker.addEventListener('input', (e) => {
    currentColor = e.target.value;
    // Quando a cor muda, garantimos que a ferramenta seja o lápis
    currentTool = 'pencil';
    setActiveTool(pencilBtn);
});

// Evento para o botão Lápis
pencilBtn.addEventListener('click', () => {
    currentTool = 'pencil';
    currentColor = colorPicker.value; // Garante que a cor do lápis seja a selecionada
    penSize = 2; // Tamanho padrão para o lápis
    setActiveTool(pencilBtn);
});

// Evento para o botão Borracha
eraserBtn.addEventListener('click', () => {
    currentTool = 'eraser';
    // A "cor" da borracha é a mesma do fundo do canvas
    currentColor = '#FFFFFF';
    penSize = 10; // A borracha é geralmente maior
    setActiveTool(eraserBtn);
});

// Evento para o botão Limpar
clearBtn.addEventListener('click', () => {
    // Limpa todo o conteúdo do canvas, preenchendo com um retângulo transparente
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// --- Função Auxiliar ---

// Adiciona uma classe para destacar a ferramenta ativa
function setActiveTool(button) {
    // Remove a classe 'active' de todos os botões
    document.querySelectorAll('.toolbar button').forEach(btn => {
        btn.classList.remove('active');
    });
    // Adiciona a classe 'active' ao botão clicado
    button.classList.add('active');
}

// Inicializa a ferramenta lápis como ativa
setActiveTool(pencilBtn);
