document.addEventListener("DOMContentLoaded", function () {
    var modal = document.getElementById("gameInstructionsModal");
    var btn = document.getElementById("gameInstructionsBtn");
    var span = document.getElementById("closeModal");

    btn.onclick = function () {
        modal.style.display = "flex";
    }

    span.addEventListener("click", function () {
        var modal = document.getElementById("gameInstructionsModal");
        modal.style.display = "none";
    });

    closeModal.addEventListener("click", function () {
        recordModal.style.display = "none";
    });

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    var startBtn = document.getElementById("startBtn");

    startBtn.addEventListener("click", function () {
        var overlay = document.getElementById("overlay");
        overlay.style.display = "flex";

        var count = 3;
        var countdownElement = document.getElementById('countdown');
        countdownElement.textContent = count;
        countdownElement.style.display = 'block';

        var countdownInterval = setInterval(function () {
            count--;
            if (count >= 0) {
                countdownElement.textContent = count;
            } else {
                clearInterval(countdownInterval);
                window.location.href = "game.html";
            }
        }, 1000);
    });

    var recordBtn = document.getElementById('recordBtn');
    var recordModal = document.getElementById('record');
    var recordClose = document.getElementById('recordclose');

    recordBtn.addEventListener("click", function () {
        recordModal.style.display = "flex";
        showScores();
    });

    recordClose.addEventListener("click", function () {
        recordModal.style.display = "none";
    });

    function initializeScores() {
        if (!localStorage.getItem('scores')) {
            localStorage.setItem('scores', JSON.stringify([]));
        }
    }

    function addScore(score) {
        let scores = JSON.parse(localStorage.getItem('scores'));
        scores.push(score);
        localStorage.setItem('scores', JSON.stringify(scores));
    }

    function getScores() {
        return JSON.parse(localStorage.getItem('finalScores'));
    }

    function showScores() {
        let scores = getScores();
        scores.sort((a, b) => b - a);  // 점수를 내림차순으로 정렬
        let scoreList = document.getElementById('scoreList');
        scoreList.innerHTML = '';  // 기존 리스트를 지우기 위해 초기화
        scores.forEach(function (score, index) {
            let li = document.createElement('li');
            let rankText;
            switch (index) {
                case 0:
                    rankText = '🥇 1등: ';
                    break;
                case 1:
                    rankText = '🥈 2등: ';
                    break;
                case 2:
                    rankText = '🥉 3등: ';
                    break;
                default:
                    rankText = `${index + 1}등: `;
            }
            li.textContent = `${rankText}점수 ${score}`;
            scoreList.appendChild(li);
        });
    }

    function saveFinalScore(score) {
        addScore(score);
        showScores();
    }

    initializeScores();
    showScores();
});
