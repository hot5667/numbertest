// game.js

document.addEventListener("DOMContentLoaded", function () {
    var submit = document.getElementById('submit');
    var userInput = document.getElementById('userInput');
    var randomNumberDisplay = document.getElementById('randomNumber');
    var pointDisplay = document.getElementById('point');
    var messageDisplay = document.getElementById('message');
    var correctNumber;
    var point = 0;

    submit.addEventListener("click", function () {
        var userInputValue = userInput.value.trim();
        var randomNumber = parseInt(randomNumberDisplay.textContent.trim());

        if (userInputValue === correctNumber) {
            messageDisplay.textContent = '정답입니다!';
            point++;
            pointDisplay.textContent = point;
            generateRandomNumber();
        } else {
            messageDisplay.textContent = `틀렸습니다. 게임 종료! 정답은 ${correctNumber} 입니다.`;
            userInput.disabled = true;
            submit.disabled = true;
            saveFinalScore(point); 
            setTimeout(function () {
                window.location.href = "index.html"; 
            }, 3000); 
        }
    });

    function generateRandomNumber() {
        var newRandomNumber = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
        randomNumberDisplay.textContent = newRandomNumber;
        correctNumber = newRandomNumber.toString();

        userInput.value = '';
        userInput.disabled = true;
        submit.disabled = true;

        setTimeout(function () {
            randomNumberDisplay.textContent = '';
            userInput.disabled = false;
            submit.disabled = false;
            userInput.focus();
        }, 3000);
    }


    // 최종 점수를 로컬 스토리지에 저장
    function saveFinalScore(score) {
        var scores = JSON.parse(localStorage.getItem('finalScores')) || [];
        scores.push(score);
        localStorage.setItem('finalScores', JSON.stringify(scores));
        alert('게임 종료! 최종 점수: ' + score);
    }

    generateRandomNumber(); // 초기 숫자 생성
});