const selectBox = document.getElementById("select");

const scissorsBtn = document.getElementById("scissors");
const rockBtn = document.getElementById("rock");
const paperBtn = document.getElementById("paper");
const resetBtn = document.getElementById("reset");

const resultText = document.getElementById("result");
const userScore = document.getElementById("user_score");
const computerScore = document.getElementById("com_score");

const userSelectedImg = document.getElementById("user-img");
const computerSelectedImg = document.getElementById("com-img");

let userSelectedText = "";
let computerSelectedText = "";
const bgImage = ["selected-scissors", "selected-rock", "selected-paper"];
const selectedText = ["가위", "주먹", "보"];
//가위 [0], 주먹[1], 보[2]

//버튼 클릭 이벤트 받기
selectBox.addEventListener("click", (e) => {
  // 초기화
  resultText.innerText = "";
  userSelectedImg.style.background = "";
  resultText.innerText = "두구두구.. 결과는..?! "; //버튼 클릭시마다 화면이 움직이는거 방지용
  userSelectedText = "";
  computerSelectedImg.style.background = "";
  computerSelectedText = "";

  //사용자 텍스트, 이미지 변경
  if (e.target === scissorsBtn) {
    userSelectedText = selectedText[0];
    userSelectedImg.className = bgImage[0];
  } else if (e.target === rockBtn) {
    userSelectedText = selectedText[1];
    userSelectedImg.className = bgImage[1];
  } else if (e.target === paperBtn) {
    userSelectedText = selectedText[2];
    userSelectedImg.className = bgImage[2];
  } else {
    return;
  }

  //setTimeout(함수, 시간ms) : 일정 시간 뒤에 코드 실행시키는 함수

  // 컴퓨터가 랜덤으로 선택 후 텍스트와 이미지 변경
  setTimeout(() => {
    const randomNum = Math.floor(Math.random() * 3); //0, 1, 2 중 선택
    computerSelectedText = selectedText[randomNum]; //선택된 숫자로 이미지와 값 선택
    computerSelectedImg.className = bgImage[randomNum];
  }, 600); //600ms 뒤에 값이 선택됨

  // 상태 업데이트
  setTimeout(() => {
    updateScore();
  }, 1000); //1초 뒤에 Score 바뀜 (이건 com 값 할당 이후 5초가 아님.!! 따라서 com 이미지 나오고 2초 뒤 점수 바뀜)
});

// 초기화
const resetStatus = () => {
  userScore.innerText = 0;
  computerScore.innerText = 0;
  userSelectedImg.style.background = "none";
  userSelectedText = "";
  computerSelectedImg.style.background = "none";
  computerSelectedText = "";
  results = [];
};

resetBtn.addEventListener("click", resetStatus);
resetStatus();

//시작 화면에서는 html에서 정의한 대로, reset 버튼으로 다시
//시도 했을때만 바뀌게 하기 위해서 onclick 사용
//reset함수에 사용하면 처음부터 해당 텍스트가 출력됨!
resetBtn.onclick = () => {
  resultText.innerText = "다시 한 번, 가위바위보 대결!";
};

//점수 계산하기
const updateScore = () => {
  if (
    //사용자가 이기는 경우 (사용자 : 컴)
    //가위: 보 || 바위: 가위 || 보: 바위
    (userSelectedText === selectedText[0] &&
      computerSelectedText === selectedText[2]) ||
    (userSelectedText === selectedText[1] &&
      computerSelectedText === selectedText[0]) ||
    (userSelectedText === selectedText[2] &&
      computerSelectedText === selectedText[1])
  ) {
    userScore.innerText = parseInt(userScore.innerText) + 1; //유저의 점수 +1
    resultText.innerText = "이겼습니다!🎉";
  } else if (
    //컴퓨터가 이기는 경우
    (userSelectedText === selectedText[0] &&
      computerSelectedText === selectedText[1]) ||
    (userSelectedText === selectedText[1] &&
      computerSelectedText === selectedText[2]) ||
    (userSelectedText === selectedText[2] &&
      computerSelectedText === selectedText[0])
  ) {
    computerScore.innerText = parseInt(computerScore.innerText) + 1; //컴퓨터 점수 +1
    resultText.innerText = "졌습니다ㅠㅠ";
  } else {
    resultText.innerText = "비겼습니다!";
  }
};
