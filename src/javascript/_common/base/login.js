// Login functionality redirects to Deriv dashboard
// SmartTrader now uses token-based authentication (oneTimeToken -> sessionToken -> authorize)

const { getBrandLoginUrl, getBrandSignupUrl, getPlatformHostname } = require('../../../templates/_common/brand.config');
const Language = require('../language');

// Default affiliate configuration
// Revenue Share affiliate token (sidc) - used for all signups from SmartTrader
const DEFAULT_AFFILIATE_TOKEN = '4504E060-B7D0-4D2D-8049-70C39D052AA0';
const DEFAULT_UTM_CAMPAIGN = 'dynamicworks';

const Login = (() => {
    /**
     * Get affiliate parameters from URL or use defaults
     * Supports: affiliate_token, sidc (Revenue Share), sidi (Master Partner), utm_campaign
     */
    const getAffiliateParams = () => {
        const urlParams = new URLSearchParams(window.location.search);

        // Get affiliate token from URL or use default
        const urlAffiliateToken = urlParams.get('affiliate_token') ||
            urlParams.get('sidc') ||
            urlParams.get('sidi');
        const affiliateToken = urlAffiliateToken || DEFAULT_AFFILIATE_TOKEN;

        // Get UTM campaign from URL or use default
        const utmCampaign = urlParams.get('utm_campaign') || DEFAULT_UTM_CAMPAIGN;

        let params = '';
        if (affiliateToken) {
            params += `&affiliate_token=${encodeURIComponent(affiliateToken)}`;
        }
        if (utmCampaign) {
            params += `&utm_campaign=${encodeURIComponent(utmCampaign)}`;
        }

        return params;
    };

    const redirectToLogin = () => {
        const baseLoginUrl = getBrandLoginUrl();
        const platformHostname = getPlatformHostname();
        const lang = Language.get();
        const affiliateParams = getAffiliateParams();
        const loginUrlWithRedirect = `${baseLoginUrl}?redirect=${encodeURIComponent(platformHostname)}&lang=${lang}${affiliateParams}`;

        window.location.href = loginUrlWithRedirect;
    };

    const redirectToSignup = () => {
        const baseSignupUrl = getBrandSignupUrl();
        const lang = Language.get();
        const affiliateParams = getAffiliateParams();
        const signupUrlWithLang = `${baseSignupUrl}?lang=${lang}${affiliateParams}`;

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
