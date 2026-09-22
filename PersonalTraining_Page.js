/* =====================================================
   PERSONAL TRAINING BOOKING
   ===================================================== */


/* Get required elements */

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


/* Get all Book Slot buttons */

const bookButtons =
    document.querySelectorAll(".book-btn");


/* =====================================================
   SET MINIMUM DATE
   ===================================================== */

/*
   This prevents the user from selecting
   a date in the past.
*/

const today =
    new Date().toISOString().split("T")[0];

bookingDate.min = today;


/* =====================================================
   OPEN BOOKING MODAL
   ===================================================== */

bookButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        /* Get trainer name from button */

        const trainerName =
            button.getAttribute("data-trainer");


        /* Put trainer name inside form */

        selectedTrainer.value =
            trainerName;


        /* Clear old message */

        bookingMessage.textContent = "";


        /* Open modal */

        bookingModal.classList.add("show");

    });

});


/* =====================================================
   CLOSE MODAL
   ===================================================== */

closeBooking.addEventListener("click", function () {

    bookingModal.classList.remove("show");

});


/* Close modal when clicking outside the box */

bookingModal.addEventListener("click", function (event) {

    if (event.target === bookingModal) {

        bookingModal.classList.remove("show");

    }

});


/* =====================================================
   FORM SUBMISSION
   ===================================================== */

bookingForm.addEventListener("submit", function (event) {

    /* Prevent page refresh */

    event.preventDefault();


    /* Get form values */

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


    /* =================================================
       BASIC VALIDATION
       ================================================= */

    if (name === "") {

        alert("Please enter your name.");

        return;

    }


    /* Check mobile number */

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


    /* =================================================
       CREATE BOOKING OBJECT
       ================================================= */

    const booking = {

        name: name,

        phone: phone,

        trainer: trainer,

        date: date,

        time: time

    };


    /* =================================================
       GET EXISTING BOOKINGS
       ================================================= */

    let bookings =
        JSON.parse(
            localStorage.getItem("scubeGymBookings")
        ) || [];


    /* =================================================
       ADD NEW BOOKING
       ================================================= */

    bookings.push(booking);


    /* =================================================
       SAVE BOOKING
       ================================================= */

    localStorage.setItem(
        "scubeGymBookings",
        JSON.stringify(bookings)
    );


    /* =================================================
       SUCCESS MESSAGE
       ================================================= */

    bookingMessage.textContent =
        "Booking confirmed successfully!";


    /* Clear form */

    bookingForm.reset();


    /* Keep trainer name visible after reset */

    selectedTrainer.value = trainer;

});