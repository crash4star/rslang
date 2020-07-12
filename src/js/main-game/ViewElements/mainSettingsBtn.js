import ButtonElement from '../UIComponents/ButtonElement';

const mainSettingsBtn = new ButtonElement('appSettingsBtn',' Options');

mainSettingsBtn.addStyles('btn', 'btn-primary');
mainSettingsBtn.addAttribute('data-toggle', "modal");
mainSettingsBtn.addAttribute('data-target', "#mainSettingsForm");

export default mainSettingsBtn;