function setClock(){
    let dateDisplay;
    let timeDisplay;
    var dateInfo = new Date(); 
    var hour = modifyNumber(dateInfo.getHours());
    var min = modifyNumber(dateInfo.getMinutes());
    var sec = modifyNumber(dateInfo.getSeconds());
    var year = dateInfo.getFullYear();
    var month = dateInfo.getMonth() + 1;
    var date = dateInfo.getDate();
    dateDisplay = `${hour}:${min}:${sec}`;
    timeDisplay = `<span class = "red"></span> ${year}년 ${month}월 ${date}일`;
    // var msgList = [""];
    document.getElementById("time").innerHTML = dateDisplay;
    document.getElementById("date").innerHTML = timeDisplay;
    dateInfo.getHours();
    var time = [
        [0, 00, 6, 30, "취침"],
        [6, 30, 7, 40, "기상"],
        [7, 40, 8, 15, "아침식사"],
        [8, 15, 8, 45, "아침자습"],
        [8, 45, 8, 55, "조회"],
        [8, 55, 9, 0, "휴식"],
        [9, 0, 9, 50, "1교시"],
        [9, 50, 10, 0, "휴식"],
        [10, 0, 10, 50, "2교시"],
        [10, 50, 11, 0, "휴식"],
        [11, 0, 11, 50, "3교시"],
        [11, 50, 12, 0, "휴식"],
        [12, 0, 12, 50, "4교시"],
        [12, 50, 13, 50, "점심식사"],
        [13, 50, 14, 40, "5교시"],
        [14, 40, 14, 50, "휴식"],
        [14, 50, 15, 40, "6교시"],
        [15, 40, 15, 50, "휴식"],
        [15, 50, 16, 40, "7교시"],
        [16, 40, 17, 0, "청소"],
        [17, 0, 17, 10, "종례"],
        [17, 10, 17, 50, "방과후학습T1"],
        [17, 50, 17, 55, "휴식"],
        [17, 55, 18, 35, "방과후학습T2"],
        [18, 00, 20, 00, "저녁식사"],
        [20, 00, 21, 00, "야간자습T1"],
        [21, 00, 21, 20, "휴식"],
        [21, 20, 22, 20, "야간자습T2"],
        [22, 20, 30, 30, "취침"]
    ];

    let currentTime = new Date();

    for(var i=time.length-1; i>=0; i--) {
        let start_ = time[i][0] * 60 + time[i][1];
        let end_ = time[i][2] * 60 + time[i][3];

        let now_ = currentTime.getHours() * 60 + currentTime.getMinutes();

        if(start_ - now_ == 1) {
            showPopup();
            $("#nmsg1").html("잠시후 <span class='yellow'>" + time[i][4] + "</span>이(가) 시작합니다.");
            $("#nmsg2").html("미리 준비하시기 바랍니다.");
            break;
        }

        if(start_ <= now_ && now_ < end_) {
            hidePopup();
            endTime(time[i][2], time[i][3], currentTime.getHours(), currentTime.getMinutes());
            $("#startTime").html(modifyNumber(time[i][0]) + ":" + modifyNumber(time[i][1]));
            $("#endTime").html(modifyNumber(time[i][2]) + ":" + modifyNumber(time[i][3]));
            if(time[i][4] === "취침"){
                $("#startTime").html("22:30");
                $("#endTime").html("+1 06:30");
            }
            $("#timeName").html(time[i][4]);
            break;
        }
    }
}
function modifyNumber(time){
    if(parseInt(time) < 10){
        return "0" + time;
    }
    else{
        return time;
    }
}
function endTime(endHour, endMin, hour, min){
    if(endHour === hour*1){
        $("#timeleft").html(endMin - min*1 - 1);
    }
    else{
        $("#timeleft").html((endHour*60) + endMin - hour*1*60 - min*1 - 1);            
    }
}
function showPopup(){
    $("#nmsg1").css("display", "block");
    $("#nmsg2").css("display", "block");
    $("#nmsg3").css("display", "block");
}
function hidePopup(){
    $("#nmsg1").css("display", "none");
    $("#nmsg2").css("display", "none");
    $("#nmsg3").css("display", "none");
}
window.onload = function(){
    setClock();
    setInterval(setClock, 1000);
}
