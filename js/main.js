let audio_noti = document.querySelector("#notification");
let info = document.querySelector(".info_text");
let info_highlight = document.querySelector(".icon");
let close_desc = document.querySelector(".info_desc_close");
let modal_contain = document.querySelector(".info_desc_contain");
let info_desc_text = document.querySelector(".info_desc_text");

let progress_bar = document.querySelector(".progress");
let radius = progress_bar.getAttribute("r");
let circumference = (radius * 2 * 3.14) + 0.1;
let percent_elapsed = 0;
let percent_already_elapsed;
let percent_elapsed_how_many_times = 0;
let reveal = circumference - (percent_elapsed * circumference) / 100;
progress_bar.style.strokeDasharray = `${circumference} ${circumference}`;
progress_bar.style.strokeDashoffset = reveal;

let start_btn = document.querySelector("#start");
let stop_btn = document.querySelector("#stop");
let reset_btn = document.querySelector("#reset");

let minutes_timer = document.querySelector(".minutes_timer");
let minute_seconds_text = document.querySelector(".minute-seconds");
let minutes_timer_running = false;
let minutes_timer_ran_1_time = false;
let minutes_timer_was_running = false;

let seconds_timer = document.querySelector(".seconds_timer");
let seconds_timer_running = false;
let seconds_timer_was_running = false;

let initial_minutes = 20;
let initial_seconds_from_minutes = initial_minutes * 60;
let initial_seconds = 20;

let elapsed_seconds = 0;
let elapsed_seconds_from_minutes = 0;

stop_btn.setAttribute("disabled", true);
minutes_timer.innerHTML = initial_minutes;
seconds_timer.innerHTML = initial_seconds;
info_desc_text.innerHTML = "Timer is not running. Start the timer by clicking on the start button.";

function minuteloop(seconds_from_minutes) {
    const now = Math.floor(((new Date().getTime()) / 1000));
    const then = now + seconds_from_minutes;
    minutes_timer_running = true;
    displaySeconds(initial_seconds);

    m_interval = setInterval(() => {
        const seconds_left = then - Math.floor((Date.now() / 1000));
        if (seconds_left < 0) {
            try {
                clearInterval(m_interval);
            } catch (error) {
                console.log(error);
            }
            percent_elapsed = 0;
            audio_noti.play();
            minutes_timer_running = false;
            secondloop(initial_seconds);
        }
        else {
            display_minutes(seconds_left);
            percent_elapsed += (100 / seconds_from_minutes);
            // percent_elapsed += (100/1200);
            // console.log(percent_elapsed);

            let variable_per_elapsed_how_many_times = ++percent_elapsed_how_many_times;

            console.log(variable_per_elapsed_how_many_times);
            console.log(1200 - seconds_left);

            if(variable_per_elapsed_how_many_times != (1200 - seconds_left)){
                percent_elapsed_how_many_times = (1200 - seconds_left);
                percent_elapsed = percent_elapsed_how_many_times * (100/1200);
                console.log(percent_elapsed);
                console.log(percent_elapsed_how_many_times);
            }
            // console.log(percent_elapsed_how_many_times);

            reveal = circumference - (percent_elapsed * circumference) / 100;
            progress_bar.style.strokeDashoffset = reveal;
            // percent_already_elapsed = 100 - percent_elapsed;
            // console.log(percent_already_elapsed);
        }
    }, 1000);
}
function secondloop(seconds) {
    const now = Math.floor(((new Date().getTime())) / 1000);
    const then = now + seconds;
    seconds_timer_running = true;
    display_minutes(initial_seconds_from_minutes);

    s_interval = setInterval(() => {
        const seconds_left = then - Math.floor((Date.now()) / 1000);
        if (seconds_left < 0) {
            try {
                clearInterval(s_interval);
            } catch (error) {
                console.log(error);
            }
            percent_elapsed = 0;
            audio_noti.play();
            seconds_timer_running = false;
            minuteloop(initial_seconds_from_minutes);
        }
        else {
            displaySeconds(seconds_left);
            percent_elapsed += (100 / seconds);
            reveal = circumference - (percent_elapsed * circumference) / 100;
            progress_bar.style.strokeDashoffset = reveal;
        }
    }, 1000);
}

function displaySeconds(seconds) {
    const seconds_left = seconds % 60;
    seconds_timer.innerHTML = seconds_left;
    seconds_left < 10 ? document.title = `00 : 0${seconds_left}` : document.title = `00 : ${seconds_left}`;
    info_desc_text.innerHTML = `Timer is running and it will run for ${seconds_left} seconds from now. After that, you will get ${initial_minutes} minutes to work.<br><br>Basically, every 20 minutes spent using a screen, you should try to look away at something that is 20 feet away from you for a total of 20 seconds.`;
}

function display_minutes(minute_seconds) {
    const minutes_left = Math.floor(minute_seconds / 60);
    const seconds_left = minute_seconds % 60;
    seconds_left < 10 ? minute_seconds_text.innerHTML = `0${seconds_left}` : minute_seconds_text.innerHTML = seconds_left;
    seconds_left < 10 ? document.title = `${minutes_left} : 0${seconds_left}` : document.title = `${minutes_left} : ${seconds_left}`;
    minutes_timer.innerHTML = minutes_left;
    info_desc_text.innerHTML = `Timer is running and it will run for ${minutes_left + 1} minutes from now. After that, you will get a break of ${initial_seconds} seconds.<br><br> Basically, every 20 minutes spent using a screen, you should try to look away at something that is 20 feet away from you for a total of 20 seconds.`;
}

