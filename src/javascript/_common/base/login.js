// Login functionality redirects to Deriv dashboard
// SmartTrader now uses token-based authentication (oneTimeToken -> sessionToken -> authorize)

const { getBrandLoginUrl, getBrandSignupUrl, getPlatformHostname } = require('../../../templates/_common/brand.config');
const Language = require('../language');

const Login = (() => {
    const redirectToLogin = () => {
        // For custom domain, redirect to main app for OAuth (since 1 App ID = 1 redirect URL)
        const isCustomDomain = /smarttrader\.deriv\.now/i.test(window.location.hostname);
        
        if (isCustomDomain) {
            // Redirect to main app login, which will handle OAuth and redirect back
            const currentUrl = encodeURIComponent(window.location.href);
            const lang = Language.get();
            window.location.href = `https://deriv.now/redirect?redirect_to=${currentUrl}&lang=${lang}`;
            return;
        }
        
        const baseLoginUrl = getBrandLoginUrl();
        const platformHostname = getPlatformHostname();
        const lang = Language.get();
        const loginUrlWithRedirect = `${baseLoginUrl}?redirect=${encodeURIComponent(platformHostname)}&lang=${lang}`;
        
        window.location.href = loginUrlWithRedirect;
    };

    const redirectToSignup = () => {
        const baseSignupUrl = getBrandSignupUrl();
        const lang = Language.get();
        const signupUrlWithLang = `${baseSignupUrl}?lang=${lang}`;

        window.location.href = signupUrlWithLang;
    };

    const initOneAll = () => {
        // Social login is handled by the Deriv dashboard
        // This is kept for backward compatibility but does nothing
    };

    return {
        redirectToLogin,
        redirectToSignup,
        initOneAll,
    };
})();

module.exports = Login;
