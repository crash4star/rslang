
export default function showSpinner(isVisible) {
    const spinner = document.querySelector('.spinner');
    if (isVisible) {
        spinner.classList.add('visible');
    } else {
        if (spinner.classList.contains('visible'));
        spinner.classList.remove('visible');
    }
}