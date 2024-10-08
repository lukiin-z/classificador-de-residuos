// Importar TensorFlow.js
const preview = document.getElementById('preview');
const classificationResult = document.getElementById('classificationResult');
let model; // Variável para armazenar o modelo MobileNet

// Função para carregar o modelo MobileNet pré-treinado
async function loadModel() {
    classificationResult.textContent = 'Carregando modelo...';
    model = await tf.loadLayersModel('https://storage.googleapis.com/tfjs-models/tfjs/mobilenet_v1_0.25_224/model.json');
    classificationResult.textContent = 'Modelo carregado com sucesso!';
    console.log('Modelo MobileNet carregado.');
}

loadModel();

// Função para processar a imagem carregada e fazer a classificação
async function classifyImage(imgElement) {
    const tensorImg = tf.browser.fromPixels(imgElement).resizeNearestNeighbor([224, 224]).toFloat().expandDims();
    const predictions = await model.predict(tensorImg).data();
    const topPrediction = Array.from(predictions)
        .map((p, i) => ({ probability: p, className: i })) // i representaria as classes em um modelo específico
        .sort((a, b) => b.probability - a.probability)
        .slice(0, 3); // Pegando as três classes com maior probabilidade

    classificationResult.innerHTML = `Previsão: ${topPrediction[0].className} - Probabilidade: ${topPrediction[0].probability.toFixed(2)}`;
}

// Evento para detectar o carregamento da imagem pelo usuário e chamar a função classifyImage
imageUpload.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const img = document.createElement('img');
            img.src = e.target.result;
            img.onload = () => classifyImage(img);
            preview.innerHTML = '';
            preview.appendChild(img);
        };
        reader.readAsDataURL(file);
    }
});