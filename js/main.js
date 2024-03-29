let audio_noti = document.querySelector("#notification");
let info = document.querySelector(".info_text");
let info_highlight = document.querySelector(".icon");
let close_desc = document.querySelector(".info_desc_close");
let modal_contain = document.querySelector(".info_desc_contain");
let info_desc_text = document.querySelector(".info_desc_text");
let setting_btn = document.querySelector(".settings");
let settings_close_button = document.querySelector(".close_settings");
let settings_container = document.querySelector(".settings_contain");

let progress_bar = document.querySelector(".progress");
let radius = progress_bar.getAttribute("r");
let circumference = (radius * 2 * 3.14) + 0.1;
let percent_elapsed = 0;
let percent_already_elapsed;
let percent_elapsed_how_many_times;
let reveal = circumference - (percent_elapsed * circumference) / 100;
progress_bar.style.strokeDasharray = `${circumference} ${circumference + 0.5}`;
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

var initial_minutes = 20;
var initial_seconds_from_minutes = initial_minutes * 60;
var initial_seconds = 20;

let elapsed_seconds = 0;
let elapsed_seconds_from_minutes = 0;

stop_btn.setAttribute("disabled", true);
minutes_timer.innerHTML = initial_minutes;
seconds_timer.innerHTML = initial_seconds;
info_desc_text.innerHTML = "Timer is not running. Start the timer by clicking on the start button.";

let custom_min_work = document.querySelector(".set_work_time .custom_minutes");
let custom_sec_work = document.querySelector(".set_work_time .custom_seconds");

let custom_sec_break = document.querySelector(".set_break_time .custom_seconds");

let all_custom_inputs = document.querySelectorAll(".set_work_and_break_time input");

let save_settings = document.querySelector(".save");
save_settings.setAttribute("disabled", true);

