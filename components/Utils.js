export const countdownTimer = (duration, bufferTime, counterCalback, completedCallback, nextCallback) => {
	// Set initial countdown time
	let timeLeft = duration;

	// Function to run the timer
	function tick() {
		if (timeLeft > 0) {
			// Update remaining time
			timeLeft -= 1000; // Decrement by 1 second every tick (1000 milliseconds)

			// Update display (replace with your preferred method)
			// console.log("Time remaining:", timeLeft / 1000, "seconds");
            if(counterCalback){
                counterCalback(timeLeft / 1000);
            }
			// Schedule the next tick
			setTimeout(tick, 1000);
		} else {
			// Timer finished, call the callback function if provided
			if (completedCallback) {
				completedCallback();
			}

			// After the callback, wait for the buffer time before restarting
			setTimeout(() => {
                if(nextCallback){
                    nextCallback()
                }
				timeLeft = duration;
				tick();
			}, bufferTime);
		}
	}

	// Start the timer
	tick();
};
