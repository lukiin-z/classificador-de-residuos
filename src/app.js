// Função para exibir a imagem carregada pelo usuário
const imageUpload = document.getElementById('imageUpload');
const preview = document.getElementById('preview');
const classificationResult = document.getElementById('classificationResult');

imageUpload.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const img = document.createElement('img');
            img.src = e.target.result;
            preview.innerHTML = '';
            preview.appendChild(img);
        };
        reader.readAsDataURL(file);
    }
});

// Função para carregar o modelo do TensorFlow.js
async function loadModel() {
    console.log('Carregando o modelo...');
    const model = await tf.loadLayersModel('https://link-para-seu-modelo/model.json');
    console.log('Modelo carregado com sucesso!');
    return model;
}

loadModel().then(model => {
    console.log('Modelo pronto para uso.');
});
