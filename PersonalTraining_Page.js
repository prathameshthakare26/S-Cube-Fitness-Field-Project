const bookingModal =
    document.getElementById("bookingModal");

const closeBooking =
    document.getElementById("closeBooking");

const bookingForm =
    document.getElementById("bookingForm");

const selectedTrainer =
    document.getElementById("selectedTrainer");

const bookingDate =
    document.getElementById("bookingDate");

const bookingMessage =
    document.getElementById("bookingMessage");



const bookButtons =
    document.querySelectorAll(".book-btn");

const today =
    new Date().toISOString().split("T")[0];

bookingDate.min = today;

bookButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const trainerName =
            button.getAttribute("data-trainer");


        selectedTrainer.value =
            trainerName;

        bookingMessage.textContent = "";


        bookingModal.classList.add("show");

    });

});

closeBooking.addEventListener("click", function () {

    bookingModal.classList.remove("show");

});

bookingModal.addEventListener("click", function (event) {

    if (event.target === bookingModal) {

        bookingModal.classList.remove("show");

    }

});

bookingForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const name =
        document.getElementById("memberName").value.trim();

    const phone =
        document.getElementById("memberPhone").value.trim();

    const date =
        bookingDate.value;

    const time =
        document.getElementById("bookingTime").value;

    const trainer =
        selectedTrainer.value;


    if (name === "") {

        alert("Please enter your name.");

        return;

    }


    if (!/^[0-9]{10}$/.test(phone)) {

        alert("Please enter a valid 10 digit mobile number.");

        return;

    }


    if (date === "") {

        alert("Please select a date.");

        return;

    }


    if (time === "") {

        alert("Please select a time slot.");

        return;

    }

    const booking = {

        name: name,

        phone: phone,

        trainer: trainer,

        date: date,

        time: time

    };

    let bookings =
        JSON.parse(
            localStorage.getItem("scubeGymBookings")
        ) || [];

    bookings.push(booking);

    localStorage.setItem(
        "scubeGymBookings",
        JSON.stringify(bookings)
    );

    bookingMessage.textContent =
        "Booking confirmed successfully!";

    bookingForm.reset();

    selectedTrainer.value = trainer;

});