all_custom_inputs.forEach((input) => {
    input.addEventListener("keyup", () => {
        save_settings.innerHTML = `Save`;
        if (custom_min_work.value == "" || custom_sec_work.value == "" || custom_sec_break.value == "") {
            save_settings.setAttribute("disabled", true);
            document.querySelector(".custom_time").dataset.info = "All fields are required";
            document.querySelector(".custom_time").classList.add("error_class");
            if (custom_min_work.value == "") {
                document.querySelector(".set_work_time .custom_minutes").style = "none";
            }
            if (custom_sec_work.value == "") {
                document.querySelector(".set_work_time .custom_seconds").style = "none";
            }
            if (custom_sec_break.value == "") {
                document.querySelector(".set_break_time .custom_seconds").style = "none";
            }
        }
        else if (Number(custom_min_work.value) >= 60 || Number(custom_sec_work.value) >= 60 || Number(custom_sec_break.value) >= 60 || Number(custom_min_work.value) < 0 || Number(custom_sec_work.value) < 0 || Number(custom_sec_break.value) <= 0) {
            document.querySelector(".custom_time").classList.add("error_class");
            save_settings.setAttribute("disabled", true);
            if ((Number(custom_sec_break.value) <= 0 || Number(custom_sec_break.value) >= 60) && (Number(custom_min_work.value) < 60 || Number(custom_min_work.value) >= 0) && (Number(custom_sec_work.value) < 60 || Number(custom_sec_work.value) >= 0)) {
                document.querySelector(".custom_time").dataset.info = "Break time must be from 1-59 seconds";
                document.querySelector(".set_break_time .custom_seconds").style = "border: 2px solid #d84141";
                document.querySelector(".set_work_time .custom_minutes").style = "none";
                document.querySelector(".set_work_time .custom_seconds").style = "none";
            }
            if ((Number(custom_min_work.value) >= 60 || Number(custom_min_work.value) < 0) && (Number(custom_sec_break.value) > 0 || Number(custom_sec_break.value) < 60) && (Number(custom_sec_work.value) < 60 || Number(custom_sec_work.value) >= 0)) {
                document.querySelector(".custom_time").dataset.info = "Work time minutes must be from 0-59";
                document.querySelector(".set_work_time .custom_minutes").style = "border: 2px solid #d84141";
                document.querySelector(".set_break_time .custom_seconds").style = "none";
                document.querySelector(".set_work_time .custom_seconds").style = "none";
            }
            if ((Number(custom_sec_work.value) >= 60 || Number(custom_sec_work.value) < 0) && (Number(custom_sec_break.value) > 0 || Number(custom_sec_break.value) < 60) && (Number(custom_min_work.value) < 60 || Number(custom_min_work.value) >= 0)) {
                document.querySelector(".custom_time").dataset.info = "Work time seconds must be from 0-59";
                document.querySelector(".set_work_time .custom_seconds").style = "border: 2px solid #d84141";
                document.querySelector(".set_break_time .custom_seconds").style = "none";
                document.querySelector(".set_work_time .custom_minutes").style = "none";
            }
            if((Number(custom_sec_break.value) <= 0 || Number(custom_sec_break.value) >= 60) && (Number(custom_min_work.value) >= 60 || Number(custom_min_work.value) < 0) && (Number(custom_sec_break.value) > 0 || Number(custom_sec_break.value) < 60)){
                custom_min_work.addEventListener("focus", () => {
                    document.querySelector(".custom_time").dataset.info = "Work time minutes must be from 0-59";
                })
                custom_sec_break.addEventListener("focus", () => {
                    document.querySelector(".custom_time").dataset.info = "Break time must be from 1-59 seconds";
                })
                document.querySelector(".set_work_time .custom_seconds").style = "none";
                document.querySelector(".set_break_time .custom_seconds").style = "border: 2px solid #d84141";
                document.querySelector(".set_work_time .custom_minutes").style = "border: 2px solid #d84141";
            }
            if((Number(custom_min_work.value) >= 60 || Number(custom_min_work.value) < 0) && (Number(custom_sec_work.value) >= 60 || Number(custom_sec_work.value) < 0) && (Number(custom_sec_break.value) > 0 || Number(custom_sec_break.value) < 60)){
                custom_min_work.addEventListener("focus", () => {
                    document.querySelector(".custom_time").dataset.info = "Work time minutes must be from 0-59";
                })
                custom_sec_work.addEventListener("focus", () => {
                    document.querySelector(".custom_time").dataset.info = "Work time seconds must be from 0-59";
                })
                document.querySelector(".set_work_time .custom_seconds").style = "border: 2px solid #d84141";
                document.querySelector(".set_break_time .custom_seconds").style = "none";
                document.querySelector(".set_work_time .custom_minutes").style = "border: 2px solid #d84141";
            }
            if((Number(custom_sec_break.value) <= 0 || Number(custom_sec_break.value) >= 60) && (Number(custom_sec_work.value) >= 60 || Number(custom_sec_work.value) < 0) && (Number(custom_min_work.value) < 60 || Number(custom_min_work.value) >= 0)){
                custom_sec_break.addEventListener("focus", () => {
                    document.querySelector(".custom_time").dataset.info = "Break time must be from 1-59 seconds";
                })
                custom_sec_work.addEventListener("focus", () => {
                    document.querySelector(".custom_time").dataset.info = "Work time seconds must be from 0-59";
                })
                document.querySelector(".set_work_time .custom_seconds").style = "border: 2px solid #d84141";
                document.querySelector(".set_break_time .custom_seconds").style = "border: 2px solid #d84141";
                document.querySelector(".set_work_time .custom_minutes").style = "none";
            }
            if((Number(custom_sec_break.value) <= 0 || Number(custom_sec_break.value) >= 60) && (Number(custom_min_work.value) >= 60 || Number(custom_min_work.value) < 0) && (Number(custom_sec_work.value) >= 60 || Number(custom_sec_work.value) < 0)){
                custom_sec_break.addEventListener("focus", () => {
                    document.querySelector(".custom_time").dataset.info = "Break time must be from 1-59 seconds";
                })
                custom_sec_work.addEventListener("focus", () => {
                    document.querySelector(".custom_time").dataset.info = "Work time seconds must be from 0-59";
                })
                custom_min_work.addEventListener("focus", () => {
                    document.querySelector(".custom_time").dataset.info = "Work time minutes must be from 0-59";
                })
                document.querySelector(".set_work_time .custom_seconds").style = "border: 2px solid #d84141";
                document.querySelector(".set_break_time .custom_seconds").style = "border: 2px solid #d84141";
                document.querySelector(".set_work_time .custom_minutes").style = "border: 2px solid #d84141";
            }
        }
        else {
            save_settings.removeAttribute("disabled");
            document.querySelector(".custom_time").classList.remove("error_class");
            document.querySelector(".set_break_time .custom_seconds").style = "none";
            document.querySelector(".set_work_time .custom_minutes").style = "none";
            document.querySelector(".set_work_time .custom_seconds").style = "none";
        }
    })
})