start_btn.addEventListener("click", () => {
    if (minutes_timer_ran_1_time == false) {
        minuteloop(initial_seconds_from_minutes);
        minutes_timer_ran_1_time = true;
        minutes_timer_running = true;
    } else {
        if (minutes_timer_was_running == true) {
            minuteloop(elapsed_seconds_from_minutes);
        }
        else if (seconds_timer_was_running == true) {
            secondloop(elapsed_seconds);
            info_desc_text.innerHTML = `Timer is running and it will run for ${initial_seconds} seconds from now. After that, you will get ${initial_minutes} minutes to work.<br><br>Basically, every 20 minutes spent using a screen, you should try to look away at something that is 20 feet away from you for a total of 20 seconds.`;
        }
    }

    start_btn.setAttribute("disabled", true);
    stop_btn.removeAttribute("disabled");
    info.innerHTML = "Timer is running";
    info_desc_text.innerHTML = `Timer is running and it will run for ${initial_minutes} minutes from now. After that, you will get a break of ${initial_seconds} seconds.<br><br> Basically, every 20 minutes spent using a screen, you should try to look away at something that is 20 feet away from you for a total of 20 seconds.`;
    info_highlight.classList.add("icon-highlight");
    info_highlight.addEventListener("transitionend", () => {
        info_highlight.classList.remove("icon-highlight");
    })
})

stop_btn.addEventListener("click", () => {
    clearInterval(m_interval);
    try {
        clearInterval(s_interval);
    } catch (error) {
        console.log("");
    }
    if (minutes_timer_running == true) {
        minutes_timer_running = false;
        minutes_timer_was_running = true;
        seconds_timer_was_running = false;
    }
    if (seconds_timer_running == true) {
        seconds_timer_running = false;
        seconds_timer_was_running = true;
        minutes_timer_was_running = false;
    }
    start_btn.removeAttribute("disabled");
    stop_btn.setAttribute("disabled", true);

    percent_already_elapsed = percent_elapsed;
    elapsed_seconds_from_minutes = Number(minutes_timer.innerHTML)*60 + Number(minute_seconds_text.innerHTML);
    elapsed_seconds = Number(seconds_timer.innerHTML);

    info.innerHTML = "Timer is not running";
    info_highlight.classList.add("icon-highlight");
    info_highlight.addEventListener("transitionend", () => {
        info_highlight.classList.remove("icon-highlight");
    })
    info_desc_text.innerHTML = "Timer is not running. Start the timer by clicking on the start button.";
})

reset_btn.addEventListener("click", () => {
    try {
        clearInterval(m_interval);
    } catch (error) {
        console.log("");
    }
    try {
        clearInterval(s_interval);
    } catch (error) {
        console.log("");
    }

    start_btn.removeAttribute("disabled");
    stop_btn.setAttribute("disabled", true);

    percent_elapsed = 0;
    reveal = circumference - (percent_elapsed * circumference) / 100;
    progress_bar.style.strokeDashoffset = reveal;

    info.innerHTML = "Timer is not running";
    info_highlight.classList.add("icon-highlight");
    info_highlight.addEventListener("transitionend", () => {
        info_highlight.classList.remove("icon-highlight");
    })
    initial_minutes = 20;
    initial_seconds = 20;
    minutes_timer.innerHTML = initial_minutes;
    seconds_timer.innerHTML = initial_seconds;
    document.title = `${initial_minutes} : 00`;
    minute_seconds_text.innerHTML = "00";

    minutes_timer_running = false;
    minutes_timer_ran_1_time = false;
    minutes_timer_was_running = false;

    seconds_timer_running = false;
    seconds_timer_was_running = false;
    info_desc_text.innerHTML = "Timer is not running. Start the timer by clicking on the start button.";
});

close_desc.addEventListener("click", () => {
    modal_contain.classList.add("none");
});
info_highlight.addEventListener("click", () => {
    modal_contain.classList.remove("none");
});
modal_contain.addEventListener("click", (e) => {
    if (e.target.classList.contains("info_desc_contain")) {
        modal_contain.classList.add("none");
    }
});

const media = window.matchMedia('(max-width: 36rem)');

function handle_view_change(e){
    if(e.matches){
        start_btn.innerHTML = '<i class="fas fa-play"></i>';
        stop_btn.innerHTML = '<i class="fas fa-stop"></i>';
        reset_btn.innerHTML = '<i class="fas fa-redo"></i>';
    }
    else {
        start_btn.innerHTML = "Start";
        stop_btn.innerHTML = "Stop";
        reset_btn.innerHTML = "Reset";
    }
}
media.addEventListener("change", handle_view_change);
handle_view_change(media);

// or

// media.addEventListener("change", (media_view) => {
//     console.log(media_view);
//     if(media_view.matches) {
//         start_btn.innerHTML = '<i class="far fa-play-circle"></i>';
//     }
//     else {
//         start_btn.innerHTML = "Start";
//     }
// })

function status() {
    console.log("Minutes timer ran already once? " + minutes_timer_ran_1_time);
    console.log("");
    console.log("Minutes timer-was-running: " + minutes_timer_was_running);
    console.log("Seconds timer-was-running: " + seconds_timer_was_running);
    console.log("");
    console.log("Minutes timer running now: " + minutes_timer_running);
    console.log("Seconds timer running now: " + seconds_timer_running);
    console.log("");
    console.log("Percentage of progress bar: " + percent_elapsed);
    console.log("");
}