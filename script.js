// --- Dữ liệu 15 câu hỏi ---
const questions = [
    {
        q: "Kem nào bị Tuấn Anh ăn nhiều nhất?",
        img: "images/q1.png", 
        options: ["Kem Vani", "Kem Socola", "Kem Dâu"], 
        correct: 0 
    },
    {
        q: "Loài động vật mà Tuấn Anh thích nhất?",
        img: "images/q2.png",
        options: ["Muỗi", "Mèo", "Cá voi"],
        correct: 2
    },
    {
        q: "Nếu bạn lì xì Tuấn Anh 200k Tuấn Anh sẽ làm gì?",
        img: "images/q3.png",
        options: ["Tiết kiệm", "Mua quần áo mới", "Tuấn Anh sẽ quý bạn nhất"],
        correct: 2
    },
    {
        q: "Thời gian yêu thích trong năm của Tuấn Anh là gì?",
        img: "images/q4.png",
        options: ["Mùa Xuân", "Mùa Hè", "Mùa Đông"],
        correct: 0
    },
    {
        q: "Nếu bạn cho Tuấn Anh chọn: bánh, kẹo, bimbim thì Tuấn Anh sẽ lấy gì?",
        img: "images/q5.png",
        options: ["Bánh", "Kẹo", "Bim bim"],
        correct: 2
    },
    {
        q: "Tuấn Anh đang sống ở đâu?",
        img: "images/q6.png",
        options: ["Hồ Chí Minh", "Hải Phòng", "Hà Nội"],
        correct: 2
    },
    {
        q: "Tuấn Anh thích vị gì nhất",
        img: "images/q7.png",
        options: ["Cay", "Chua", "Ngọt"],
        correct: 0
    },
    {
        q: "Loại thời tiết mà Tuấn Anh thích là gì?",
        img: "images/q8.png",
        options: ["Nắng nhẹ", "Mưa rào", "Se lạnh"],
        correct: 0
    },
    {
        q: "Tuấn Anh cao bao nhiêu",
        img: "images/q9.png",
        options: ["1m36", "1m72", "1m18"],
        correct: 1
    },
    {
        q: "Tuấn Anh thích màu gì?",
        img: "images/q10.png",
        options: ["Xanh nước biển", "Xám", "Nâu"],
        correct: 1
    },
    {
        q: "Quả gì bị Tuấn Anh ăn nhiều nhất?",
        img: "images/q11.png",
        options: ["Xoài", "Cam", "Măng cụt"],
        correct: 0
    },
    {
        q: "Tuấn Anh thích đi du lịch nơi nào?",
        img: "images/q12.png",
        options: ["Phòng ngủ", "Lớp học", "Thượng Hải"],
        correct: 2
    },
    {
        q: "Điều gì quan trọng nhất đối với Tuấn Anh?",
        img: "images/q13.png",
        options: ["Mì phải trộn", "Mì phải xào", "Mì nước"],
        correct: 0
    },
    {
        q: "Thức uống Tuấn Anh uống nhiều nhất?",
        img: "images/q14.png",
        options: ["Trà sữa", "Cà phê", "Nước lọc"],
        correct: 2
    },
    {
        q: "Tuấn Anh sẽ làm gì nếu trúng số độc đắc?",
        img: "images/q15.png",
        options: ["Mua nhà", "Mua siêu xe", "Tỉnh dậy"],
        correct: 2
    }
];

// --- Biến toàn cục ---
let currentQuestion = 0;
let score = 0;

// --- DANH SÁCH HỆ SỐ ---
const multipliers = [0.26, 2.6, 26, 260, 0.26, 2.6, 26, 2026, 0.26, 2.6, 26]; 

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
    if(q.img) imgElement.src = q.img;

    document.getElementById('question-text').innerText = q.q;
    
    const container = document.getElementById('options-container');
    container.innerHTML = ''; 

    q.options.forEach((opt, index) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.innerText = opt;
        btn.onclick = () => checkAnswer(index);
        container.appendChild(btn);
    });
}

// --- Logic Check Đáp Án ---
// --- Thay thế hàm checkAnswer cũ bằng hàm này ---

