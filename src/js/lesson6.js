// 1. setTimeout ან setInterval - ის გამოყენებით გააკეთეთ საათი რომელიც იმუშავებს როგორც ნამდვილი სააათი. გამოიყენეთ ატვირთული სურათი (საათი.png).

const clock = document.querySelector("#clock");

function createClock() {
	const day = new Date();
	const hour = day.getHours() + "";
	const min = day.getMinutes() + "";
	const sec = day.getSeconds() + "";
	// console.log(day, hour, min, sec, min.padStart(2, 0));
	clock.innerHTML = `${hour.padStart(2, 0)} : ${min.padStart(
		2,
		0
	)} : ${sec.padStart(2, 0)}`;
}

// function timePlius0(time) {
//   return time < 10 ? `0${time}` : time;
// }

createClock();
setInterval(createClock, 1000);

// 2. ლექციაზე შექმნილ სლაიდერს დავამატოთ:
//    2.1. დავამატოთ სლაიდების ავტომატური ცვლილება 5 წამიანი ინტერვალით.
//    2.2. როდესაც ავტომატურად ხდება სლაიდების შეცვლა თუ მაუსს მივიტან სურათთან, ავტომატური სლაიდი გაჩერდეს.
//    2.3. თუ მაუსი მიტანილი მაქვს სურათზე და შემდეგ გამოვწევ სურათიდან, ავტომატური სლაიდი გაგრძელდეს. მოუსმინეთ  mouseenter, mouseleave  ივენთებს
//    დამხმარე მასალა: https://developer.mozilla.org/en-US/docs/Web/API/Element/mouseenter_event

function initSlider() {
	const slides = document.querySelectorAll(".slide");
	const sliderWrapper = document.querySelector(".slider-wrapper");

	let activeIndex = 0;

	function renderSlides() {
		slides.forEach((slide, index) => {
			if (activeIndex === index) {
				slide.classList.add("active");
			} else {
				slide.classList.remove("active");
			}
		});
	}
	renderSlides();
	function showNext() {
		if (activeIndex === slides.length - 1) {
			activeIndex = 0;
		} else {
			activeIndex++;
		}
		renderSlides();
	}

	let sliderIntervalId = null;

	function startAutoSliderFn() {
		sliderIntervalId = setInterval(showNext, 5000);
	}

	function stopAutoSliderFn() {
		if (sliderIntervalId) {
			clearInterval(sliderIntervalId);
			sliderIntervalId = null;
		}
	}

	startAutoSliderFn();

	sliderWrapper.addEventListener("mouseenter", stopAutoSliderFn);
	sliderWrapper.addEventListener("mouseleave", startAutoSliderFn);
}

initSlider();

//  3*(optional) დავამატოთ მარტივი countdown რომელიც გვიჩვენებს მომდევნო ლექციამდე (2 აგვისტო, 20:00) დარჩენილ დროს (დღე, საათი, წუთი)

const countdown = document.querySelector(".countdown");

function countdownFn() {
	const deadline = new Date("Aug 5, 2023 20:00:00").getTime();
	const now = new Date().getTime();
	const gap = deadline - now;
	// console.log(gap);

	const second = 1000;
	const minute = second * 60; // 1000 * 60
	const hour = minute * 60; // 1000 * 60 * 60
	const day = hour * 24; // 1000 * 60 * 60 *24

	const daysLeft = Math.floor(gap / day);
	const hoursLeft = Math.floor((gap % day) / hour);
	const minutesLeft = Math.floor((gap % hour) / minute);
	const secondsLeft = Math.floor((gap % minute) / second);

	countdown.innerHTML = `${daysLeft} days, ${hoursLeft} hours, ${minutesLeft} minutes and ${secondsLeft} seconds left until next lecture`;
}

countdownFn();
setInterval(countdownFn, 1000);
