import ButtonElement from '../UIComponents/ButtonElement';

const cardSettingsBtn = new ButtonElement('cardSettingsBtn',' Options');

cardSettingsBtn.addStyles('btn', 'btn-primary');
cardSettingsBtn.addAttribute('data-toggle', "modal");
cardSettingsBtn.addAttribute('data-target', "#cardSettingsForm");

export default cardSettingsBtn;