document.addEventListener("DOMContentLoaded", () => {
    let start_btn = document.querySelector("#start");
    let stop_btn = document.querySelector("#stop");

    let minutes_timer = document.querySelector(".minutes_timer");
    let minutes_timer_running = false;
    let minutes_timer_ran_1_time = false;
    let minutes_timer_was_running = false;

    let seconds_timer = document.querySelector(".seconds_timer");
    let seconds_timer_running = false;
    let seconds_timer_was_running = false;

    let minutes = 20;
    let seconds = 20;
    minutes_timer.innerHTML = minutes;
    seconds_timer.innerHTML = seconds;

    function time_loop() {
        if (minutes == 1) {
            clearInterval(loop);
            minutes = 20;
            minutes_timer.innerHTML = minutes;
            minutes_timer_running = false;
            loop_2 = setInterval(time_loop_2, 1000);
        }
        else {
            minutes_timer_running = true;
            minutes -= 1;
            minutes_timer.innerHTML = minutes;
        }
    }
    function time_loop_2() {
        if (seconds == 1) {
            clearInterval(loop_2);
            seconds = 20;
            seconds_timer.innerHTML = seconds;
            seconds_timer_running = false;
            first_loop();
        }
        else {
            seconds_timer_running = true;
            seconds -= 1;
            seconds_timer.innerHTML = seconds;
        }
    }
    function first_loop() {
        loop = setInterval(time_loop, 60000);
    }

    start_btn.addEventListener("click", () => {
        if(minutes_timer_ran_1_time == false){
            first_loop();
            minutes_timer_ran_1_time = true;
        } else {
            if(minutes_timer_was_running == true){
                first_loop();
            }
            else if (seconds_timer_was_running == true){
                loop_2 = setInterval(time_loop_2, 1000);
            }
        }
        // first_loop();
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
        console.log("Minutes timer-was-running-on-stop: " + minutes_timer_was_running);
        console.log("Seconds timer-was-running-on-stop: " + seconds_timer_was_running);
        console.log("Minutes timer-on-stop: " + minutes_timer_running);
        console.log("Seconds timer-on-stop: " + seconds_timer_running);
    })
    // first_loop();
});