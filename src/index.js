import './styles.css';

class CountDownTarget {
    constructor({ selector, targetDate }) {
        this.selector = selector;
        this.targetDate = targetDate;
    }
    
    intervalId = null
    isActive = false
    
    start() {
        if (this.isActive) {
            return;
        }
        this.isActive = true;
        this.intervalId = setInterval(() => {
            const currentDate = new Date();
            const deltaTime = this.targetDate - currentDate;
            this.updateClockFace(deltaTime);
        }, 1000);
    }


    stop() {
        this.isActive = false;
        clearInterval(this.intervalId);
    }

    pad(value) {
        return String(value).padStart(2, '0');
    }
    
    updateClockFace(time) {
        const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
        const hours = this.pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
        const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
        const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

        document.querySelector(`${this.selector} > .field > [data-value="days"]`).textContent = `${days}`;
        document.querySelector(`${this.selector} > .field > [data-value="hours"]`).textContent = `${hours}`;
        document.querySelector(`${this.selector} > .field > [data-value="mins"]`).textContent = `${mins}`;
        document.querySelector(`${this.selector} > .field > [data-value="secs"]`).textContent = `${secs}`;
    }

}

const timer = new CountDownTarget({
    selector: '#timer-1',
    targetDate: new Date('Feb 25, 2021'),
})
timer.start();
