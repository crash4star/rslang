import ButtonElement from '../UIComponents/ButtonElement';

const endBtn = new ButtonElement('endBtn','End');

endBtn.addStyles('btn', 'btn-primary');
endBtn.addAttribute('data-toggle', "modal");
endBtn.addAttribute('data-target', "#endModal");

export default endBtn;