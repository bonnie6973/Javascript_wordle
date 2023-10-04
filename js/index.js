// <!-- requirments -->
// <!-- 5글자 단어(존재하는 단어가 아니어도 됨)
// 6번의 시도 가능
// 존재하면 노란색, 위치도 맞으면 초록색으로 표시
// 게임 종료 판단
// (추가) 상단에 게임 시간 표시하기
// (선택) 키보드에도 동일하게 표시
// (선택) 키보드 클릭으로도 입력 -->
const 정답 = "APPLE";

let attemps = 0;
let index = 0;
let timer;

function appStart() {
  const displayGameover = () => {
    const div = document.createElement("div");
    div.innerText = "게임이 종료됐습니다.";
    div.style =
      "display:flex; justify-content : center;align-items: center;position:absolute; top:40vh;left:30vw; background-color:white; width:200px; height:100px";
    document.body.appendChild(div);
  };
  const nextLine = () => {
    if (attemps === 6) return gameover();
    attemps++;
    index = 0;
  };

  const gameover = () => {
    window.removeEventListener("keydown", handleKeydown);
    displayGameover();
    clearInterval(timer);
  };
  const handleEnterKey = (event) => {
    let 맞은_갯수 = 0;
    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(
        `.board-block[data-index='${attemps}${i}']`
      );
      const 입력한_글자 = block.innerText;
      const 정답_글자 = 정답[i];
      if (입력한_글자 === 정답_글자) {
        맞은_갯수++;
        block.style.background = "#6AAA64";
      } else if (정답.includes(입력한_글자)) block.style.background = "#C9B458";
      else block.style.background = "#787c7e";

      block.style.color = "white";
    }

    if (맞은_갯수 === 5) gameover();
    else nextLine();
  };

  const handleBackspace = () => {
    if (index > 0) {
      const PreBlock = document.querySelector(
        `.board-block[data-index='${attemps}${index - 1}']`
      );
      PreBlock.innerText = "";
    }
    if (index !== 0) index -= 1;
  };

  const handleKeydown = (event) => {
    const key = event.key.toUpperCase();
    const keyCode = event.keyCode;
    const thisBlock = document.querySelector(
      `.board-block[data-index='${attemps}${index}']`
    );

    if (event.key === "Backspace") handleBackspace();
    else if (index === 5) {
      if (event.key === "Enter") handleEnterKey();
      else return;
    } else if (65 <= keyCode && keyCode <= 90) {
      thisBlock.innerText = key;
      index++;
    }
  };
  const startTimer = () => {
    const 시작_시간 = new Date();
    function satTime() {
      const 현재_시간 = new Date();
      const 흐른_시간 = new Date(현재_시간 - 시작_시간);
      const 분 = 흐른_시간.getMinutes().toString().padStart(2, "0");
      const 초 = 흐른_시간.getSeconds().toString().padStart(2, "0");
      const timeH1 = document.querySelector(".time");
      timeH1.innerText = `${분}:${초}`;
    }
    timer = setInterval(satTime, 1000);
  };
  // 주기성 함수, 밀리세컨단위라서 1000을 넣음 (함수명, 시간) 으로 설정
  startTimer();
  window.addEventListener("keydown", handleKeydown);
  //누르자 마자 반응하는 keydown 이벤트
}

//변수명이거나 함수명을 정할때 띄어쓰기가 안됨.
//그래서 띄어쓰는 단어를 대문자로 써준다.
//camel 표기법. 파이썬에서는snake 표기법을 주로 사용한다.
appStart();
