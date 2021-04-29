document.addEventListener("DOMContentLoaded", () => {
    let audio_noti = document.querySelector("#notification");
    let info = document.querySelector(".info_text");
    let info_highlight = document.querySelector(".icon");
    let close = document.querySelector(".info_desc_close");
    let modal_contain = document.querySelector(".info_desc_contain");
    let info_desc_text = document.querySelector(".info_desc_text");

    let start_btn = document.querySelector("#start");
    let stop_btn = document.querySelector("#stop");
    let reset_btn = document.querySelector("#reset");

    let minutes_timer = document.querySelector(".minutes_timer");
    let minutes_timer_running = false;
    let minutes_timer_ran_1_time = false;
    let minutes_timer_was_running = false;

    let seconds_timer = document.querySelector(".seconds_timer");
    let seconds_timer_running = false;
    let seconds_timer_was_running = false;

    let minutes = 20;
    let seconds = 20;
    stop_btn.setAttribute("disabled", true);
    minutes_timer.innerHTML = minutes;
    seconds_timer.innerHTML = seconds;
    info_desc_text.innerHTML = "Timer is not running. Start the timer by clicking on the start button.";

    function time_loop() {
        if (minutes == 1) {
            clearInterval(loop);
            audio_noti.play();
            minutes = 20;
            minutes_timer.innerHTML = minutes;
            minutes_timer_running = false;
            loop_2 = setInterval(time_loop_2, 1000);
        }
        else {
            minutes_timer_running = true;
            minutes -= 1;
            info_desc_text.innerHTML = `Timer is running and it will run for ${minutes} minutes from now. After that, you will get a break of ${seconds} seconds.<br><br> Basically, every 20 minutes spent using a screen, you should try to look away at something that is 20 feet away from you for a total of 20 seconds.`;
            minutes_timer.innerHTML = minutes;
        }
    }
    function time_loop_2() {
        if (seconds == 1) {
            clearInterval(loop_2);
            audio_noti.play();
            seconds = 20;
            seconds_timer.innerHTML = seconds;
            seconds_timer_running = false;
            first_loop();
        }
        else {
            seconds_timer_running = true;
            seconds -= 1;
            info_desc_text.innerHTML = `Timer is running and it will run for ${seconds} seconds from now. After that, you will get ${minutes} minutes to work.<br><br>Basically, every 20 minutes spent using a screen, you should try to look away at something that is 20 feet away from you for a total of 20 seconds.`;
            seconds_timer.innerHTML = seconds;
        }
    }
    function first_loop() {
        loop = setInterval(time_loop, 1000);
        info_desc_text.innerHTML = `Timer is running and it will run for ${minutes} minutes from now. After that, you will get a break of ${seconds} seconds.<br><br> Basically, every 20 minutes spent using a screen, you should try to look away at something that is 20 feet away from you for a total of 20 seconds.`;
    }

    start_btn.addEventListener("click", () => {
        if(minutes_timer_ran_1_time == false){
            first_loop();
            minutes_timer_ran_1_time = true;
            minutes_timer_running = true;
        } else {
            if(minutes_timer_was_running == true){
                first_loop();
            }
            else if (seconds_timer_was_running == true){
                loop_2 = setInterval(time_loop_2, 1000);
                info_desc_text.innerHTML = `Timer is running and it will run for ${seconds} seconds from now. After that, you will get ${minutes} minutes to work.<br><br>Basically, every 20 minutes spent using a screen, you should try to look away at something that is 20 feet away from you for a total of 20 seconds.`;
            }
        }
        start_btn.setAttribute("disabled", true);
        stop_btn.removeAttribute("disabled");
        info.innerHTML = "Timer is running";
        info_desc_text.innerHTML = `Timer is running and it will run for ${minutes} minutes from now. After that, you will get a break of ${seconds} seconds.<br><br> Basically, every 20 minutes spent using a screen, you should try to look away at something that is 20 feet away from you for a total of 20 seconds.`;
        info_highlight.classList.add("icon-highlight");
        info_highlight.addEventListener("transitionend", () => {
            info_highlight.classList.remove("icon-highlight");
        })
        console.log("Minutes timer-was-running-on-start: " + minutes_timer_was_running);
        console.log("Seconds timer-was-running-on-start: " + seconds_timer_was_running);
    });

    stop_btn.addEventListener("click", () => {
        clearInterval(loop);
        try {
            clearInterval(loop_2);
        } catch (error) {
            console.log("Loop 2 not defined");
        }
        if(minutes_timer_running == true){
            minutes_timer_running = false;
            minutes_timer_was_running = true;
            seconds_timer_was_running = false;
        }
        if(seconds_timer_running == true){
            seconds_timer_running = false;
            seconds_timer_was_running = true;
            minutes_timer_was_running = false;
        }

        start_btn.removeAttribute("disabled");
        stop_btn.setAttribute("disabled", true);

        info.innerHTML = "Timer is not running";
        info_highlight.classList.add("icon-highlight");
        info_highlight.addEventListener("transitionend", () => {
            info_highlight.classList.remove("icon-highlight");
        })
        info_desc_text.innerHTML = "Timer is not running. Start the timer by clicking on the start button.";
        console.log("Minutes timer-was-running-on-stop: " + minutes_timer_was_running);
        console.log("Seconds timer-was-running-on-stop: " + seconds_timer_was_running);
        console.log("Minutes timer-on-stop: " + minutes_timer_running);
        console.log("Seconds timer-on-stop: " + seconds_timer_running);
    });
    reset_btn.addEventListener("click", () => {
        try {
            clearInterval(loop);
        } catch (error) {
            console.log("Loop not defined");
        }
        try {
            clearInterval(loop_2);
        } catch (error) {
            console.log("Loop 2 not defined");
        }

        start_btn.removeAttribute("disabled");
        stop_btn.setAttribute("disabled", true);

        info.innerHTML = "Timer is not running";
        info_highlight.classList.add("icon-highlight");
        info_highlight.addEventListener("transitionend", () => {
            info_highlight.classList.remove("icon-highlight");
        })
        minutes = 20;
        seconds = 20;
        minutes_timer.innerHTML = minutes;
        seconds_timer.innerHTML = seconds;

        minutes_timer_running = false;
        minutes_timer_ran_1_time = false;
        minutes_timer_was_running = false;

        seconds_timer_running = false;
        seconds_timer_was_running = false;
        info_desc_text.innerHTML = "Timer is not running. Start the timer by clicking on the start button.";
    });
    close.addEventListener("click", () => {
        modal_contain.classList.add("none");
    });
    info_highlight.addEventListener("click", () => {
        modal_contain.classList.remove("none");
    });
    modal_contain.addEventListener("click", (e) => {
        if(e.target.classList.contains("info_desc_contain")){
            modal_contain.classList.add("none");
        }
    });

    document.addEventListener("keydown", () => {
        audio_noti.setAttribute("muted", true);
    });
});
