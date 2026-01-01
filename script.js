// --- Dữ liệu câu hỏi & Ảnh ---
const questions = [
    {
        q: "Tuấn Anh thích màu gì?",
        img: "images/a1.png", // Bạn nhớ kiểm tra lại đường dẫn ảnh này nhé
        options: ["Xanh nước biển", "Nâu", "Xám"],
        correct: "all" // Câu 1: Chọn gì cũng đúng
    },
    {
        q: "Quả gì hay bị Tuấn Anh ăn nhất?",
        img: "images/a2.png",
        options: ["Xoài", "Cam", "Măng cụt"],
        correct: "all" // Câu 2: Chọn gì cũng đúng
    },
    {
        q: "Tuấn Anh cao bao nhiêu?",
        img: "images/a3.png",
        options: ["1m36", "1m72", "Cao nhất trong lòng tôi"],
        correct: 2 // Câu 3: Chỉ đáp án thứ 3 (index 2) là đúng
    },
    {
        q: "Tuấn Anh thích đồ ăn vị gì?",
        img: "images/a4.png",
        options: ["Cay", "Ngọt", "Chua"],
        correct: "all" // Câu 4: Chọn gì cũng đúng
    },
    {
        q: "Nếu bạn cho Tuấn Anh chọn: bánh, kẹo, bim bim thì Tuấn Anh lấy gì?",
        img: "images/a5.png",
        options: ["Bánh", "Kẹo", "Sữa"],
        correct: "all" // Câu 5: Chọn gì cũng đúng
    }
];

// --- Biến toàn cục ---
let currentQuestion = 0;
let score = 0;

// --- DANH SÁCH HỆ SỐ MỚI ---
const multipliers = [ 0.26, 2.6, 26, 260, 2026]; 

// --- Hàm tiện ích ---
function showScreen(id) {
    document.querySelectorAll('.container > div').forEach(div => {
        if(div.id !== 'app') div.classList.add('hidden');
    });
    document.getElementById(id).classList.remove('hidden');
}

// --- Logic Quiz ---
function startQuiz() {
    currentQuestion = 0;
    score = 0;
    showScreen('quiz-screen');
    loadQuestion();
}

function loadQuestion() {
    const q = questions[currentQuestion];
    
    document.getElementById('question-number').innerText = `Câu hỏi ${currentQuestion + 1}/${questions.length}`;
    
    const imgElement = document.getElementById('question-img');
    // Kiểm tra xem ảnh có tồn tại không để tránh lỗi
    if(q.img) imgElement.src = q.img;

    document.getElementById('question-text').innerText = q.q;
    
    const container = document.getElementById('options-container');
    container.innerHTML = ''; 

    q.options.forEach((opt, index) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.innerText = opt;
        // Truyền index vào hàm kiểm tra
        btn.onclick = () => checkAnswer(index);
        container.appendChild(btn);
    });
}

// --- CẬP NHẬT LOGIC CHECK ĐÁP ÁN ---
function checkAnswer(selectedIndex) {
    const q = questions[currentQuestion];
    
    // Logic mới:
    // Nếu correct là "all" (chọn gì cũng đúng) HOẶC index chọn trùng với đáp án đúng
    if (q.correct === "all" || selectedIndex === q.correct) {
        score++;
    }
    
    currentQuestion++;
    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        prepareRolling(); // Chuyển sang màn hình quay số
    }
}

// --- Logic Quay Số ---
function prepareRolling() {
    document.getElementById('base-score').innerText = score;
    showScreen('wheel-screen');
}

function startRolling() {
    const spinBtn = document.getElementById('spin-btn');
    const display = document.getElementById('multiplier-display');
    
    spinBtn.disabled = true;
    spinBtn.innerText = "Đang quay...";
    display.classList.add('rolling');

    // Tạo hiệu ứng nhảy số liên tục
    const interval = setInterval(() => {
        const randomVal = multipliers[Math.floor(Math.random() * multipliers.length)];
        display.innerText = "x" + randomVal;
    }, 50);

    // Sau 3 giây thì dừng lại
    setTimeout(() => {
        clearInterval(interval);
        display.classList.remove('rolling');
        
        // Chốt kết quả cuối cùng
        const finalMultiplier = multipliers[Math.floor(Math.random() * multipliers.length)];
        display.innerText = "x" + finalMultiplier;
        
        setTimeout(() => {
            showResult(finalMultiplier);
        }, 1000);
        
    }, 3000);
}

// --- Logic Kết quả ---
function showResult(multiplier) {
    // Tính điểm (làm tròn 2 chữ số thập phân)
    const finalScore = parseFloat((score * multiplier).toFixed(2)); 
    document.getElementById('final-score').innerText = finalScore;
    
    let msg = "";
    if(multiplier < 1) msg = "Phải gỡ, làm hơn 10 điểm có bất ngờ!";
    else if(multiplier > 2 && multiplier <5) msg = "Phải gỡ, Làm hơn 100 điểm có bất ngờ!";
    else if(multiplier > 5 && multiplier <2000) msg = "Phải gỡ, Làm hơn 1000 điểm bạn sẽ hiểu!";
    else if(multiplier*2025 < 1000) msg = "Phải gỡ, Làm hơn 10000 điểm bạn sẽ hiểu!";
    else if(multiplier*2025 > 1000) msg = "Phải gỡ, Làm hơn 100000 điểm bạn sẽ hiểu!";
    else msg = "Lỗi rồi hay sao ấy";

    document.getElementById('msg-result').innerText = `Trả lời đúng: ${score} câu.\nHệ số may mắn: x${multiplier}.\n${msg}`;
    
    showScreen('result-screen');
}

// --- LOGIC ĐỔI VỊ TRÍ NÚT (Troll Game) ---
function swapButtons() {
    const yesBtn = document.getElementById('btn-yes');
    const noBtn = document.getElementById('btn-no');
    
    // Kiểm tra xem nút có tồn tại không để tránh lỗi
    if (!yesBtn || !noBtn) return;

    const parent = yesBtn.parentElement; 

    // Kiểm tra vị trí hiện tại
    if (yesBtn.nextElementSibling === noBtn) {
        // [YES] [NO] -> [NO] [YES]
        parent.insertBefore(noBtn, yesBtn);
    } else {
        // [NO] [YES] -> [YES] [NO]
        parent.insertBefore(yesBtn, noBtn);
    }
}

// --- LOGIC GỬI TIN NHẮN MESSENGER (Nếu bạn đã thêm nút này ở bước trước) ---
function sendToMessenger() {
    const finalScore = document.getElementById('final-score').innerText;
    const message = `Hellu Tuấn Anh, tớ vừa chơi game của cậu và được ${finalScore} điểm nè!`;

    navigator.clipboard.writeText(message).then(() => {
        alert("Đã copy điểm số! Bạn hãy DÁN (Paste) vào ô chat nhé.");
        // Thay link m.me bằng username của bạn
        window.open('https://m.me/USERNAME_FACEBOOK_CUA_BAN', '_blank');
    }).catch(err => {
        // Fallback
        window.open('https://m.me/USERNAME_FACEBOOK_CUA_BAN', '_blank');
    });
}