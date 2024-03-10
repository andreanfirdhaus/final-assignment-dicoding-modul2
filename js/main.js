// get html elements
const buttons = document.querySelectorAll('footer nav li button');

for (const button of buttons) {
    const icon = button.querySelector('i'); // Target the icon inside each button

    button.addEventListener('mouseenter', () => {
        icon.style.filter = 'none';
    });

    button.addEventListener('mouseleave', () => {
        icon.style.filter = '';
    });
}