save_settings.addEventListener("click", () => {
    minutes_timer.innerHTML = Number(custom_min_work.value);
    Number(custom_sec_work.value) < 10 && Number(custom_sec_work.value) >= 0 ? minute_seconds_text.innerHTML = `0${Number(custom_sec_work.value)}` : minute_seconds_text.innerHTML = custom_sec_work.value;
    seconds_timer.innerHTML = Number(custom_sec_break.value);
    initial_minutes = Number(minutes_timer.innerHTML);
    initial_seconds_from_minutes = (initial_minutes * 60) + (Number(minute_seconds_text.innerHTML));
    initial_seconds = Number(seconds_timer.innerHTML);

    all_custom_inputs.forEach((input) => {
        input.value = "";
    })

    save_settings.innerHTML = `<i class="far fa-check-circle"></i>&nbsp;&nbsp;Saved Successfully`;

    save_settings.setAttribute("disabled", true);
    document.querySelector(".custom_time").classList.remove("error_class");
    document.querySelector(".set_break_time .custom_seconds").style = "none";
    document.querySelector(".set_work_time .custom_minutes").style = "none";
    document.querySelector(".set_work_time .custom_seconds").style = "none";

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

    percent_elapsed = 0;
    percent_elapsed_how_many_times = 0;
    reveal = circumference - (percent_elapsed * circumference) / 100;
    progress_bar.style.strokeDashoffset = reveal;

    info.innerHTML = "Timer is not running";
    info_highlight.classList.add("icon-highlight");
    info_highlight.addEventListener("transitionend", () => {
        info_highlight.classList.remove("icon-highlight");
    })

    document.title = `${initial_minutes} : ${minute_seconds_text.innerHTML}`;

    document.querySelector(".min-con").classList.remove("min-transition");
    document.querySelector(".sec-con").classList.remove("sec-transition");
    document.querySelector(".sec-text").classList.remove("sec-text-transition");

    minutes_timer_running = false;
    minutes_timer_ran_1_time = false;
    minutes_timer_was_running = false;

    seconds_timer_running = false;
    seconds_timer_was_running = false;
    info_desc_text.innerHTML = "Timer is not running. Start the timer by clicking on the start button.";
})


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
            percent_elapsed_how_many_times = 0;
            audio_noti.play();
            minutes_timer_running = false;
            document.querySelector(".min-con").classList.add("min-transition");
            document.querySelector(".sec-con").classList.add("sec-transition");
            document.querySelector(".sec-text").classList.add("sec-text-transition");
            secondloop(initial_seconds);
        }
        else {
            display_minutes(seconds_left);
            percent_elapsed += ((100 / initial_seconds_from_minutes));

            let variable_per_elapsed_how_many_times = ++percent_elapsed_how_many_times;

            if (variable_per_elapsed_how_many_times != ((initial_seconds_from_minutes) - seconds_left)) {
                percent_elapsed_how_many_times = ((initial_seconds_from_minutes) - seconds_left);
                percent_elapsed = percent_elapsed_how_many_times * (100 / (initial_seconds_from_minutes));
            }

            reveal = circumference - (percent_elapsed * circumference) / 100;
            progress_bar.style.strokeDashoffset = reveal;
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
            percent_elapsed_how_many_times = 0;
            audio_noti.play();
            seconds_timer_running = false;
            document.querySelector(".min-con").classList.remove("min-transition");
            document.querySelector(".sec-con").classList.remove("sec-transition");
            document.querySelector(".sec-text").classList.remove("sec-text-transition");
            minuteloop(initial_seconds_from_minutes);
        }
        else {
            displaySeconds(seconds_left);
            percent_elapsed += (100 / initial_seconds);

            let variable_per_elapsed_how_many_times = ++percent_elapsed_how_many_times;

            if (variable_per_elapsed_how_many_times != (initial_seconds - seconds_left)) {
                percent_elapsed_how_many_times = (initial_seconds - seconds_left);
                percent_elapsed = percent_elapsed_how_many_times * (100 / initial_seconds);
            }

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

start_btn.addEventListener("click", (e) => {
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
    let element_type = "controls";
    ripple_effect(e, element_type);
})

stop_btn.addEventListener("click", (e) => {
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
    elapsed_seconds_from_minutes = (Number(minutes_timer.innerHTML) * 60) + Number(minute_seconds_text.innerHTML);
    console.log(elapsed_seconds_from_minutes);
    elapsed_seconds = Number(seconds_timer.innerHTML);

    info.innerHTML = "Timer is not running";
    info_highlight.classList.add("icon-highlight");
    info_highlight.addEventListener("transitionend", () => {
        info_highlight.classList.remove("icon-highlight");
    })
    info_desc_text.innerHTML = "Timer is not running. Start the timer by clicking on the start button.";
    let element_type = "controls";
    ripple_effect(e, element_type);
})

reset_btn.addEventListener("click", (e) => {
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
    percent_elapsed_how_many_times = 0;
    reveal = circumference - (percent_elapsed * circumference) / 100;
    progress_bar.style.strokeDashoffset = reveal;

    info.innerHTML = "Timer is not running";
    info_highlight.classList.add("icon-highlight");
    info_highlight.addEventListener("transitionend", () => {
        info_highlight.classList.remove("icon-highlight");
    })
    minutes_timer.innerHTML = initial_minutes;
    seconds_timer.innerHTML = initial_seconds;
    initial_seconds_from_minutes - (initial_minutes * 60) == 0 ? minute_seconds_text.innerHTML = "00" : minute_seconds_text.innerHTML = initial_seconds_from_minutes - (initial_minutes * 60);
    Number(initial_seconds_from_minutes - (initial_minutes * 60)) < 10 ? minute_seconds_text.innerHTML = `0${initial_seconds_from_minutes - (initial_minutes * 60)}` : minute_seconds_text.innerHTML = initial_seconds_from_minutes - (initial_minutes * 60);
    document.title = `${initial_minutes} : ${minute_seconds_text.innerHTML}`;

    document.querySelector(".min-con").classList.remove("min-transition");
    document.querySelector(".sec-con").classList.remove("sec-transition");
    document.querySelector(".sec-text").classList.remove("sec-text-transition");

    minutes_timer_running = false;
    minutes_timer_ran_1_time = false;
    minutes_timer_was_running = false;

    seconds_timer_running = false;
    seconds_timer_was_running = false;
    info_desc_text.innerHTML = "Timer is not running. Start the timer by clicking on the start button.";
    let element_type = "controls";
    ripple_effect(e, element_type);
});

setting_btn.addEventListener("click", () => {
    settings_container.classList.remove("none");
    settings_container.classList.add("settings_contain_animate");
    if (minutes_timer_running || seconds_timer_running) {
        document.querySelector(".custom_time").classList.add("error_class");
        document.querySelector(".custom_time").dataset.info = "Stop timer and then change settings.";
        document.querySelector(".custom_time").style = "pointer-events: none";
    }
    else {
        document.querySelector(".custom_time").style = "none";
    }
})

document.querySelector(".close_settings").addEventListener("click", () => {
    settings_container.classList.add("none");
    settings_container.classList.remove("settings_contain_animate");
    all_custom_inputs.forEach((input) => {
        input.value = "";
    })

    save_settings.setAttribute("disabled", true);
    save_settings.innerHTML = "Save";
    document.querySelector(".custom_time").classList.remove("error_class");
    document.querySelector(".set_break_time .custom_seconds").style = "none";
    document.querySelector(".set_work_time .custom_minutes").style = "none";
    document.querySelector(".set_work_time .custom_seconds").style = "none";
})

close_desc.addEventListener("click", () => {
    modal_contain.classList.add("none");
    modal_contain.classList.remove("info_desc_animate");
});
info_highlight.addEventListener("click", () => {
    modal_contain.classList.remove("none");
    modal_contain.classList.add("info_desc_animate");
});
modal_contain.addEventListener("click", (e) => {
    if (e.target.classList.contains("info_desc_contain")) {
        modal_contain.classList.add("none");
        modal_contain.classList.remove("info_desc_animate");
    }
});

const media = window.matchMedia('(max-width: 36rem)');

function handle_view_change(e) {
    if (e.matches) {
        start_btn.innerHTML = '<i class="fas fa-play"></i>';
        stop_btn.innerHTML = '<i class="fas fa-stop"></i>';
        reset_btn.innerHTML = '<i class="fas fa-redo"></i>';
        document.querySelector(".work_time_label").innerHTML = `Work Time`;
        document.querySelector(".break_time_label").innerHTML = `Break Time`;
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

function ripple_effect(e, element_type) {
    const current_location = e.currentTarget;
    let radius;
    let diameter;
    console.log(current_location);

    console.log(current_location.clientHeight, current_location.clientWidth);
    if (current_location.clientHeight > current_location.clientWidth) {
        diameter = (current_location.clientHeight);
        radius = diameter / 2;
    }
    if (current_location.clientHeight < current_location.clientWidth) {
        diameter = (current_location.clientWidth);
        radius = diameter / 2;
    }
    if(current_location.clientHeight == current_location.clientWidth){
        diameter = (current_location.clientWidth);
        radius = diameter / 2;
    }
    const ripple_circle = document.createElement("span");
    console.log(`Radius => ${radius}\nDiameter => ${diameter}`);

    console.log(`The current postion of the cursor from: \nTop of the viewport => ${e.clientY}, \nLeft of the viewport => ${e.clientX}`);

    console.log(`The current postion of the button from: \nTop of the viewport => ${current_location.offsetTop}, \nLeft of the viewport => ${current_location.offsetLeft}`);

    console.log(`Positon of ripple: \nLeft => ${e.clientX - current_location.offsetLeft - radius}\nTop => ${e.clientY - current_location.offsetTop - radius}`);

    ripple_circle.style.top = `${e.clientY - current_location.offsetTop - radius}px`;
    ripple_circle.style.left = `${e.clientX - current_location.offsetLeft - radius}px`;
    ripple_circle.style.height = `${diameter}px`;
    ripple_circle.style.width = `${diameter}px`;

    ripple_circle.classList.add("ripple_circle");
    if (element_type == "controls") {
        let button_last_child = current_location.children.length - 1;

        if (current_location.children.length == 1) {
            console.log(current_location.children[0].tagName);
            if (current_location.children[0].tagName == "SPAN") {
                console.log(current_location.children[0].tagName);
                current_location.removeChild(current_location.children.item(0));
            }
        }
        if (current_location.children.length == 2) {
            current_location.removeChild(current_location.children.item(button_last_child));
        }
    }

    current_location.appendChild(ripple_circle);
    console.log(current_location.children.length);
}

function status() {
    console.log("Minutes timer ran already once? " + minutes_timer_ran_1_time);
    console.log("");
    console.log("Minutes timer-was-running: " + minutes_timer_was_running);
    console.log("Seconds timer-was-running: " + seconds_timer_was_running);
    console.log("");
    console.log("Minutes timer running now: " + minutes_timer_running);
    console.log("Seconds timer running now: " + seconds_timer_running);
    console.log("");
    console.log("Percentage of progress bar: " + Math.round(percent_elapsed));
    console.log("");
    console.log("Percentage elapsed how many times: " + percent_elapsed_how_many_times);
}