function checkAnswer(selectedIndex) {
    // 1. Lấy tất cả các nút đáp án
    const buttons = document.querySelectorAll('.option-btn');
    const correctIndex = questions[currentQuestion].correct;

    // 2. Khóa tất cả các nút để tránh click nhiều lần
    buttons.forEach(btn => btn.classList.add('disabled'));

    // 3. Xử lý Logic màu sắc
    if (selectedIndex === correctIndex) {
        // TRƯỜNG HỢP ĐÚNG:
        score++;
        // Thêm class 'correct' (Xanh biển) cho nút vừa chọn
        buttons[selectedIndex].classList.add('correct'); 
    } else {
        // TRƯỜNG HỢP SAI:
        // Thêm class 'wrong' (Cam) cho nút vừa chọn
        buttons[selectedIndex].classList.add('wrong');
        
        // Đồng thời hiện đáp án đúng (Xanh biển) để người chơi biết
        buttons[correctIndex].classList.add('correct'); 
    }
    
    // 4. Đợi 1.5 giây rồi mới chuyển câu hỏi (để người chơi kịp nhìn màu)
    setTimeout(() => {
        currentQuestion++;
        if (currentQuestion < questions.length) {
            loadQuestion();
        } else {
            prepareRolling(); 
        }
    }, 1500); // 1500ms = 1.5 giây
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

    const interval = setInterval(() => {
        const randomVal = multipliers[Math.floor(Math.random() * multipliers.length)];
        display.innerText = "x" + randomVal;
    }, 50);

    setTimeout(() => {
        clearInterval(interval);
        display.classList.remove('rolling');
        
        const finalMultiplier = multipliers[Math.floor(Math.random() * multipliers.length)];
        display.innerText = "x" + finalMultiplier;
        
        setTimeout(() => {
            showResult(finalMultiplier);
        }, 1000);
        
    }, 3000);
}

// --- Logic Kết quả (ĐÃ SỬA THEO TỔNG ĐIỂM) ---
function showResult(multiplier) {
    // 1. Tính tổng điểm trước
    const finalScore = parseFloat((score * multiplier).toFixed(2)); 
    document.getElementById('final-score').innerText = finalScore;
    
    let msg = "";

    // 2. So sánh biến finalScore (Tổng điểm) thay vì multiplier (Hệ số)
    
    if (finalScore < 10) { 
        // Ví dụ: Trả lời ít câu x hệ số thấp -> Điểm < 10
        msg = "Phải gỡ, làm hơn 10 điểm có bất ngờ!";
    } 
    else if (finalScore < 100) { 
        // 10 -> 99 điểm
        msg = "Phải gỡ, Làm hơn 100 điểm có bất ngờ!";
    } 
    else if (finalScore < 1000) { 
        // 100 -> 999 điểm
        msg = "Phải gỡ, Làm hơn 1.000 điểm có bất ngờ!";
    } 
    else if (finalScore < 10000) { 
        // 1.000 -> 9.999 điểm
        msg = "Phải gỡ, Làm hơn 10.000 điểm có bất ngờ!";
    } 
    else if (finalScore < 100000) { 
        // 1.000 -> 9.999 điểm
        msg = "Phải gỡ, Làm hơn 100.000 điểm có bất ngờ!";
    } 
    else { 
        // Điểm trên 10.000 (Ví dụ trúng x2026)
        msg = "Phải gỡ, Làm hơn 1.000.000 điểm có bất ngờ!";
    }

    document.getElementById('msg-result').innerText = `Trả lời đúng: ${score}/${questions.length} câu.\nHệ số may mắn: x${multiplier}.\n${msg}`;
    
    showScreen('result-screen');
}

// --- Logic Troll ---
function swapButtons() {
    const yesBtn = document.getElementById('btn-yes');
    const noBtn = document.getElementById('btn-no');
    
    if (!yesBtn || !noBtn) return;

    const parent = yesBtn.parentElement; 

    if (yesBtn.nextElementSibling === noBtn) {
        parent.insertBefore(noBtn, yesBtn);
    } else {
        parent.insertBefore(yesBtn, noBtn);
    }
}

// --- Logic Messenger ---
function sendToMessenger() {
    const finalScore = document.getElementById('final-score').innerText;
    const message = `Hellu Tuấn Anh, tớ vừa chơi game của cậu và được ${finalScore} điểm nè!`;

    navigator.clipboard.writeText(message).then(() => {
        alert("Đã copy điểm số! Bạn hãy DÁN (Paste) vào ô chat nhé.");
        window.open('https://m.me/USERNAME_FACEBOOK_CUA_BAN', '_blank');
    }).catch(err => {
        window.open('https://m.me/USERNAME_FACEBOOK_CUA_BAN', '_blank');
    });
}